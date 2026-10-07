import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import PaginatedTable from "../../components/ui/PaginatedTable";
import TestimonialFormModal from "../../components/admin/TestimonialFormModal";
import { fetchTestimonials, deleteTestimonial } from "../../services/api";

export default function AdminTestimonials() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(null); // null | { testimonial: null|object }

  const load = (p = page) => {
    setLoading(true);
    fetchTestimonials({ page: p, limit: 10, all: "true" })
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
    if (!window.confirm("Delete this testimonial?")) return;
    await deleteTestimonial(id);
    load(page);
  };

  const onSaved = () => {
    setModalState(null);
    load(page);
  };

  const columns = [
    { key: "authorName", label: "Author" },
    { key: "company", label: "Company", render: (r) => r.company || "—" },
    { key: "quote", label: "Quote", render: (r) => <span className="line-clamp-2 max-w-xs block">{r.quote}</span> },
    {
      key: "rating",
      label: "Rating",
      render: (r) => (
        <span className="inline-flex items-center gap-0.5 text-accent-dark">
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </span>
      ),
    },
    {
      key: "published",
      label: "Published",
      render: (r) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            r.published ? "bg-emerald-50 text-emerald-700" : "bg-paper text-muted"
          }`}
        >
          {r.published ? "Live" : "Hidden"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setModalState({ testimonial: r })}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-fg"
            aria-label={`Edit testimonial from ${r.authorName}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(r.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-red-600"
            aria-label={`Delete testimonial from ${r.authorName}`}
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
          <h1 className="font-display text-2xl font-bold text-fg">Testimonials</h1>
          <p className="mt-1 text-sm text-muted">Customer quotes available to feature across the site.</p>
        </div>
        <button
          onClick={() => setModalState({ testimonial: null })}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" /> New testimonial
        </button>
      </div>

      <div className="mt-6">
        <PaginatedTable
          columns={columns}
          rows={rows}
          meta={meta}
          loading={loading}
          onPageChange={setPage}
          emptyLabel='No testimonials yet — click "New testimonial" to add one.'
        />
      </div>

      {modalState && (
        <TestimonialFormModal
          testimonial={modalState.testimonial}
          onClose={() => setModalState(null)}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}
