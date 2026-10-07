import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PaginatedTable from "../../components/ui/PaginatedTable";
import ProductFormModal from "../../components/admin/ProductFormModal";
import { fetchProducts, deleteProduct } from "../../services/api";

export default function AdminProducts() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(null); // null | { product: null|object }

  const load = (p = page) => {
    setLoading(true);
    // status=ALL: this is the admin view, so drafts should show up too, not
    // just what's currently published on the live site.
    fetchProducts({ page: p, limit: 10, status: "ALL" })
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

  const onDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    await deleteProduct(product.id);
    load(page);
  };

  const onSaved = () => {
    setModalState(null);
    load(page);
  };

  const columns = [
    { key: "name", label: "Product" },
    { key: "category", label: "Category", render: (r) => r.category?.name || "—" },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            r.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-paper text-muted"
          }`}
        >
          {r.status === "PUBLISHED" ? "Published" : "Draft"}
        </span>
      ),
    },
    { key: "createdAt", label: "Added", render: (r) => new Date(r.createdAt).toLocaleDateString() },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setModalState({ product: r })}
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
          <h1 className="font-display text-2xl font-bold text-fg">Products</h1>
          <p className="mt-1 text-sm text-muted">Manage what's on the Products page.</p>
        </div>
        <button
          onClick={() => setModalState({ product: null })}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" /> New product
        </button>
      </div>

      <div className="mt-6">
        <PaginatedTable
          columns={columns}
          rows={rows}
          meta={meta}
          loading={loading}
          onPageChange={setPage}
          emptyLabel='No products yet — click "New product" to add your first one.'
        />
      </div>

      {modalState && (
        <ProductFormModal
          product={modalState.product}
          onClose={() => setModalState(null)}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}
