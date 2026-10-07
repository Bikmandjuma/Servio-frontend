import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, FileText, CalendarClock, MonitorSmartphone } from "lucide-react";
import { fetchDashboardStats } from "../../services/api";

const statCards = [
  { key: "contactRequests", label: "Requests", icon: Inbox, to: "/admin/contacts" },
  { key: "quoteRequests", label: "Quotes", icon: FileText, to: "/admin/quotes" },
  { key: "demoRequests", label: "Demo Requests", icon: CalendarClock, to: "/admin/demo-requests" },
  { key: "products", label: "Products", icon: MonitorSmartphone, to: "/admin/products" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchDashboardStats()
      .then((res) => setStats(res.data.data))
      .catch(() => setError(true));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-fg">Servio Admin</h1>
      <p className="mt-1 text-sm text-muted">An overview of what's coming in from the website.</p>

      {error && (
        <p className="mt-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Couldn't reach the API. Make sure the backend is running and{" "}
          <code className="font-mono">VITE_API_URL</code> is set correctly.
        </p>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((c) => (
          <Link
            key={c.key}
            to={c.to}
            className="rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper text-fg">
              <c.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-fg">
              {stats ? stats.totals[c.key] : "—"}
            </p>
            <p className="mt-1 text-sm text-muted">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <RecentList title="Recent Requests" items={stats?.recent?.contacts} nameKey="fullName" subKey="companyName" />
        <RecentList title="Recent Quotes" items={stats?.recent?.quotes} nameKey="fullName" subKey="businessType" />
        <RecentList title="Recent Demo Requests" items={stats?.recent?.demos} nameKey="fullName" subKey="companyName" />
      </div>
    </div>
  );
}

function RecentList({ title, items, nameKey, subKey }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <h3 className="font-semibold text-fg text-sm">{title}</h3>
      <div className="mt-4 space-y-4">
        {!items ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted">Nothing yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-fg">{item[nameKey]}</p>
                <p className="text-xs text-muted">{item[subKey] || "—"}</p>
              </div>
              <span className="text-xs text-muted whitespace-nowrap">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
