import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
   async function handleSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.password) {
    alert("Please enter your email and password.");
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful!");

    navigate("/chat");
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }

  }

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mb-4 text-5xl">🎓</div>

          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

          <p className="mt-2 text-slate-400">
            Login to continue your learning journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-16 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-slate-300">
              <input
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 accent-cyan-500"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-cyan-400 transition hover:text-cyan-300"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-sm text-slate-500">or</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <button
          type="button"
          className="w-full rounded-xl border border-slate-700 py-3 font-semibold text-white transition hover:border-cyan-400 hover:bg-slate-800"
        >
          Continue with Google
        </button>

        <p className="mt-7 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            Create account
          </Link>
        </p>

        <Link
          to="/"
          className="mt-5 block text-center text-sm text-slate-500 transition hover:text-white"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

export default Login; 