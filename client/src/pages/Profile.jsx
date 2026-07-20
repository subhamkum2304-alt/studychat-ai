import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const name = user?.name || "Student";
  const email = user?.email || "No email available";

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-10 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-slate-950 text-4xl font-bold text-cyan-400">
              {name.charAt(0).toUpperCase()}
            </div>

            <h1 className="mt-4 text-3xl font-bold">
              {name}
            </h1>

            <p className="mt-1 text-cyan-100">
              StudyChat AI Student
            </p>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Full Name
              </p>

              <p className="mt-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100">
                {name}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Email Address
              </p>

              <p className="mt-2 break-words rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100">
                {email}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Current Plan
              </p>

              <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
                <span>Free Plan</span>

                <button
                  type="button"
                  onClick={() => navigate("/premium")}
                  className="font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Upgrade
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="rounded-xl border border-slate-700 px-5 py-3 font-semibold transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Go to Dashboard
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;