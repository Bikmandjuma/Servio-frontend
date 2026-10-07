import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { adminLogin } from "../services/api";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await adminLogin(form);
      login(res.data.data.token, res.data.data.user);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.error || "Sign-in failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-content py-16 lg:py-24">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="font-display text-2xl font-bold text-fg text-center">Sign in to Servio</h1>
        <p className="mt-2 text-sm text-muted text-center">
          For Servio staff and support agents.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-3xl border border-line bg-surface p-7 shadow-card">
          <label className="block">
            <span className="text-xs font-semibold text-fg">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              className="input mt-1.5"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@servio.rw"
            />
          </label>
          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-fg">Password</span>
              <Link to="/forgot-password" className="text-xs font-medium text-accent-dark hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="input mt-1.5"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
