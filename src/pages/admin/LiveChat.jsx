import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Send, MessageCircle } from "lucide-react";
import { fetchChatConversations, fetchAdminChatMessages, sendAdminChatMessage } from "../../services/api";
import { useChatSocket } from "../../hooks/useChatSocket";
import { useAuth } from "../../auth/AuthProvider";
import TypingDots from "../../components/chat/TypingDots";

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function AdminLiveChat() {
  const { token } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  const loadConversations = () => {
    fetchChatConversations({ limit: 30 })
      .then((res) => setConversations(res.data.data))
      .finally(() => setLoadingList(false));
  };

  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 15000); // light polling for the list
    return () => clearInterval(interval);
  }, []);

  const appendIfNew = (msg) => {
    setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
    loadConversations();
  };

  const { otherTyping, notifyTyping, stopTyping } = useChatSocket(selected?.id || null, {
    token,
    onMessage: appendIfNew,
  });

  const openConversation = (conv) => {
    setSelected(conv);
    setMessages([]);
    fetchAdminChatMessages(conv.id).then((res) => {
      setMessages(res.data.data.messages);
      loadConversations(); // unread count just cleared server-side
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, otherTyping]);

  const send = async (e) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body || !selected) return;
    setDraft("");
    stopTyping();
    const res = await sendAdminChatMessage(selected.id, body);
    appendIfNew(res.data.data);
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-fg">Live Chat</h1>
      <p className="mt-1 text-sm text-muted">Conversations started from the chat widget on the website.</p>

      <div className="mt-6 grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[300px_1fr] lg:h-[600px]">
        {/* Conversation list */}
        <div className={`border-line lg:border-r ${selected ? "hidden lg:block" : ""}`}>
          <div className="max-h-[600px] overflow-y-auto">
            {loadingList ? (
              <p className="p-5 text-sm text-muted">Loading…</p>
            ) : conversations.length === 0 ? (
              <p className="p-5 text-sm text-muted">No conversations yet.</p>
            ) : (
              conversations.map((c) => {
                const last = c.messages?.[0];
                const unread = c._count?.messages || 0;
                return (
                  <button
                    key={c.id}
                    onClick={() => openConversation(c)}
                    className={`flex w-full items-start gap-3 border-b border-line px-4 py-3 text-left transition-colors hover:bg-paper ${
                      selected?.id === c.id ? "bg-paper" : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                      {c.guestName?.charAt(0).toUpperCase() || "G"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-fg">{c.guestName}</p>
                        <span className="shrink-0 text-[11px] text-muted">{timeAgo(c.lastMessageAt)}</span>
                      </div>
                      <p className="truncate text-xs text-muted">{last?.body || "No messages yet"}</p>
                    </div>
                    {unread > 0 && (
                      <span className="mt-1 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-ink">
                        {unread}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Thread */}
        <div className={`flex flex-col ${selected ? "" : "hidden lg:flex"}`}>
          {!selected ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted">
              <MessageCircle className="h-8 w-8" />
              <p className="text-sm">Select a conversation to start replying.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <button onClick={() => setSelected(null)} className="lg:hidden text-muted">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                  {selected.guestName?.charAt(0).toUpperCase() || "G"}
                </div>
                <p className="font-semibold text-fg">{selected.guestName}</p>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "ADMIN" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.sender === "ADMIN" ? "rounded-br-sm bg-ink text-white" : "rounded-bl-sm bg-paper text-fg"
                      }`}
                    >
                      {m.body}
                      <div className={`mt-1 text-[10px] ${m.sender === "ADMIN" ? "text-white/40" : "text-muted"}`}>
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

              <form onSubmit={send} className="flex items-center gap-2 border-t border-line p-3">
                <input
                  className="input"
                  placeholder="Type a reply"
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
                  aria-label="Send reply"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
