import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../../auth/AuthProvider";

export default function UserMenu() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        aria-label="Sign in"
        title="Sign in"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-ink"
      >
        <User className="h-4 w-4" />
      </Link>
    );
  }

  const initial = (user?.name || "S").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-line bg-surface p-2 shadow-lift">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold text-fg truncate">{user?.name}</p>
            <p className="text-xs text-muted truncate">{user?.email}</p>
          </div>
          <div className="my-1 h-px bg-line" />
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-fg hover:bg-paper"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
              navigate("/");
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-fg hover:bg-paper"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
