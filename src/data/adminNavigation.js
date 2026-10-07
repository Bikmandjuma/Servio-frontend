import {
  LayoutDashboard,
  Inbox,
  FileText,
  CalendarClock,
  MessageCircle,
  MonitorSmartphone,
  Layers3,
  Store,
  Quote,
  Newspaper,
  Settings,
} from "lucide-react";

// 11 destinations on purpose: this is what exercises the "6+ links → first 4
// + More" rule from the responsive navigation spec, on the same component
// used for the public site.
export const adminNavigationItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Contacts", path: "/admin/contacts", icon: Inbox },
  { label: "Quotes", path: "/admin/quotes", icon: FileText },
  { label: "Demos", path: "/admin/demo-requests", icon: CalendarClock },
  { label: "Live Chat", path: "/admin/live-chat", icon: MessageCircle },
  { label: "Products", path: "/admin/products", icon: MonitorSmartphone },
  { label: "Categories", path: "/admin/categories", icon: Layers3 },
  { label: "Industries", path: "/admin/industries", icon: Store },
  { label: "Testimonials", path: "/admin/testimonials", icon: Quote },
  { label: "Blog", path: "/admin/blog", icon: Newspaper },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];
