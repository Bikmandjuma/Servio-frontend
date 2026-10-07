import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Generic paginated table for the admin panel. Every list endpoint in the
 * API returns { data, meta: { total, page, limit, totalPages } }, so this
 * component drives any table (contacts, quotes, demo requests, products...)
 * the same way.
 */
export default function PaginatedTable({ columns, rows, meta, onPageChange, loading, emptyLabel = "Nothing here yet." }) {
  return (
    <div className="rounded-2xl border border-line bg-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-paper/60 text-left text-xs font-semibold uppercase tracking-wide text-muted">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-muted">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-muted">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={row.id || i} className="border-b border-line last:border-0 hover:bg-paper/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 align-top text-fg">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta && (
        <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 text-sm text-muted">
          <span>
            {meta.total} {meta.total === 1 ? "record" : "records"} · page {meta.page} of {meta.totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={meta.page <= 1}
              onClick={() => onPageChange(meta.page - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={meta.page >= meta.totalPages}
              onClick={() => onPageChange(meta.page + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
