import { useEffect, useRef, useState } from "react";
import { getSocket } from "../services/socket";

const TYPING_STOP_DELAY = 2500;

/**
 * Joins a chat conversation's realtime room and wires up presence, typing,
 * and new-message events. Message history itself is loaded via REST (see
 * services/api.js) — this hook only handles what needs to be live.
 *
 * @param {string|null} conversationId
 * @param {{ token?: string, onMessage?: (msg) => void }} options
 *   `token` is only passed by the admin panel, to prove staff identity.
 */
export function useChatSocket(conversationId, { token, onMessage } = {}) {
  const [online, setOnline] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const stopTypingTimerRef = useRef(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    if (!conversationId) return undefined;
    const socket = getSocket();

    socket.emit("join", { conversationId, token });

    const handlePresence = (p) => setOnline(Boolean(p.online));
    const handleTyping = (t) => {
      setOtherTyping(Boolean(t.isTyping));
      clearTimeout(typingTimeoutRef.current);
      if (t.isTyping) {
        // Safety net in case a "stopped typing" event never arrives.
        typingTimeoutRef.current = setTimeout(() => setOtherTyping(false), TYPING_STOP_DELAY);
      }
    };
    const handleMessage = (msg) => onMessageRef.current?.(msg);

    socket.on("presence", handlePresence);
    socket.on("typing", handleTyping);
    socket.on("message:new", handleMessage);

    return () => {
      socket.off("presence", handlePresence);
      socket.off("typing", handleTyping);
      socket.off("message:new", handleMessage);
      socket.emit("leave", { conversationId });
      clearTimeout(typingTimeoutRef.current);
      clearTimeout(stopTypingTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, token]);

  /** Call on every keystroke in the message input; debounced automatically. */
  function notifyTyping() {
    if (!conversationId) return;
    const socket = getSocket();
    socket.emit("typing", { isTyping: true });
    clearTimeout(stopTypingTimerRef.current);
    stopTypingTimerRef.current = setTimeout(() => {
      socket.emit("typing", { isTyping: false });
    }, 1200);
  }

  /** Call right after sending a message, so "typing…" doesn't linger under
   * the message that just answered it. */
  function stopTyping() {
    if (!conversationId) return;
    clearTimeout(stopTypingTimerRef.current);
    getSocket().emit("typing", { isTyping: false });
  }

  return { online, otherTyping, notifyTyping, stopTyping };
}
