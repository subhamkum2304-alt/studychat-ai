import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-6 py-4 text-white backdrop-blur-md md:px-10">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-cyan-400">
        📚 StudyChat
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        <Link to="/">Home</Link>
        <Link to="/chat">AI Chat</Link>
        <Link to="/notes">Notes</Link>

        {token && (
          <Link to="/dashboard">
            Dashboard
          </Link>
        )}
      </div>

      {!token ? (
        <Link
          to="/login"
          className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Login
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-cyan-300 font-medium">
            👋 {user?.name}
          </span>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-4 py-2 font-semibold hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;