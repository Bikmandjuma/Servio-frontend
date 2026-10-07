import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PaginatedTable from "../../components/ui/PaginatedTable";
import BlogFormModal from "../../components/admin/BlogFormModal";
import { fetchBlogPosts, deleteBlogPost } from "../../services/api";

export default function AdminBlog() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(null); // null | { post: null|object }

  const load = (p = page) => {
    setLoading(true);
    fetchBlogPosts({ page: p, limit: 10, all: "true" })
      .then((res) => {
        setRows(res.data.data);
        setMeta(res.data.meta);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deleteBlogPost(id);
    load(page);
  };

  const onSaved = () => {
    setModalState(null);
    load(page);
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    {
      key: "published",
      label: "Status",
      render: (r) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            r.published ? "bg-emerald-50 text-emerald-700" : "bg-paper text-muted"
          }`}
        >
          {r.published ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "publishedAt",
      label: "Published",
      render: (r) => (r.publishedAt ? new Date(r.publishedAt).toLocaleDateString() : "—"),
    },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setModalState({ post: r })}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-fg"
            aria-label={`Edit ${r.title}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(r.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-red-600"
            aria-label={`Delete ${r.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-fg">Blog</h1>
          <p className="mt-1 text-sm text-muted">Posts published on the Servio blog.</p>
        </div>
        <button
          onClick={() => setModalState({ post: null })}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      <div className="mt-6">
        <PaginatedTable
          columns={columns}
          rows={rows}
          meta={meta}
          loading={loading}
          onPageChange={setPage}
          emptyLabel='No posts yet — click "New post" to add one.'
        />
      </div>

      {modalState && (
        <BlogFormModal post={modalState.post} onClose={() => setModalState(null)} onSaved={onSaved} />
      )}
    </div>
  );
}
