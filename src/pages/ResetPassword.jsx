import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { resetPassword } from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("idle"); // idle | saving | done | error
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setError("");
    setStatus("saving");
    try {
      await resetPassword(token, password);
      setStatus("done");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.error || "This reset link is invalid or has expired.");
    }
  };

  return (
    <div className="container-content py-16 lg:py-24">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="font-display text-2xl font-bold text-fg text-center">Set a new password</h1>

        <div className="mt-8 rounded-3xl border border-line bg-surface p-7 shadow-card">
          {status === "done" ? (
            <div className="flex flex-col items-center text-center py-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              <p className="mt-4 font-semibold text-fg">Password updated.</p>
              <p className="mt-1 text-sm text-muted">Taking you to sign in…</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-fg">New password</span>
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="input mt-1.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-fg">Confirm password</span>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  className="input mt-1.5"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Type it again"
                />
              </label>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={status === "saving"}
                className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {status === "saving" ? "Saving…" : "Update password"}
              </button>
            </form>
          )}
        </div>

        <Link to="/login" className="mt-6 block text-center text-sm font-medium text-muted hover:text-fg">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
