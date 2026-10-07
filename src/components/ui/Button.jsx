import { Link } from "react-router-dom";

const variants = {
  primary: "bg-ink text-white hover:-translate-y-0.5 hover:shadow-lift shadow-card",
  accent: "bg-accent text-fg hover:-translate-y-0.5 hover:shadow-lift shadow-card",
  ghost: "bg-transparent text-fg border border-line hover:border-ink",
  subtle: "bg-surface text-fg border border-line hover:border-ink",
};

export default function Button({
  as = "link",
  to = "#",
  href,
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${variants[variant]} ${className}`;

  if (as === "a") {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  if (as === "button") {
    return (
      <button type={type} className={classes} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Link to={to} className={classes} {...rest}>
      {children}
    </Link>
  );
}
