function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-12 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-3xl font-bold text-cyan-400">
            📚 StudyChat
          </h2>

          <p className="text-slate-400 mt-4">
            AI Powered Learning Platform for Students.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Product</h3>

          <p className="text-slate-400">AI Chat</p>
          <p className="text-slate-400">Notes Generator</p>
          <p className="text-slate-400">Mock Tests</p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Company</h3>

          <p className="text-slate-400">About</p>
          <p className="text-slate-400">Contact</p>
          <p className="text-slate-400">Careers</p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Legal</h3>

          <p className="text-slate-400">Privacy Policy</p>
          <p className="text-slate-400">Terms of Service</p>
        </div>

      </div>

      <div className="text-center text-slate-500 mt-10">
        © 2026 StudyChat. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;