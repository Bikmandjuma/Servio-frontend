import { useEffect, useState } from "react";
import PaginatedTable from "../../components/ui/PaginatedTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { fetchAdminContacts, updateContactStatus } from "../../services/api";

const columns = (onStatusChange) => [
  { key: "fullName", label: "Name" },
  { key: "companyName", label: "Company", render: (r) => r.companyName || "—" },
  { key: "phone", label: "Phone" },
  { key: "businessType", label: "Type", render: (r) => (r.businessType === "OTHER" && r.businessTypeOther ? r.businessTypeOther : r.businessType) },
  {
    key: "status",
    label: "Status",
    render: (r) => <StatusBadge status={r.status} onChange={(s) => onStatusChange(r.id, s)} />,
  },
  { key: "createdAt", label: "Received", render: (r) => new Date(r.createdAt).toLocaleDateString() },
];

export default function AdminContacts() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = (p = page) => {
    setLoading(true);
    fetchAdminContacts({ page: p, limit: 10 })
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

  const onStatusChange = async (id, status) => {
    await updateContactStatus(id, status);
    load(page);
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-fg">Contact Requests</h1>
      <p className="mt-1 text-sm text-muted">Everyone who has reached out through the website.</p>

      <div className="mt-6">
        <PaginatedTable
          columns={columns(onStatusChange)}
          rows={rows}
          meta={meta}
          loading={loading}
          onPageChange={setPage}
          emptyLabel="No contact requests yet."
        />
      </div>
    </div>
  );
}
