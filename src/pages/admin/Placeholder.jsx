export default function AdminPlaceholder({ title }) {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-fg">{title}</h1>
      <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface p-10 text-center text-muted">
        This section is wired to the API. Extend this page the same way as
        Contacts/Quotes when you're ready to manage {title.toLowerCase()} here.
      </div>
    </div>
  );
}
