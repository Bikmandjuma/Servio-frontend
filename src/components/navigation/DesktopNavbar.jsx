import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import logoMarkDark from "../../assets/logo-mark-dark.png";
import logoMarkWhite from "../../assets/logo-mark-white.png";
import { navigationItems } from "../../data/navigation";
import { business } from "../../data/business";
import ChevronMark from "../ui/ChevronMark";
import ThemeToggle from "../ThemeToggle";
import UserMenu from "./UserMenu";
import { useTheme } from "../../theme/ThemeProvider";

export default function DesktopNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const logoMark = theme === "dark" ? logoMarkWhite : logoMarkDark;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 hidden lg:block transition-all duration-300 ${
        scrolled ? "bg-paper/90 backdrop-blur-md shadow-[0_1px_0_0_theme(colors.line)]" : "bg-transparent"
      }`}
    >
      <div className="container-content flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logoMark} alt="Servio" className="h-9 w-9 rounded-lg" />
          <span className="font-display text-lg font-bold tracking-tight text-fg">
            Servio
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 xl:gap-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group relative px-2.5 xl:px-3.5 py-2 text-[0.875rem] xl:text-[0.925rem] font-medium rounded-full whitespace-nowrap transition-colors ${
                  isActive ? "text-fg" : "text-muted hover:text-fg"
                }`
              }
            >
              {({ isActive }) => (
                <span className="inline-flex items-center gap-1.5">
                  {item.label}
                  <ChevronMark
                    className={`h-3 w-3 -mr-1 transition-opacity ${
                      isActive ? "opacity-100 text-accent" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${business.phone}`}
            className="hidden 2xl:flex items-center gap-2 text-sm text-muted hover:text-fg transition-colors"
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
          <ThemeToggle />
          <UserMenu />
          <Link
            to="/quote"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-lift"
          >
            Get Started
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
