import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PaginatedTable from "../../components/ui/PaginatedTable";
import IndustryFormModal from "../../components/admin/IndustryFormModal";
import { fetchIndustries, deleteIndustry } from "../../services/api";

export default function AdminIndustries() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(null); // null | { industry: null|object }

  const load = (p = page) => {
    setLoading(true);
    fetchIndustries({ page: p, limit: 20 })
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
    if (!window.confirm("Remove this industry from the Industries page?")) return;
    await deleteIndustry(id);
    load(page);
  };

  const onSaved = () => {
    setModalState(null);
    load(page);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "summary", label: "Summary", render: (r) => r.summary || "—" },
    { key: "order", label: "Order" },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setModalState({ industry: r })}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-fg"
            aria-label={`Edit ${r.name}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(r.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-red-600"
            aria-label={`Delete ${r.name}`}
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
          <h1 className="font-display text-2xl font-bold text-fg">Industries</h1>
          <p className="mt-1 text-sm text-muted">Shown on the Industries page and the homepage strip.</p>
        </div>
        <button
          onClick={() => setModalState({ industry: null })}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" /> New industry
        </button>
      </div>

      <div className="mt-6">
        <PaginatedTable
          columns={columns}
          rows={rows}
          meta={meta}
          loading={loading}
          onPageChange={setPage}
          emptyLabel='No industries yet — click "New industry" to add one.'
        />
      </div>

      {modalState && (
        <IndustryFormModal
          industry={modalState.industry}
          onClose={() => setModalState(null)}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}
