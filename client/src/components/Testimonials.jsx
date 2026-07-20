function Testimonials() {
  const reviews = [
    {
      name: "Rahul Kumar",
      role: "UPSC Aspirant",
      text: "StudyChat AI helped me plan my studies and clear my doubts much faster.",
    },
    {
      name: "Priya Singh",
      role: "B.Tech Student",
      text: "The AI Mentor and PDF Summarizer save me hours every week.",
    },
    {
      name: "Aman Verma",
      role: "JEE Aspirant",
      text: "Mock tests and AI explanations are amazing!",
    },
  ];

  return (
    <section className="py-20 px-8">
      <h2 className="text-5xl font-bold text-center mb-12">
        What Students Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6"
          >
            <p className="text-slate-300 mb-4">
              "{review.text}"
            </p>

            <h3 className="font-bold">{review.name}</h3>

            <p className="text-cyan-400">
              {review.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;