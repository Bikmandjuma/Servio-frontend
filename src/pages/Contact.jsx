import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, MapPin, Mail, CheckCircle2 } from "lucide-react";
import { submitContact } from "../services/api";
import { business } from "../data/business";

const schema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name."),
    companyName: z.string().optional(),
    phone: z.string().min(6, "Please enter a valid phone number."),
    email: z.string().email("Please enter a valid email.").optional().or(z.literal("")),
    businessType: z.enum(["RETAIL", "RESTAURANT", "SUPERMARKET", "CAFE", "HOSPITALITY", "OTHER"]),
    businessTypeOther: z.string().optional(),
    message: z.string().optional(),
  })
  .refine((d) => d.businessType !== "OTHER" || (d.businessTypeOther || "").trim().length > 0, {
    message: "Please tell us what type of business you have.",
    path: ["businessTypeOther"],
  });

const businessTypes = [
  ["RETAIL", "Retail"],
  ["RESTAURANT", "Restaurant"],
  ["SUPERMARKET", "Supermarket"],
  ["CAFE", "Café"],
  ["HOSPITALITY", "Hospitality"],
  ["OTHER", "Other"],
];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { businessType: "RETAIL" } });

  const businessType = watch("businessType");

  const onSubmit = async (data) => {
    setStatus("sending");
    try {
      await submitContact(data);
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
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-fg leading-tight">
            Let's build something better.
          </h1>
          <p className="mt-4 text-muted max-w-sm leading-relaxed">
            Have a question, need a POS system, or want a customized business solution?
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-fg">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted">Phone</p>
                <a href={`tel:${business.phone}`} className="font-semibold text-fg">
                  {business.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-fg">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted">Email</p>
                <a href={`mailto:${business.email}`} className="font-semibold text-fg">
                  {business.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-fg">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted">Location</p>
                <p className="font-semibold text-fg">{business.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-7 sm:p-9 shadow-card">
          <h2 className="font-display text-xl font-bold text-fg">Talk to Servio</h2>

          {status === "sent" ? (
            <div className="mt-8 flex flex-col items-center text-center py-10">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              <p className="mt-4 font-semibold text-fg">Request sent.</p>
              <p className="mt-1 text-sm text-muted">Servio will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name" error={errors.fullName?.message}>
                  <input {...register("fullName")} className="input" placeholder="Your name" />
                </Field>
                <Field label="Company Name">
                  <input {...register("companyName")} className="input" placeholder="Your company" />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone Number" error={errors.phone?.message}>
                  <input {...register("phone")} className="input" placeholder="07xx xxx xxx" />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input {...register("email")} className="input" placeholder="you@company.com" />
                </Field>
              </div>
              <Field label="Business Type">
                <select {...register("businessType")} className="input">
                  {businessTypes.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </Field>
              {businessType === "OTHER" && (
                <Field label="What kind of business is it?" error={errors.businessTypeOther?.message}>
                  <input
                    {...register("businessTypeOther")}
                    className="input"
                    placeholder="e.g. Pharmacy, salon, wholesaler…"
                    autoFocus
                  />
                </Field>
              )}
              <Field label="What do you need?">
                <textarea {...register("message")} rows={4} className="input resize-none" placeholder="Tell us about your business…" />
              </Field>

              {status === "error" && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send Request →"}
              </button>
            </form>
          )}
        </div>
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
