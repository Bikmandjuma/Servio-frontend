const ID_KEY = "servio_chat_guest_id";
const NAME_KEY = "servio_chat_guest_name";

function makeId() {
  if (window.crypto?.randomUUID) return `guest-${window.crypto.randomUUID()}`;
  return `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Same guestId every visit from this browser, created once on first chat. */
export function getGuestId() {
  let id = localStorage.getItem(ID_KEY);
  if (!id) {
    id = makeId();
    localStorage.setItem(ID_KEY, id);
  }
  return id;
}

export function getStoredGuestName() {
  return localStorage.getItem(NAME_KEY) || "";
}

export function setStoredGuestName(name) {
  localStorage.setItem(NAME_KEY, name);
}
