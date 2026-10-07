import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { submitDemoRequest } from "../services/api";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your name."),
  companyName: z.string().optional(),
  phone: z.string().min(6, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email.").optional().or(z.literal("")),
  businessType: z.enum(["RETAIL", "RESTAURANT", "SUPERMARKET", "CAFE", "HOSPITALITY", "OTHER"]),
  numLocations: z.string().optional(),
  currentPos: z.string().optional(),
  lookingFor: z.string().optional(),
});

const businessTypes = [
  ["RETAIL", "Retail"],
  ["RESTAURANT", "Restaurant"],
  ["SUPERMARKET", "Supermarket"],
  ["CAFE", "Café"],
  ["HOSPITALITY", "Hospitality"],
  ["OTHER", "Other"],
];

export default function RequestDemo() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { businessType: "OTHER" } });

  const onSubmit = async (data) => {
    setStatus("sending");
    try {
      await submitDemoRequest(data);
      setStatus("sent");
      reset();
    } catch (err) {
      setStatus("error");
      const issues = err.response?.data?.issues;
      setErrorMessage(
        issues?.length
          ? issues.map((i) => i.message).join(" ")
          : err.response?.data?.error || "Couldn't reach the server. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="container-content py-16 lg:py-24">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-fg leading-tight">
          See Servio in action.
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          Tell us about your business and we'll help you identify the right technology solution.
        </p>
      </div>

      <div className="mt-12 max-w-2xl rounded-3xl border border-line bg-surface p-7 sm:p-9 shadow-card">
        {status === "sent" ? (
          <div className="flex flex-col items-center text-center py-10">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            <p className="mt-4 font-semibold text-fg">Demo request received.</p>
            <p className="mt-1 text-sm text-muted">Servio will reach out to schedule a time.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name" error={errors.fullName?.message}>
                <input {...register("fullName")} className="input" placeholder="Your name" />
              </Field>
              <Field label="Business">
                <input {...register("companyName")} className="input" placeholder="Business name" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} className="input" placeholder="07xx xxx xxx" />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input {...register("email")} className="input" placeholder="you@company.com" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Business Type">
                <select {...register("businessType")} className="input">
                  {businessTypes.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Number of Locations">
                <input {...register("numLocations")} className="input" placeholder="e.g. 2" />
              </Field>
            </div>
            <Field label="Current POS System">
              <input {...register("currentPos")} className="input" placeholder="What are you using now, if anything?" />
            </Field>
            <Field label="What are you looking for?">
              <textarea {...register("lookingFor")} rows={4} className="input resize-none" />
            </Field>

            {status === "error" && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Request a Demo"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-fg">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
