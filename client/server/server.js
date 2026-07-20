import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StudyChat Backend Running",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body?.message?.trim();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Please enter a question.",
      });
    }

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY is missing in server/.env",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are StudyChat, a helpful educational AI tutor.

Answer the student's question clearly, accurately, and in simple language.
Use examples where useful.

Student question: ${message}`,
    });

    const reply = result.text;

    if (!reply) {
      return res.status(500).json({
        success: false,
        error: "Gemini returned an empty response.",
      });
    }

    return res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Gemini error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message || "AI response failed.",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found.",
  });
});

app.listen(PORT, () => {
  console.log(`StudyChat server running on http://localhost:${PORT}`);
});