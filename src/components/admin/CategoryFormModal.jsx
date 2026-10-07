import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createCategory, updateCategory } from "../../services/api";

export default function CategoryFormModal({ category, onClose, onSaved }) {
  const isEdit = Boolean(category);
  const [name, setName] = useState(category?.name || "");
  const [order, setOrder] = useState(category?.order ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = { name: name.trim(), order: Number(order) || 0 };
      if (isEdit) await updateCategory(category.id, payload);
      else await createCategory(payload);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't save this category.");
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
          className="w-full max-w-sm rounded-3xl bg-surface p-6 shadow-lift"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-fg">
              {isEdit ? "Edit category" : "New category"}
            </h2>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-fg">Name</span>
              <input
                className="input mt-1.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. POS Systems"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-fg">Display order</span>
              <input
                type="number"
                className="input mt-1.5"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving…" : isEdit ? "Save changes" : "Create category"}
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
