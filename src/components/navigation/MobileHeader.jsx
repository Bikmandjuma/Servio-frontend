import { Link } from "react-router-dom";
import logoMarkDark from "../../assets/logo-mark-dark.png";
import logoMarkWhite from "../../assets/logo-mark-white.png";
import { useTheme } from "../../theme/ThemeProvider";
import ThemeToggle from "../ThemeToggle";

export default function MobileHeader({ label = "Servio", homePath = "/", right = null }) {
  const { theme } = useTheme();
  // Light background → the dark badge (navy square, white lines) reads best.
  // Dark background → flip to the white badge (white square, lines read as
  // dark against it) so the mark never gets lost against its own header.
  const logoMark = theme === "dark" ? logoMarkWhite : logoMarkDark;

  return (
    <header className="sticky top-0 z-40 lg:hidden bg-paper/90 backdrop-blur-md border-b border-line">
      <div
        className="flex h-16 items-center justify-between px-5"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <Link to={homePath} className="flex items-center gap-2">
          <img src={logoMark} alt="Servio" className="h-8 w-8 rounded-lg" />
          <span className="font-display text-base font-bold tracking-tight text-fg">{label}</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle className="h-9 w-9" />
          {right || (
            <a
              href="tel:0795020004"
              className="text-xs font-semibold text-muted rounded-full border border-line px-3 py-1.5"
            >
              Call us
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
