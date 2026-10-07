import { Navigate, NavLink, Outlet } from "react-router-dom";
import { LogOut, Bell, UserCircle2 } from "lucide-react";
import { useIsDesktop } from "../hooks/useMediaQuery";
import { useAdminAuth } from "../auth/AuthProvider";
import MobileHeader from "../components/navigation/MobileHeader";
import MobileBottomNav from "../components/navigation/MobileBottomNav";
import { adminNavigationItems } from "../data/adminNavigation";
import logoMark from "../assets/logo-mark-white.png";

export default function AdminLayout() {
  const isDesktop = useIsDesktop();
  const { isAuthenticated, user, logout } = useAdminAuth();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  if (isDesktop) {
    return (
      <div className="min-h-screen flex bg-paper">
        <aside className="w-64 shrink-0 bg-ink text-white/80 flex flex-col">
          <div className="flex items-center gap-2.5 px-6 h-20 border-b border-white/10">
            <img src={logoMark} alt="Servio" className="h-8 w-8" />
            <span className="font-display font-bold text-white">Servio Admin</span>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {adminNavigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <item.icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-white/10 p-4">
            <button
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-20 flex items-center justify-between px-8 border-b border-line bg-surface">
            <div>
              <p className="text-xs text-muted">Servio Admin</p>
              <p className="font-display font-semibold text-fg">Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted">
                <Bell className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 text-sm text-fg">
                <UserCircle2 className="h-6 w-6 text-muted" />
                {user?.name || "Admin"}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-[68px] bg-paper">
      <MobileHeader
        label="Servio Admin"
        homePath="/admin"
        right={
          <button onClick={logout} className="text-xs font-semibold text-muted rounded-full border border-line px-3 py-1.5">
            Sign out
          </button>
        }
      />
      <main className="flex-1 p-5">
        <Outlet />
      </main>
      <MobileBottomNav items={adminNavigationItems} />
    </div>
  );
}
