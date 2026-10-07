import { io } from "socket.io-client";

// Same trick as services/api.js: derive the server's origin from
// VITE_API_URL (which points at .../api) so both stay in sync from one
// env var.
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const socketUrl = apiUrl.replace(/\/api\/?$/, "");

let socket = null;

/** One shared connection for the whole tab — chat widget and admin Live Chat
 * page both call this rather than each opening their own socket. */
export function getSocket() {
  if (!socket) {
    socket = io(socketUrl, { transports: ["websocket"], autoConnect: true });
  }
  return socket;
}
