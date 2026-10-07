import {
  Home,
  Building2,
  Layers3,
  MonitorSmartphone,
  Store,
  BadgeCheck,
  Phone,
} from "lucide-react";

// Single source of truth for the public site's navigation. The responsive
// navigation system decides at render time how many of these fit in the
// mobile bottom bar before folding the rest into "More".
export const navigationItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: Building2 },
  { label: "Solutions", path: "/solutions", icon: Layers3 },
  { label: "Products", path: "/products", icon: MonitorSmartphone },
  { label: "Industries", path: "/industries", icon: Store },
  { label: "Why Servio", path: "/why-servio", icon: BadgeCheck },
  { label: "Contact", path: "/contact", icon: Phone },
];
