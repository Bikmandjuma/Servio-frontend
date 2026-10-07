import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import logoMark from "../../assets/logo-mark-white.png";
import { startChat, sendGuestChatMessage } from "../../services/api";
import { useChatSocket } from "../../hooks/useChatSocket";
import { getGuestId, getStoredGuestName, setStoredGuestName } from "../../data/chatIdentity";
import TypingDots from "./TypingDots";

export default function ChatWidget({ onClose }) {
  const guestId = useRef(getGuestId()).current;
  const [nameInput, setNameInput] = useState(getStoredGuestName());
  const [started, setStarted] = useState(Boolean(getStoredGuestName()));
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  const appendIfNew = (msg) => {
    setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
  };

  const { online, otherTyping, notifyTyping, stopTyping } = useChatSocket(conversationId, {
    onMessage: appendIfNew,
  });

  // Starts (or resumes) the conversation as soon as we have a name for the
  // guest — either already stored from a previous visit, or just submitted
  // on the intro screen below.
  useEffect(() => {
    if (!started) return;
    const name = getStoredGuestName() || "Guest";
    startChat(guestId, name).then((res) => {
      setConversationId(res.data.data.conversation.id);
      setMessages(res.data.data.conversation.messages || []);
    });
  }, [started, guestId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, otherTyping]);

  const beginChat = (e) => {
    e.preventDefault();
    setStoredGuestName(nameInput.trim() || "Guest");
    setStarted(true);
  };

  const send = async (e) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body || !conversationId || sending) return;
    setSending(true);
    setDraft("");
    stopTyping();
    try {
      const res = await sendGuestChatMessage(conversationId, guestId, body);
      appendIfNew(res.data.data);
    } catch {
      setDraft(body); // put it back so nothing's lost
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ type: "spring", damping: 26, stiffness: 300 }}
      className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-40 flex h-full w-full flex-col overflow-hidden bg-surface shadow-lift sm:h-[560px] sm:max-h-[80vh] sm:w-[380px] sm:rounded-3xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-ink px-5 py-4 text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={logoMark} alt="" className="h-9 w-9 rounded-xl bg-white/10 p-1" />
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink ${
                online ? "bg-emerald-400" : "bg-white/30"
              }`}
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Servio Support</p>
            <p className="text-xs text-white/50">
              {online ? "Online now" : "Typically replies within a few hours"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {!started ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper">
            <MessageCircle className="h-6 w-6 text-ink" />
          </div>
          <div>
            <p className="font-display font-bold text-fg">Chat with Servio</p>
            <p className="mt-1 text-sm text-muted">
              Tell us your name so our team knows who they're talking to.
            </p>
          </div>
          <form onSubmit={beginChat} className="w-full max-w-[260px] space-y-3">
            <input
              autoFocus
              className="input text-center"
              placeholder="Your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <button
              type="submit"
              className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-white"
            >
              Start chatting
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
            {messages.length === 0 && (
              <p className="text-center text-xs text-muted">
                Say hello — Servio usually replies quickly.
              </p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "GUEST" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.sender === "GUEST"
                      ? "rounded-br-sm bg-ink text-white"
                      : "rounded-bl-sm bg-paper text-fg"
                  }`}
                >
                  {m.body}
                  <div
                    className={`mt-1 text-[10px] ${
                      m.sender === "GUEST" ? "text-white/40" : "text-muted"
                    }`}
                  >
                    {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            {otherTyping && (
              <div className="flex justify-start">
                <TypingDots />
              </div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={send} className="flex items-center gap-2 border-t border-line p-3 shrink-0">
            <input
              className="input"
              placeholder="Type a message"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                notifyTyping();
              }}
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}
