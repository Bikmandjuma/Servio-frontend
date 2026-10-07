import { MessageCircle } from "lucide-react";
import { whatsappLink } from "../data/business";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-30 right-5 bottom-[calc(84px+env(safe-area-inset-bottom,0px))] lg:bottom-6 flex items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-5 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5"
      aria-label="Chat with Servio on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" fill="white" />
      Chat with Servio
    </a>
  );
}
