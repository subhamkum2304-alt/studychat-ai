import { Link } from "react-router-dom";

function About() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-center text-5xl font-bold">
          About StudyChat AI
        </h1>

        <p className="mt-5 text-center text-lg text-slate-400">
          Your AI-Powered Study Assistant built to help students learn
          smarter, faster, and with confidence.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold text-cyan-400">
              🚀 Our Mission
            </h2>

            <p className="mt-4 text-slate-300">
              Make quality AI education accessible to every student through
              intelligent learning tools.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold text-cyan-400">
              🎯 Our Vision
            </h2>

            <p className="mt-4 text-slate-300">
              Build India's smartest AI learning platform for school,
              college, competitive exams and lifelong learning.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold text-cyan-400">
              💡 Why StudyChat?
            </h2>

            <p className="mt-4 text-slate-300">
              AI Tutor, Study Notes, Mock Tests, Personalized Learning
              and many more upcoming features.
            </p>
          </div>

        </div>

        <div className="mt-14 rounded-3xl border border-cyan-500 bg-slate-900 p-8 text-center">
          <h2 className="text-3xl font-bold">
            ❤️ Built with Passion
          </h2>

          <p className="mt-4 text-slate-300">
            StudyChat AI is created to empower students through Artificial
            Intelligence and make learning easier for everyone.
          </p>

          <p className="mt-6 text-cyan-400 font-semibold">
            Contact: support@studychatai.com
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="rounded-xl bg-cyan-500 px-8 py-3 font-bold text-slate-950 hover:bg-cyan-400"
          >
            Back Home
          </Link>
        </div>

      </div>
    </main>
  );
}

export default About;