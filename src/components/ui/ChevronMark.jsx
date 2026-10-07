/**
 * The recurring visual motif of the site: the three chevrons from the Servio
 * mark, reused as a small glyph for active nav states, section markers, and
 * link hovers, instead of a generic arrow or numbered badge.
 */
export default function ChevronMark({ className = "", strokeWidth = 2.4 }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 8 L16 16 L6 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity="1" />
      <path d="M13 8 L23 16 L13 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
      <path d="M20 8 L30 16 L20 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
    </svg>
  );
}
