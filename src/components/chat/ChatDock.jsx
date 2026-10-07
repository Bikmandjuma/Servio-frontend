import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Headset } from "lucide-react";
import { whatsappLink } from "../../data/business";
import ChatWidget from "./ChatWidget";

/**
 * Collapsed: just the round chat-bubble icon, bottom-right.
 * Tap it → two more icons spring up above it: WhatsApp (middle) and Live
 * Chat (top, "the icon above WhatsApp").
 *   - Tap WhatsApp  → opens WhatsApp in a new tab/app and collapses the stack.
 *   - Tap Live Chat → collapses the stack and opens the in-page chat panel.
 * Tap the main bubble again to collapse the stack without picking either.
 */
export default function ChatDock() {
  const [stackOpen, setStackOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const openWhatsApp = () => {
    window.open(whatsappLink(), "_blank", "noopener,noreferrer");
    setStackOpen(false);
  };

  const openLiveChat = () => {
    setStackOpen(false);
    setPanelOpen(true);
  };

  return (
    <>
      <AnimatePresence>{panelOpen && <ChatWidget onClose={() => setPanelOpen(false)} />}</AnimatePresence>

      {!panelOpen && (
        <div className="fixed z-40 right-5 bottom-[calc(84px+env(safe-area-inset-bottom,0px))] lg:bottom-6 flex flex-col items-center gap-3">
          <AnimatePresence>
            {stackOpen && (
              <>
                <motion.button
                  key="livechat"
                  type="button"
                  onClick={openLiveChat}
                  initial={{ opacity: 0, y: 12, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22, delay: 0.05 }}
                  aria-label="Open live chat"
                  title="Chat with Servio"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-lift"
                >
                  <Headset className="h-5 w-5" />
                </motion.button>

                <motion.button
                  key="whatsapp"
                  type="button"
                  onClick={openWhatsApp}
                  initial={{ opacity: 0, y: 12, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  aria-label="Chat on WhatsApp"
                  title="Chat on WhatsApp"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.014 2C6.478 2 1.99 6.488 1.99 12.024c0 1.892.524 3.660 1.436 5.170L2 22l4.933-1.394a10.02 10.02 0 0 0 5.081 1.395h.004c5.536 0 10.024-4.489 10.024-10.025C22.042 6.488 17.55 2 12.014 2zm0 18.187h-.003a8.15 8.15 0 0 1-4.157-1.14l-.298-.177-3.093.874.826-3.017-.194-.31a8.147 8.147 0 0 1-1.257-4.393c0-4.508 3.669-8.176 8.18-8.176 2.185 0 4.24.852 5.785 2.398a8.128 8.128 0 0 1 2.393 5.785c0 4.508-3.669 8.176-8.18 8.176z" />
                  </svg>
                </motion.button>
              </>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => setStackOpen((o) => !o)}
            whileTap={{ scale: 0.92 }}
            aria-label={stackOpen ? "Close chat options" : "Open chat options"}
            aria-expanded={stackOpen}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-lift"
          >
            <motion.span
              initial={false}
              animate={{ rotate: stackOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {stackOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.span>
          </motion.button>
        </div>
      )}
    </>
  );
}
