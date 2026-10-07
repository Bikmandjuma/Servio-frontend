import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { requestPasswordReset } from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await requestPasswordReset(email);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.response?.data?.error || "Couldn't reach the server. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="container-content py-16 lg:py-24">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="font-display text-2xl font-bold text-fg text-center">Reset your password</h1>
        <p className="mt-2 text-sm text-muted text-center">
          Enter your email and we'll send you a link to set a new one.
        </p>

        <div className="mt-8 rounded-3xl border border-line bg-surface p-7 shadow-card">
          {status === "sent" ? (
            <div className="flex flex-col items-center text-center py-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              <p className="mt-4 font-semibold text-fg">Check your email.</p>
              <p className="mt-1 text-sm text-muted">
                If an account exists for {email}, a reset link is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-fg">Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  className="input mt-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@servio.rw"
                />
              </label>

              {status === "error" && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send reset link"}
              </button>
            </form>
          )}
        </div>

        <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-muted hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
