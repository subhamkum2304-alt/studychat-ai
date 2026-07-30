import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Chat() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

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
  useEffect(() => {
  async function loadChats() {
    try {
      const token = localStorage.getItem("token");

      console.log(import.meta.env.VITE_API_URL);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setChatHistory(data.chats);
      }
    } catch (error) {
      console.error("Chat history error:", error);
    }
  }

  loadChats();
}, []);

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
  chatId: selectedChat?._id,

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
      if (data.chat) {
  setSelectedChat(data.chat);
}
      setChatHistory((current) => [
  {
    _id: crypto.randomUUID(),
    title: cleanMessage.substring(0, 40),
    messages: [
      {
        role: "user",
        content: cleanMessage,
      },
      {
        role: "assistant",
        content: data.reply,
      },
    ],
  },
  ...current,
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
      setSelectedChat(null);
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "New chat started. What would you like to study?",
      },
    ]);

    setMessage("");
  }
   async function deleteChat(chatId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/chat/${chatId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Delete failed");
    }

    setChatHistory((current) =>
      current.filter((chat) => chat._id !== chatId)
    );

    if (selectedChat?._id === chatId) {
      startNewChat();
    }
  } catch (error) {
    console.error(error);
    alert("Could not delete chat.");
  }
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
        <div className="mb-6">
  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
    Recent Chats
  </p>

  {chatHistory.map((chat) => (
  <div
    key={chat._id}
    className="mb-2 flex items-center gap-2"
  >
    <button
      type="button"
      onClick={() => {
        setSelectedChat(chat);

        setMessages(
          chat.messages.map((item) => ({
            id: crypto.randomUUID(),
            role: item.role,
            text: item.content,
          }))
        );
      }}
      className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"
    >
      {chat.title}
    </button>

    <button
      type="button"
      onClick={() => deleteChat(chat._id)}
      className="rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700"
    >
      🗑
    </button>
  </div>
))}
</div>
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