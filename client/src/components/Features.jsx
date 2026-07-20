const features = [
  {
    icon: "🤖",
    title: "AI Study Assistant",
    description:
      "Ask questions and get clear, student-friendly explanations instantly.",
  },
  {
    icon: "📝",
    title: "Smart Notes",
    description:
      "Generate organized and easy-to-revise notes for any subject or topic.",
  },
  {
    icon: "🧪",
    title: "Mock Tests",
    description:
      "Create practice questions and mock tests for better exam preparation.",
  },
  {
    icon: "🎯",
    title: "Personalized Study Plan",
    description:
      "Build a study schedule according to your subjects, goals, and available time.",
  },
  {
    icon: "📄",
    title: "PDF Learning",
    description:
      "Upload study material and ask questions directly from your documents.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description:
      "Track your learning activity and stay consistent with your preparation.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-24 border-t border-slate-800 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Powerful Features
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Everything You Need to Learn Smarter
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            StudyChat AI combines intelligent tools to make studying easier,
            faster, and more personalized.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400"
            >
              <div className="text-4xl">{feature.icon}</div>

              <h3 className="mt-5 text-xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;