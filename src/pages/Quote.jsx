import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Utensils,
  ShoppingCart,
  Coffee,
  MoreHorizontal,
  MonitorSmartphone,
  Cpu,
  Layers3,
  Settings2,
  Boxes,
  CheckCircle2,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";
import { submitQuote } from "../services/api";
import ChevronMark from "../components/ui/ChevronMark";

const businessTypes = [
  { value: "RETAIL", label: "Retail", icon: ShoppingBag },
  { value: "RESTAURANT", label: "Restaurant", icon: Utensils },
  { value: "SUPERMARKET", label: "Supermarket", icon: ShoppingCart },
  { value: "CAFE", label: "Café", icon: Coffee },
  { value: "OTHER", label: "Other", icon: MoreHorizontal },
];

const needsOptions = [
  { value: "POS", label: "POS", icon: MonitorSmartphone },
  { value: "Hardware", label: "Hardware", icon: Cpu },
  { value: "Software", label: "Software", icon: Layers3 },
  { value: "Customization", label: "Customization", icon: Settings2 },
  { value: "Complete Setup", label: "Complete Setup", icon: Boxes },
];

const locationOptions = ["1", "2-5", "6-10", "10+"];

const steps = ["Business", "Needs", "Locations", "Contact"];

export default function Quote() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    businessType: "",
    needs: [],
    locations: "",
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
  });

  const toggleNeed = (value) => {
    setForm((f) => ({
      ...f,
      needs: f.needs.includes(value) ? f.needs.filter((n) => n !== value) : [...f.needs, value],
    }));
  };

  const canNext = () => {
    if (step === 0) return Boolean(form.businessType);
    if (step === 1) return form.needs.length > 0;
    if (step === 2) return Boolean(form.locations);
    return true;
  };

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const canSubmit = () =>
    step === 3 && form.fullName.trim().length >= 2 && form.phone.trim().length >= 6;

  const onSubmit = async () => {
    // Belt-and-braces guard: the "Get my quote" button only renders (and is
    // only enabled) once these are true, but re-checking here means a click
    // can never send a request with missing required fields, no matter what
    // triggered it.
    if (!canSubmit() || status === "sending") return;
    setStatus("sending");
    try {
      await submitQuote(form);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      const backendMessage = err.response?.data?.error;
      const issues = err.response?.data?.issues;
      setErrorMessage(
        issues?.length
          ? issues.map((i) => i.message).join(" ")
          : backendMessage || "Couldn't reach the server. Please check your connection and try again."
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="container-content py-24 max-w-lg text-center">
        <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-500" />
        <h1 className="mt-5 font-display text-2xl font-bold text-fg">
          We'll help you find the right solution.
        </h1>
        <p className="mt-2 text-muted">
          Thanks, {form.fullName.split(" ")[0] || "there"}. Servio will follow up shortly with a
          tailored quote.
        </p>
      </div>
    );
  }

  return (
    <div className="container-content py-16 lg:py-24">
      <div className="max-w-xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Get a Quote
        </h1>
        <p className="mt-3 text-muted">A few quick questions and Servio takes it from there.</p>
      </div>

      <div className="mt-10 flex items-center gap-3 max-w-xl">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-3 flex-1">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i <= step ? "bg-ink text-white" : "bg-line text-muted"
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i <= step ? "text-fg" : "text-muted"}`}>
              {label}
            </span>
            {i < steps.length - 1 && <span className="h-px flex-1 bg-line" />}
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-xl rounded-3xl border border-line bg-surface p-7 sm:p-9 shadow-card">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <h2 className="font-display text-lg font-bold text-fg">What type of business do you run?</h2>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {businessTypes.map((b) => (
                  <button
                    type="button"
                    key={b.value}
                    onClick={() => setForm((f) => ({ ...f, businessType: b.value }))}
                    className={`flex flex-col items-center gap-2 rounded-2xl border py-5 text-center transition-colors ${
                      form.businessType === b.value ? "border-ink bg-ink text-white" : "border-line text-fg"
                    }`}
                  >
                    <b.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{b.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <h2 className="font-display text-lg font-bold text-fg">What do you need?</h2>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {needsOptions.map((n) => (
                  <button
                    type="button"
                    key={n.value}
                    onClick={() => toggleNeed(n.value)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border py-5 text-center transition-colors ${
                      form.needs.includes(n.value) ? "border-ink bg-ink text-white" : "border-line text-fg"
                    }`}
                  >
                    <n.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{n.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <h2 className="font-display text-lg font-bold text-fg">How many locations?</h2>
              <div className="mt-6 grid grid-cols-4 gap-3">
                {locationOptions.map((l) => (
                  <button
                    type="button"
                    key={l}
                    onClick={() => setForm((f) => ({ ...f, locations: l }))}
                    className={`rounded-2xl border py-5 text-center font-semibold transition-colors ${
                      form.locations === l ? "border-ink bg-ink text-white" : "border-line text-fg"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSubmit();
                }
              }}
            >
              <h2 className="font-display text-lg font-bold text-fg">Your contact details</h2>
              <div className="mt-6 space-y-4">
                <input
                  required
                  className="input"
                  placeholder="Full name"
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                />
                <input
                  className="input"
                  placeholder="Company name"
                  value={form.companyName}
                  onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    className="input"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                  <input
                    className="input"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
              </div>
              {status === "error" && (
                <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-9 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canNext()}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              Continue <ChevronMark className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!canSubmit() || status === "sending"}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              {status === "sending" ? "Sending…" : "Get my quote"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
