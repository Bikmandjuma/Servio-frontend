import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createBlogPost, updateBlogPost } from "../../services/api";

export default function BlogFormModal({ post, onClose, onSaved }) {
  const isEdit = Boolean(post);
  const [form, setForm] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    body: post?.body || "",
    published: post?.published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || undefined,
        body: form.body.trim() || undefined,
        published: form.published,
      };
      if (isEdit) await updateBlogPost(post.id, payload);
      else await createBlogPost(payload);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't save this post.");
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
              {isEdit ? "Edit post" : "New post"}
            </h2>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <label className="block">
              <span className="text-xs font-semibold text-fg">Title</span>
              <input
                className="input mt-1.5"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. 5 signs your shop has outgrown its cash register"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-fg">Excerpt</span>
              <input
                className="input mt-1.5"
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="One line shown in the posts list"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-fg">Body</span>
              <textarea
                rows={6}
                className="input mt-1.5 resize-none"
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                placeholder="Full post content"
              />
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="h-4 w-4 rounded border-line"
              />
              <span className="text-sm text-fg">Published</span>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving…" : isEdit ? "Save changes" : "Create post"}
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
