import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="px-6 py-24 text-center">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          AI-Powered Learning Platform
        </p>

        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
          Learn Faster with
          <span className="text-cyan-400"> StudyChat AI</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Ask questions, generate notes, prepare mock tests and create a
          personalized study plan.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/chat"
            className="rounded-xl bg-cyan-500 px-8 py-3 font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            Start AI Chat
          </Link>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-xl border border-cyan-400 px-8 py-3 font-bold text-white transition hover:bg-cyan-400 hover:text-slate-950"
          >
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;