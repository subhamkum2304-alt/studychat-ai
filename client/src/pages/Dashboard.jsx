import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

function handleLogout() {
  localStorage.removeItem("token");
  navigate("/login");
}
  const stats = [
    
    {
      title: "Study Hours",
      value: "12.5",
      icon: "⏱️",
      note: "This week",
    },
    {
      title: "Mock Tests",
      value: "8",
      icon: "📝",
      note: "3 completed today",
    },
    {
      title: "Notes Generated",
      value: "24",
      icon: "📚",
      note: "AI-powered notes",
    },
    {
      title: "Current Progress",
      value: "72%",
      icon: "📈",
      note: "Keep going",
    },
  ];

  const activities = [
    "Completed UPSC Polity mock test",
    "Generated Digital Electronics notes",
    "Asked AI Tutor about C loops",
    "Created a 7-day study plan",
  ];

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-950 px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Student Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Welcome back, Shubham 👋
            </h1>

            <p className="mt-2 text-slate-400">
              Continue your learning journey and track your progress.
            </p>
          </div>

          <Link
            to="/chat"
            className="rounded-xl bg-cyan-500 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            Open AI Chat
          </Link>
          <button
  onClick={handleLogout}
  className="rounded-xl bg-red-500 px-6 py-3 font-bold text-white transition hover:bg-red-600"
>
  Logout
</button>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm text-slate-500">{item.note}</span>
              </div>

              <p className="mt-6 text-sm text-slate-400">{item.title}</p>

              <h2 className="mt-1 text-4xl font-bold text-cyan-400">
                {item.value}
              </h2>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Weekly Progress</h2>
                <p className="text-sm text-slate-400">
                  Your learning performance this week
                </p>
              </div>

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
                +18%
              </span>
            </div>

            <div className="space-y-6">
              <ProgressBar label="Study Plan" value={82} />
              <ProgressBar label="Mock Tests" value={68} />
              <ProgressBar label="Notes Revision" value={74} />
              <ProgressBar label="Daily Goals" value={61} />
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Quick Actions</h2>

            <p className="mt-1 text-sm text-slate-400">
              Continue with your study tools
            </p>

            <div className="mt-6 space-y-3">
              <Link
                to="/chat"
                className="block rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                🤖 Ask AI Tutor
              </Link>

              <button className="w-full rounded-xl border border-slate-700 px-4 py-3 text-left transition hover:border-cyan-400 hover:bg-slate-800">
                📝 Start Mock Test
              </button>

              <button className="w-full rounded-xl border border-slate-700 px-4 py-3 text-left transition hover:border-cyan-400 hover:bg-slate-800">
                📄 Generate Notes
              </button>

              <button className="w-full rounded-xl border border-slate-700 px-4 py-3 text-left transition hover:border-cyan-400 hover:bg-slate-800">
                📅 Create Study Plan
              </button>
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Recent Activity</h2>

          <div className="mt-6 divide-y divide-slate-800">
            {activities.map((activity, index) => (
              <div
                key={activity}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                    {index + 1}
                  </div>

                  <p className="text-slate-200">{activity}</p>
                </div>

                <span className="text-sm text-slate-500">Today</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-semibold text-cyan-400">{value}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default Dashboard;