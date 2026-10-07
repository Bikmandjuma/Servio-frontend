import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";
import logoMark from "../assets/logo-mark-white.png";
import { business } from "../data/business";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Why Servio", to: "/why-servio" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "POS Solutions", to: "/solutions" },
      { label: "Industries", to: "/industries" },
      { label: "Custom Solutions", to: "/solutions" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "POS Systems", to: "/products" },
      { label: "Business Hardware", to: "/products" },
      { label: "Servio App", to: "/servio-app" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80 pb-28 lg:pb-0">
      <div className="container-content py-16 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logoMark} alt="Servio" className="h-9 w-9" />
            <span className="font-display text-lg font-bold text-white">Servio</span>
          </div>
          <p className="mt-3 text-sm text-white/50">{business.tagline}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Business technology made simpler: smart POS, hardware, and custom solutions for
            businesses across Rwanda.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-white">{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" /> {business.phoneDisplay}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" /> {business.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> {business.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Servio. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-white/70">Privacy Policy</Link>
            <Link to="/privacy" className="hover:text-white/70">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
