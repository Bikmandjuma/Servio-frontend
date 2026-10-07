import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ResponsiveNavigation from "../components/navigation/ResponsiveNavigation";
import Footer from "../components/Footer";
import ChatDock from "../components/chat/ChatDock";

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col pb-[68px] lg:pb-0">
      <ResponsiveNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatDock />
    </div>
  );
}
