export default function SectionHeading({ kicker, title, description, align = "left", className = "" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {kicker && <p className="text-sm font-semibold text-accent-dark mb-3">{kicker}</p>}
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-fg leading-[1.15]">
        {title}
      </h2>
      {description && <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
