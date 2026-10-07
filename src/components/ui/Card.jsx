export default function Card({ className = "", children, hover = true }) {
  return (
    <div
      className={`rounded-3xl border border-line bg-surface p-7 shadow-card transition-all duration-300 ${
        hover ? "hover:-translate-y-1 hover:shadow-lift hover:border-ink/10" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
