import { useIsDesktop } from "../../hooks/useMediaQuery";
import DesktopNavbar from "./DesktopNavbar";
import MobileHeader from "./MobileHeader";
import MobileBottomNav from "./MobileBottomNav";
import { navigationItems } from "../../data/navigation";

/**
 * Single entry point for navigation. Desktop (>=1024px) renders the full top
 * navbar. Tablet and phone render a slim header (logo only) plus a fixed
 * bottom navigation bar, exactly like a native mobile app, with items beyond
 * the first 4 folding into an animated "More" sheet.
 *
 * Pass a different `items` array to reuse this same component for an
 * authenticated user/admin panel with its own navigation set.
 */
export default function ResponsiveNavigation({ items = navigationItems }) {
  const isDesktop = useIsDesktop();

  if (isDesktop) return <DesktopNavbar />;

  return (
    <>
      <MobileHeader />
      <MobileBottomNav items={items} />
    </>
  );
}
