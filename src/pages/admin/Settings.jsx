import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { fetchSettings, updateSettings } from "../../services/api";

export default function AdminSettings() {
  const [form, setForm] = useState({ phone: "", whatsapp: "", email: "", location: "" });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSettings()
      .then((res) => setForm(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await updateSettings(form);
      setForm(res.data.data);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.error || "Couldn't save settings.");
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-fg">Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Business contact details shown across the website (footer, Contact page, WhatsApp button).
      </p>

      <div className="mt-6 max-w-lg rounded-2xl border border-line bg-surface p-6">
        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-fg">Phone (displayed)</span>
              <input
                className="input mt-1.5"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="0795020004"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-fg">
                WhatsApp number <span className="font-normal text-muted">(international format, no +)</span>
              </span>
              <input
                className="input mt-1.5"
                value={form.whatsapp}
                onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
                placeholder="250795020004"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-fg">Email</span>
              <input
                type="email"
                className="input mt-1.5"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="servio.rw@gmail.com"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-fg">Location</span>
              <input
                className="input mt-1.5"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="CHIC Building, Downtown Kigali"
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={status === "saving"}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {status === "saving" ? "Saving…" : "Save changes"}
              </button>
              {status === "saved" && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> Saved
                </span>
              )}
            </div>
          </form>
        )}
      </div>

      <p className="mt-4 max-w-lg text-xs text-muted">
        Note: these values are stored in the database and power the API's{" "}
        <code className="font-mono">/api/settings</code> endpoint. The live site's footer and WhatsApp
        button currently read from <code className="font-mono">frontend/src/data/business.js</code> at
        build time — wire that file to this endpoint if you want changes here to reflect on the site
        without a rebuild.
      </p>
    </div>
  );
}
