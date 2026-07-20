import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GoogleGenAI } from "@google/genai";
import User from "./models/User.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const PRIMARY_MODEL =
  process.env.GEMINI_MODEL || "gemini-3.5-flash";

const FALLBACK_MODELS = [
  PRIMARY_MODEL,
  "gemini-3.1-flash-lite",
];

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/user", userRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "StudyChat backend is running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

app.post("/api/signup", async (req, res) => {
  try {
    const name = req.body?.name?.trim();
    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email and password are required.",
      });
    }

    if (name.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid name.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters.",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: "Database is not connected. Please try again shortly.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Account could not be created.",
    });
  }
});

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

function getStatus(error) {
  return Number(
    error?.status ??
      error?.code ??
      error?.error?.code ??
      error?.response?.status
  );
}

async function generateAnswer(ai, prompt) {
  let lastError;

  for (const model of [...new Set(FALLBACK_MODELS)]) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const result = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        const text = result?.text?.trim();

        if (!text) {
          throw new Error("The AI returned an empty response.");
        }

        return {
          text,
          model,
        };
      } catch (error) {
        lastError = error;

        const status = getStatus(error);
        const retryable =
          status === 408 ||
          status === 429 ||
          status >= 500;

        console.error(
          `Gemini model ${model}, attempt ${attempt + 1}:`,
          error?.message
        );

        if (!retryable || attempt === 2) {
          break;
        }

        await sleep(
          750 * 2 ** attempt +
            Math.floor(Math.random() * 250)
        );
      }
    }
  }

  throw (
    lastError ||
    new Error("AI response could not be generated.")
  );
}
app.post("/api/login", async (req, res) => {
  try {
    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      error: "Login failed.",
    });
  }
});

app.post("/api/chat", async (req, res) => {
  const message = req.body?.message?.trim();

  if (!message) {
    return res.status(400).json({
      success: false,
      error: "Please enter a question.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error:
        "GEMINI_API_KEY is missing. Add it to server/.env and restart the server.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are StudyChat, a helpful educational AI tutor.

Answer clearly, accurately, and in simple language.
Use examples where useful.

Student question: ${message}`;

    const result = await generateAnswer(ai, prompt);

    return res.json({
      success: true,
      reply: result.text,
      model: result.model,
    });
  } catch (error) {
    const status = getStatus(error);

    console.error(
      "Gemini request failed:",
      status || "unknown",
      error?.message
    );

    if (
      status === 400 ||
      status === 401 ||
      status === 403
    ) {
      return res.status(400).json({
        success: false,
        error:
          "The Gemini API key or model configuration is invalid. Check server/.env.",
      });
    }

    if (status === 429 || status === 503) {
      return res.status(503).json({
        success: false,
        error:
          "The AI service is temporarily busy. Please wait a few seconds and try again.",
      });
    }

    return res.status(500).json({
      success: false,
      error:
        "AI response could not be generated. Check the server terminal for details.",
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found.",
  });
});

async function startServer() {
  try {
    const mongoUri = process.env.MONGODB_URI?.trim();

    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI is missing in server/.env"
      );
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("MongoDB Connected");

    const server = app.listen(PORT, () => {
      console.log(
        `StudyChat server running on http://localhost:${PORT}`
      );
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Close the other backend terminal.`
        );
        return;
      }

      console.error("Server error:", error.message);
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );
  }
}

startServer();