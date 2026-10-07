import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import MoreBottomSheet from "./MoreBottomSheet";

/**
 * Renders up to 5 slots. If there are 5 or fewer nav items, all of them get a
 * slot and there's no "More" button. If there are more than 5, the first 4
 * get a slot and everything else folds into an animated "More" sheet. This
 * keeps the bar reusable across the public site and the (larger) user panel.
 */
export default function MobileBottomNav({ items }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();

  const needsMore = items.length > 5;
  const primaryItems = needsMore ? items.slice(0, 4) : items;
  const overflowItems = needsMore ? items.slice(4) : [];
  const overflowActive = overflowItems.some((i) => i.path === location.pathname);

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-paper/95 backdrop-blur-md border-t border-line shadow-[0_-8px_24px_-16px_rgba(16,20,31,0.25)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="grid h-[68px]" style={{ gridTemplateColumns: `repeat(${primaryItems.length + (needsMore ? 1 : 0)}, minmax(0,1fr))` }}>
          {primaryItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className="flex flex-col items-center justify-center gap-1"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex items-center justify-center h-7 w-7 rounded-full transition-transform duration-200 ${
                      isActive ? "-translate-y-0.5 text-accent-dark" : "text-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                  <span className={`text-[11px] leading-none ${isActive ? "font-semibold text-fg" : "text-muted"}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}

          {needsMore && (
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex flex-col items-center justify-center gap-1"
              aria-haspopup="true"
              aria-expanded={sheetOpen}
            >
              <span
                className={`flex items-center justify-center h-7 w-7 rounded-full transition-transform duration-200 ${
                  overflowActive || sheetOpen ? "-translate-y-0.5 text-accent-dark" : "text-muted"
                }`}
              >
                <MoreHorizontal className="h-5 w-5" strokeWidth={overflowActive ? 2.4 : 2} />
              </span>
              <span className={`text-[11px] leading-none ${overflowActive ? "font-semibold text-fg" : "text-muted"}`}>
                More
              </span>
            </button>
          )}
        </div>
      </nav>

      {needsMore && (
        <MoreBottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} items={overflowItems} />
      )}
    </>
  );
}
