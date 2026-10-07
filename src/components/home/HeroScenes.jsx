// Flat, geometric illustrations for the hero carousel — vector avatars, not
// photography, so there's no stock-photo/likeness question, and they match
// the rest of the site's flat design language. Built from concentric circles
// only (no freehand paths) with a thin outline on every shape, which is what
// keeps them legible regardless of exact fill-vs-background contrast. People
// are shown in simple Sudanese-style dress: a taqiyah cap for the
// shopkeeper, a tarha headscarf for the customer.

const palette = {
  skin: "#C08A5C",
  capCloth: "#F5EFE6",
  robe: "#DCE3E8",
  scarf: "#C9922A",
  outline: "#10141F",
};

const STROKE = { stroke: palette.outline, strokeOpacity: 0.14, strokeWidth: 2.5 };

/** A simple head-and-shoulders avatar built from two overlapping circles —
 * deliberately basic, since that's what stays legible at small sizes. */
function Avatar({ cx, cy, headwear = "cap", r = 95 }) {
  const headR = r * 0.42;
  const headCy = cy - r * 0.42;

  return (
    <g>
      <circle cx={cx} cy={cy + r * 0.5} r={r} fill={headwear === "scarf" ? palette.scarf : palette.robe} {...STROKE} />

      {headwear === "scarf" && (
        <circle cx={cx} cy={headCy} r={headR * 1.4} fill="#DFAE4A" {...STROKE} />
      )}

      <circle cx={cx} cy={headCy} r={headR} fill={palette.skin} {...STROKE} />

      {headwear === "cap" && (
        <ellipse cx={cx} cy={headCy - headR * 1.05} rx={headR * 0.85} ry={headR * 0.34} fill={palette.capCloth} {...STROKE} />
      )}
    </g>
  );
}

function Backdrop({ tint }) {
  return (
    <>
      <rect width="480" height="360" fill={tint} />
      <circle cx="440" cy="40" r="120" fill="#000" opacity="0.03" />
      <circle cx="20" cy="340" r="140" fill="#000" opacity="0.03" />
    </>
  );
}

function IconBadge({ x, y, children }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-24" y="-24" width="48" height="48" rx="15" fill="#fff" />
      {children}
    </g>
  );
}

export function CheckoutScene() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full">
      <Backdrop tint="#F2ECE1" />
      <Avatar cx={155} cy={175} headwear="cap" r={80} />
      <Avatar cx={345} cy={185} headwear="scarf" r={72} />
      <IconBadge x={250} y={120}>
        <rect x="-12" y="-14" width="24" height="28" rx="3" fill="none" stroke={palette.outline} strokeWidth="2.5" />
        <line x1="-6" y1="-6" x2="6" y2="-6" stroke={palette.outline} strokeWidth="2.5" />
        <line x1="-6" y1="1" x2="6" y2="1" stroke={palette.outline} strokeWidth="2.5" />
        <line x1="-6" y1="8" x2="2" y2="8" stroke={palette.outline} strokeWidth="2.5" />
      </IconBadge>
    </svg>
  );
}

export function InventoryScene() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full">
      <Backdrop tint="#EFEAE1" />
      <Avatar cx={250} cy={195} headwear="cap" r={98} />
      <IconBadge x={375} y={100}>
        <rect x="-13" y="-11" width="12" height="22" rx="2" fill={palette.scarf} />
        <rect x="1" y="-14" width="12" height="25" rx="2" fill="#E5A93D" />
      </IconBadge>
      <IconBadge x={100} y={140}>
        <path d="M-9 1 L-2 8 L10 -7" fill="none" stroke="#2E9E5B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </IconBadge>
    </svg>
  );
}

export function SupportScene() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full">
      <Backdrop tint="#F2ECE1" />
      <Avatar cx={205} cy={190} headwear="scarf" r={96} />
      <IconBadge x={355} y={120}>
        <circle cx="0" cy="0" r="11" fill="none" stroke={palette.outline} strokeWidth="2.5" />
        <line x1="8" y1="8" x2="14" y2="14" stroke={palette.outline} strokeWidth="3" strokeLinecap="round" />
      </IconBadge>
    </svg>
  );
}
