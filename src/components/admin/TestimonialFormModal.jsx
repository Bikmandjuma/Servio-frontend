import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createTestimonial, updateTestimonial } from "../../services/api";

export default function TestimonialFormModal({ testimonial, onClose, onSaved }) {
  const isEdit = Boolean(testimonial);
  const [form, setForm] = useState({
    authorName: testimonial?.authorName || "",
    company: testimonial?.company || "",
    quote: testimonial?.quote || "",
    rating: testimonial?.rating ?? 5,
    published: testimonial?.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.authorName.trim() || form.quote.trim().length < 5) {
      setError("Author name and a quote (5+ characters) are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        authorName: form.authorName.trim(),
        company: form.company.trim() || undefined,
        quote: form.quote.trim(),
        rating: Number(form.rating),
        published: form.published,
      };
      if (isEdit) await updateTestimonial(testimonial.id, payload);
      else await createTestimonial(payload);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't save this testimonial.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-3xl bg-surface p-6 shadow-lift"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-fg">
              {isEdit ? "Edit testimonial" : "New testimonial"}
            </h2>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-semibold text-fg">Author name</span>
                <input
                  className="input mt-1.5"
                  value={form.authorName}
                  onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
                  placeholder="e.g. Amina Hassan"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-fg">Company</span>
                <input
                  className="input mt-1.5"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  placeholder="e.g. Kigali Fresh Mart"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold text-fg">Quote</span>
              <textarea
                rows={3}
                className="input mt-1.5 resize-none"
                value={form.quote}
                onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                placeholder="What they said about Servio"
              />
            </label>

            <div className="grid grid-cols-2 gap-3 items-end">
              <label className="block">
                <span className="text-xs font-semibold text-fg">Rating</span>
                <select
                  className="input mt-1.5"
                  value={form.rating}
                  onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} star{n === 1 ? "" : "s"}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 pb-2.5">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="h-4 w-4 rounded border-line"
                />
                <span className="text-sm text-fg">Published (visible on site)</span>
              </label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving…" : isEdit ? "Save changes" : "Create testimonial"}
              </button>
              <button type="button" onClick={onClose} className="text-sm font-semibold text-muted">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
