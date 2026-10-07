import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { X, User, Sun, Moon } from "lucide-react";
import logoMark from "../../assets/logo-mark-dark.png";
import { useAuth } from "../../auth/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Slides up from the bottom like a native app sheet, with a dimmed backdrop.
 * Tapping the backdrop, the close button, or a link closes it; a downward
 * drag past a small threshold also dismisses it.
 *
 * Always includes an Account tile and a Theme tile alongside the overflow
 * nav items, so anything available from the desktop top nav (sign in/account,
 * light/dark mode) is reachable here too — this sheet is reused for both the
 * public site and the admin panel's mobile nav.
 */
export default function MoreBottomSheet({ open, onClose, items }) {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-3xl bg-surface shadow-lift"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) onClose();
            }}
          >
            <div className="flex justify-center pt-3">
              <span className="h-1.5 w-10 rounded-full bg-line" />
            </div>

            <div className="flex items-center justify-between px-6 pt-3 pb-2">
              <div className="flex items-center gap-2">
                <img src={logoMark} alt="" className="h-6 w-6 rounded-md" />
                <span className="font-display font-bold text-fg">More from Servio</span>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-muted"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 px-6 pb-8 pt-2">
              {items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-2 rounded-2xl border py-4 text-center transition-colors ${
                      isActive ? "border-accent bg-accent/10 text-fg" : "border-line text-muted"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-medium leading-tight">{item.label}</span>
                </NavLink>
              ))}

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(isAuthenticated ? "/admin" : "/login");
                }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-line py-4 text-center text-muted transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-xs font-medium leading-tight truncate max-w-full px-1">
                  {isAuthenticated ? user?.name?.split(" ")[0] || "Account" : "Sign in"}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="flex flex-col items-center gap-2 rounded-2xl border border-line py-4 text-center text-muted transition-colors"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="text-xs font-medium leading-tight">
                  {isDark ? "Light mode" : "Dark mode"}
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
