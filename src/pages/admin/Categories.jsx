import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PaginatedTable from "../../components/ui/PaginatedTable";
import CategoryFormModal from "../../components/admin/CategoryFormModal";
import { fetchCategories, deleteCategory } from "../../services/api";

export default function AdminCategories() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(null); // null | { category: null|object }
  const [deleteError, setDeleteError] = useState("");

  const load = () => {
    setLoading(true);
    fetchCategories()
      .then((res) => setRows(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onDelete = async (category) => {
    if (!window.confirm(`Delete "${category.name}"?`)) return;
    setDeleteError("");
    try {
      await deleteCategory(category.id);
      load();
    } catch (err) {
      setDeleteError(err.response?.data?.error || "Couldn't delete this category.");
    }
  };

  const onSaved = () => {
    setModalState(null);
    load();
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "slug", label: "Slug" },
    { key: "order", label: "Order" },
    { key: "createdAt", label: "Added", render: (r) => new Date(r.createdAt).toLocaleDateString() },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setModalState({ category: r })}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-fg"
            aria-label={`Edit ${r.name}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(r)}
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
          <h1 className="font-display text-2xl font-bold text-fg">Product Categories</h1>
          <p className="mt-1 text-sm text-muted">Groupings used on the Products page.</p>
        </div>
        <button
          onClick={() => setModalState({ category: null })}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" /> New category
        </button>
      </div>

      {deleteError && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{deleteError}</p>
      )}

      <div className="mt-6">
        <PaginatedTable
          columns={columns}
          rows={rows}
          meta={null}
          loading={loading}
          onPageChange={() => {}}
          emptyLabel='No categories yet — click "New category" to add one.'
        />
      </div>

      {modalState && (
        <CategoryFormModal
          category={modalState.category}
          onClose={() => setModalState(null)}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}
