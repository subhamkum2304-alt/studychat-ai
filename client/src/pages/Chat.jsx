import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Chat() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hello! I am your StudyChat AI assistant. Ask me any study question.",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanMessage = message.trim();

    if (!cleanMessage || isLoading) {
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: cleanMessage,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/chat`,
  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
        body: JSON.stringify({
          message: cleanMessage,
        }),
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "AI request failed."
        );
      }

      if (!data.reply) {
        throw new Error("AI reply was empty.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            error.message === "Failed to fetch"
              ? "Server is not responding. Please check whether the backend is running."
              : `Sorry, AI reply could not load. ${error.message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function startNewChat() {
    if (isLoading) {
      return;
    }

    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "New chat started. What would you like to study?",
      },
    ]);

    setMessage("");
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-950 px-3 py-4 text-white sm:px-4 sm:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-105px)] max-w-6xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl sm:min-h-[calc(100vh-120px)] sm:rounded-3xl">
        <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950 p-5 md:block">
          <Link
            to="/"
            className="mb-6 block text-xl font-bold text-cyan-400"
          >
            📚 StudyChat AI
          </Link>

          <button
            type="button"
            onClick={startNewChat}
            disabled={isLoading}
            className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            + New Chat
          </button>

          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Study Tools
            </p>

            <div className="space-y-2 text-sm text-slate-300">
              <button
                type="button"
                className="w-full rounded-lg bg-slate-800 px-3 py-2 text-left text-cyan-400"
              >
                🤖 AI Tutor
              </button>

              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg px-3 py-2 text-left opacity-50"
              >
                📝 Notes Generator — Soon
              </button>

              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg px-3 py-2 text-left opacity-50"
              >
                🧠 AI Quiz — Soon
              </button>

              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg px-3 py-2 text-left opacity-50"
              >
                📅 Study Planner — Soon
              </button>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-800 px-4 py-4 sm:px-5">
            <div>
              <h1 className="text-lg font-bold sm:text-xl">
                AI Study Assistant
              </h1>

              <p className="text-xs text-slate-400 sm:text-sm">
                Ask questions, solve doubts and prepare smarter.
              </p>
            </div>

            <button
              type="button"
              onClick={startNewChat}
              disabled={isLoading}
              className="rounded-lg border border-cyan-400 px-3 py-2 text-sm font-semibold text-cyan-400 md:hidden"
            >
              New
            </button>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-5">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[80%] sm:text-base ${
                    item.role === "user"
                      ? "rounded-br-md bg-cyan-500 text-slate-950"
                      : "rounded-bl-md border border-slate-700 bg-slate-800 text-slate-100"
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300">
                  <span className="animate-pulse">
                    StudyChat is thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-800 p-3 sm:p-4"
          >
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Ask any study question..."
                disabled={isLoading}
                maxLength={2000}
                autoComplete="off"
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
              />

              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="rounded-xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
              >
                {isLoading ? "Wait..." : "Send"}
              </button>
            </div>

            <p className="mt-2 text-center text-xs text-slate-600">
              StudyChat AI may make mistakes. Verify important answers.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Chat; 