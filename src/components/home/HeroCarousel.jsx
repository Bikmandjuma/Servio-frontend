import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckoutScene, InventoryScene, SupportScene } from "./HeroScenes";

const slides = [
  { photo: "/hero/checkout.jpg", Scene: CheckoutScene, caption: "Fast checkout, every time." },
  { photo: "/hero/inventory.jpg", Scene: InventoryScene, caption: "Know what's on your shelves." },
  { photo: "/hero/support.jpg", Scene: SupportScene, caption: "Hardware, set up and supported." },
];

/** Shows the real photo at `photo` the moment one exists at that path;
 * until then (or if it 404s), falls back to the illustrated Scene so the
 * hero never looks broken either way. Drop real files into
 * frontend/public/hero/ (see the README there) — no code changes needed. */
function SlideMedia({ photo, Scene }) {
  const [photoFailed, setPhotoFailed] = useState(false);

  if (photoFailed) return <Scene />;

  return (
    <>
      <Scene />
      <img
        src={photo}
        alt=""
        onError={() => setPhotoFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </>
  );
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const { Scene, caption, photo } = slides[index];

  return (
    <div
      className="relative rounded-3xl shadow-lift overflow-hidden aspect-[4/3]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <SlideMedia photo={photo} Scene={Scene} />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent px-6 pb-5 pt-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={caption}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-semibold text-white"
          >
            {caption}
          </motion.p>
        </AnimatePresence>

        <div className="mt-3 flex items-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.caption}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
