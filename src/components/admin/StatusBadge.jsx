const styles = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  CONTACTED: "bg-violet-50 text-violet-700 border-violet-200",
  CLOSED: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const labels = {
  NEW: "New",
  IN_PROGRESS: "In progress",
  CONTACTED: "Contacted",
  CLOSED: "Closed",
};

export default function StatusBadge({ status, onChange }) {
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-full border px-3 py-1 text-xs font-semibold outline-none ${styles[status] || styles.NEW}`}
    >
      {Object.keys(labels).map((s) => (
        <option key={s} value={s}>
          {labels[s]}
        </option>
      ))}
    </select>
  );
}
