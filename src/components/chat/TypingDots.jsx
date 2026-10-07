import { motion } from "framer-motion";

export default function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-sm bg-paper px-3.5 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
