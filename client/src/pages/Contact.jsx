import { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Contact StudyChat AI
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Have a question, suggestion or feedback? Send us a message and
            help us improve StudyChat AI.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
            <h2 className="text-2xl font-bold text-cyan-400">
              Get in Touch
            </h2>

            <div className="mt-7 space-y-6 text-slate-300">
              <div>
                <p className="font-semibold text-white">Email</p>
                <p className="mt-1">support@studychatai.com</p>
              </div>

              <div>
                <p className="font-semibold text-white">Website</p>
                <p className="mt-1">www.studychatai.com</p>
              </div>

              <div>
                <p className="font-semibold text-white">Response Time</p>
                <p className="mt-1">Usually within 24–48 hours</p>
              </div>

              <div>
                <p className="font-semibold text-white">Purpose</p>
                <p className="mt-1">
                  Technical support, feedback, partnerships and student
                  suggestions.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-cyan-500/40 bg-slate-900 p-7">
            <h2 className="text-2xl font-bold">Send a Message</h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                Send Message
              </button>

              {submitted && (
                <p className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-center text-green-300">
                  Message submitted successfully.
                </p>
              )}
            </form>
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block rounded-xl border border-slate-700 px-7 py-3 font-semibold transition hover:border-cyan-400"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Contact;