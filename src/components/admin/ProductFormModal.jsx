import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Trash2 } from "lucide-react";
import { fetchCategories, createProduct, updateProduct } from "../../services/api";

const emptyForm = {
  name: "",
  categoryId: "",
  status: "PUBLISHED",
  shortDescription: "",
  description: "",
  priceOnRequest: true,
  features: [""],
  specifications: [{ key: "", value: "" }],
};

function toFormState(product) {
  if (!product) return emptyForm;
  const specEntries = product.specifications
    ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
    : [{ key: "", value: "" }];
  return {
    name: product.name || "",
    categoryId: product.categoryId || product.category?.id || "",
    status: product.status || "PUBLISHED",
    shortDescription: product.shortDescription || "",
    description: product.description || "",
    priceOnRequest: product.priceOnRequest ?? true,
    features: product.features?.length ? product.features : [""],
    specifications: specEntries.length ? specEntries : [{ key: "", value: "" }],
  };
}

export default function ProductFormModal({ product, onClose, onSaved }) {
  const isEdit = Boolean(product);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(() => toFormState(product));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data.data));
  }, []);

  useEffect(() => {
    setForm(toFormState(product));
  }, [product]);

  const updateFeature = (i, value) =>
    setForm((f) => ({ ...f, features: f.features.map((v, idx) => (idx === i ? value : v)) }));
  const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, ""] }));
  const removeFeature = (i) => setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));

  const updateSpec = (i, key, value) =>
    setForm((f) => ({
      ...f,
      specifications: f.specifications.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)),
    }));
  const addSpec = () => setForm((f) => ({ ...f, specifications: [...f.specifications, { key: "", value: "" }] }));
  const removeSpec = (i) =>
    setForm((f) => ({ ...f, specifications: f.specifications.filter((_, idx) => idx !== i) }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      categoryId: form.categoryId || undefined,
      status: form.status,
      shortDescription: form.shortDescription.trim() || undefined,
      description: form.description.trim() || undefined,
      priceOnRequest: form.priceOnRequest,
      features: form.features.map((v) => v.trim()).filter(Boolean),
      specifications: Object.fromEntries(
        form.specifications
          .map((s) => [s.key.trim(), s.value.trim()])
          .filter(([k, v]) => k && v)
      ),
    };

    try {
      if (isEdit) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't save this product. Please try again.");
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
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-ink/50 backdrop-blur-sm p-4 py-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-3xl bg-surface p-6 sm:p-7 shadow-lift"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-fg">
              {isEdit ? "Edit product" : "New product"}
            </h2>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <label className="block">
              <span className="text-xs font-semibold text-fg">Name</span>
              <input
                className="input mt-1.5"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Dual-Screen POS"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-semibold text-fg">Category</span>
                <select
                  className="input mt-1.5"
                  value={form.categoryId}
                  onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                >
                  <option value="">None</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-fg">Status</span>
                <select
                  className="input mt-1.5"
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold text-fg">Short description</span>
              <input
                className="input mt-1.5"
                value={form.shortDescription}
                onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
                placeholder="One line shown on the products list"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-fg">Description</span>
              <textarea
                rows={3}
                className="input mt-1.5 resize-none"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Full description shown on the product page"
              />
            </label>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-fg">Features</span>
                <button type="button" onClick={addFeature} className="text-xs font-semibold text-accent-dark">
                  + Add
                </button>
              </div>
              <div className="mt-1.5 space-y-2">
                {form.features.map((val, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      className="input"
                      value={val}
                      onChange={(e) => updateFeature(i, e.target.value)}
                      placeholder="e.g. Cashier display"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-red-600"
                      aria-label="Remove feature"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-fg">Specifications</span>
                <button type="button" onClick={addSpec} className="text-xs font-semibold text-accent-dark">
                  + Add
                </button>
              </div>
              <div className="mt-1.5 space-y-2">
                {form.specifications.map((row, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      className="input"
                      value={row.key}
                      onChange={(e) => updateSpec(i, "key", e.target.value)}
                      placeholder="Label, e.g. Display"
                    />
                    <input
                      className="input"
                      value={row.value}
                      onChange={(e) => updateSpec(i, "value", e.target.value)}
                      placeholder="Value, e.g. Dual Screen"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpec(i)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-red-600"
                      aria-label="Remove specification"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.priceOnRequest}
                onChange={(e) => setForm((f) => ({ ...f, priceOnRequest: e.target.checked }))}
                className="h-4 w-4 rounded border-line"
              />
              <span className="text-sm text-fg">Price on request</span>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving…" : isEdit ? "Save changes" : (
                  <>
                    <Plus className="h-4 w-4" /> Create product
                  </>
                )}
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
