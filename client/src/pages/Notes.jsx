import { useState } from "react";
import { Link } from "react-router-dom";

function Notes() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generateNotes(event) {
    event.preventDefault();
    const cleanTopic = topic.trim();
    if (!cleanTopic || isLoading) return;

    setIsLoading(true);
    setNotes("");
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Create clear study notes about "${cleanTopic}". Include: definition, key concepts, important points, formulas when relevant, one simple example, and a short revision summary.`
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Notes could not be generated.");
      setNotes(data.reply);
    } catch (requestError) {
      setError(requestError.message || "Notes could not be generated.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyNotes() {
    if (!notes) return;
    await navigator.clipboard.writeText(notes);
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">AI Study Tool</p>
        <h1 className="mt-2 text-4xl font-bold">Notes Generator</h1>
        <p className="mt-3 text-slate-400">Enter a topic and StudyChat will create structured revision notes.</p>

        <form onSubmit={generateNotes} className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <label htmlFor="topic" className="mb-3 block font-semibold">Topic</label>
          <textarea
            id="topic"
            rows={4}
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Example: Ohm's Law, C loops, Indian Constitution..."
            className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={!topic.trim() || isLoading}
            className="mt-5 w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
          >
            {isLoading ? "Generating Notes..." : "Generate Notes"}
          </button>
        </form>

        {error && <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">{error}</div>}

        {notes && (
          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Generated Notes</h2>
              <button type="button" onClick={copyNotes} className="rounded-xl border border-cyan-400 px-4 py-2 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950">Copy</button>
            </div>
            <div className="whitespace-pre-wrap leading-7 text-slate-200">{notes}</div>
          </section>
        )}

        <div className="mt-8 flex gap-4">
          <Link to="/dashboard" className="rounded-xl border border-slate-700 px-5 py-3 hover:border-cyan-400">← Dashboard</Link>
          <Link to="/chat" className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400">AI Chat</Link>
        </div>
      </div>
    </main>
  );
}

export default Notes;
