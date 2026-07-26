"use client";

import { useMemo, useRef, useState } from "react";
import { Sparkles, Plus, X, Copy, Check, Pencil } from "lucide-react";
import styles from "./EKChatbot.module.css";

// --- SUB-COMPONENT: Copy Button ---
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
      title="Copy message"
    >
      {copied ? (
        <Check size={14} className="text-green-500" />
      ) : (
        <Copy size={14} />
      )}
    </button>
  );
}

// --- SUB-COMPONENT: Edit Button ---
function EditButton({ onEditInit }) {
  return (
    <button
      onClick={onEditInit}
      className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      title="Edit message"
    >
      <Pencil size={14} />
    </button>
  );
}

const INITIAL_MESSAGE = {
  role: "assistant",
  text: "Hi, I’m EK.ai. Ask me anything about this property page.",
};

// --- MAIN COMPONENT ---
export default function EKChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  // States for handling ChatGPT-style prompt editing
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const scrollRef = useRef(null);

  const canSend = useMemo(
    () => question.trim().length > 0 && !isLoading,
    [question, isLoading],
  );

  // Central trigger to clear chat history
  const handleNewChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setQuestion("");
    setEditingIndex(null);
  };

  // Shared response orchestrator
  async function executeChatRequest(promptText, targetedHistory) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: promptText }),
      });

      const data = await res.json();
      const answer = data?.answer ?? "No response from server.";

      setMessages([...targetedHistory, { role: "assistant", text: answer }]);
    } catch {
      setMessages([
        ...targetedHistory,
        { role: "assistant", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        if (scrollRef.current)
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }

  async function onAsk() {
    const q = question.trim();
    if (!q || isLoading) return;

    const nextHistory = [...messages, { role: "user", text: q }];
    setMessages(nextHistory);
    setQuestion("");
    await executeChatRequest(q, nextHistory);
  }

  // ChatGPT behavior: Truncates history to the edited point and re-submits
  async function onSaveEdit(index) {
    const cleanedText = editText.trim();
    if (!cleanedText || isLoading) return;

    const modifiedUserMsg = { role: "user", text: cleanedText };
    const truncatedHistory = [...messages.slice(0, index), modifiedUserMsg];

    setMessages(truncatedHistory);
    setEditingIndex(null);
    await executeChatRequest(cleanedText, truncatedHistory);
  }

  return (
    <div
      className={`${styles.root} fixed bottom-6 right-6 z-50 font-sans antialiased`}
    >
      {/* Launcher Button */}
      {!isOpen && (
        <button
          className={`${styles.launcher} !p-1 !bg-transparent !shadow-none border-1 border-white w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 hover:border-indigo-700 active:scale-95 transition-all duration-300`}
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Chat"
        >
          <Sparkles
            size={30}
            strokeWidth={1.5}
            className="align-middle"
            style={{ stroke: "url(#sparkle-gradient)" }}
          />
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <linearGradient
              id="sparkle-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="80%" stopColor="orangered" />
              <stop offset="120%" stopColor="#facc15" />
            </linearGradient>
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`${styles.wrapper} w-[360px] sm:w-[385px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-6.5rem)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`}
        >
          <div
            className={`${styles.card} flex flex-col h-full bg-slate-50 rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden`}
            role="region"
            aria-label="AI Assistant Chat"
          >
            {/* Header Area */}
            <div
              className={`${styles.header} flex items-center justify-between p-4 bg-white border-b border-slate-100 text-slate-800 shadow-sm shadow-slate-100/40`}
            >
              <div className={`${styles.brand} flex items-center gap-3`}>
                <div
                  className={`${styles.logo} flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-500 to-purple-400 text-white border border-indigo-400/10 shadow-sm flex-shrink-0`}
                >
                  <svg
                    className="w-5.5 h-5.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.64 2.08a.75.75 0 0 1 1.44 0l1.92 5.77a.75.75 0 0 0 .47.47l5.77 1.92a.75.75 0 0 1 0 1.44l-5.77 1.92a.75.75 0 0 0-.47-.47l-1.92 5.77a.75.75 0 0 1-1.44 0l-1.92-5.77a.75.75 0 0 0-.47-.47L3.06 13.6a.75.75 0 0 1 0-1.44l5.77-1.92a.75.75 0 0 0 .47-.47l1.92-5.77zm6.75 14.25a.38.38 0 0 1 .72 0l.48 1.44c.04.1.12.18.22.22l1.44.48a.38.38 0 0 1 0 .72l-1.44.48a.38.38 0 0 0-.22.22l-.48 1.44a.38.38 0 0 1-.72 0l-.48-1.44a.38.38 0 0 0-.22-.22l-1.44-.48a.38.38 0 0 1 0-.72l1.44-.48a.38.38 0 0 0 .22-.22l.48-1.44z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`${styles.name} font-bold text-sm tracking-tight text-slate-900 leading-tight`}
                  >
                    EK.ai
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold mt-0.5 tracking-wide uppercase">
                    Online
                  </span>
                </div>
              </div>

              {/* Window Controls (New Chat + Close) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNewChat}
                  className="p-2 rounded-full bg-black text-white transition-all duration-200 hover:bg-gray-800"
                  title="Start New Chat"
                >
                  <Plus size={22} strokeWidth={2.5} />
                </button>

                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X size={22} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Chat Messages Panel */}
            <div
              className={`${styles.body} flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60`}
            >
              {messages.map((m, i) => {
                const isUser = m.role === "user";
                const isEditingThis = editingIndex === i;

                return (
                  <div
                    key={i}
                    className={`group flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    {isEditingThis ? (
                      /* Inline Editing Field Container */
                      <div className="w-[85%] bg-white border border-slate-200 rounded-2xl p-3 space-y-2 shadow-inner">
                        <textarea
                          className="w-full text-sm text-slate-800 bg-transparent resize-none outline-none"
                          rows={2}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 text-xs">
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => onSaveEdit(i)}
                            className="px-2.5 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                          >
                            Save &amp; Submit
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Plain Bubble + Top-Right Action Buttons (Copy + Edit) for BOTH sides
                      <div
                        className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}
                      >
                        <div className="relative max-w-[85%]">
                          {/* Top-right actions */}
                          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CopyButton text={m.text} />
                            <EditButton
                              onEditInit={() => {
                                setEditingIndex(i);
                                setEditText(m.text);
                              }}
                            />
                          </div>

                          {/* Bubble */}
                          <div
                            className={[
                              styles.bubble,
                              "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap  transition-all duration-200 shadow-sm",
                              "pr-12", // room for top-right icons
                              isUser
                                ? "bg-indigo-200 text-slate-900  border-indigo-100/80 rounded-br-none"
                                : "bg-white text-slate-900 border border-slate-200/80 rounded-bl-none",
                            ].join(" ")}
                          >
                            {m.text}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Dynamic Loading Selector */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200/60 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1.5 items-center shadow-sm">
                    <span
                      className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Input Bar Layout */}
            <div
              className={`${styles.footer} p-4 border-t border-slate-100 bg-white flex items-center gap-2`}
            >
              <input
                className={`${styles.input} flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-black placeholder-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all duration-150`}
                value={question}
                placeholder="Ask a question..."
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onAsk();
                }}
              />

              <button
                className={`${styles.button} font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-150 min-w-[68px] ${
                  canSend
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/10 active:scale-95 cursor-pointer hover:bg-gray-200"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
                onClick={onAsk}
                disabled={!canSend}
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
