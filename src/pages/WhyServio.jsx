import { ArrowUpRight } from "lucide-react";
import Button from "../components/ui/Button";
import ChevronMark from "../components/ui/ChevronMark";

const words = [
  {
    word: "FAST.",
    copy: "Move faster. Serve customers faster. Make decisions faster.",
    result: "Better operations",
  },
  {
    word: "EASY.",
    copy: "Simple technology your team can understand and use.",
    result: "Better experience",
  },
  {
    word: "RELIABLE.",
    copy: "Dependable technology and support designed for everyday business.",
    result: "Better business",
  },
];

export default function WhyServio() {
  return (
    <div className="container-content py-16 lg:py-24">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-fg leading-tight">
          Technology is only useful when it makes business easier.
        </h1>
      </div>

      <div className="mt-20 grid gap-14 lg:grid-cols-3">
        {words.map((w) => (
          <div key={w.word}>
            <p className="font-display text-5xl font-extrabold tracking-tight text-fg">{w.word}</p>
            <p className="mt-5 text-muted leading-relaxed">{w.copy}</p>
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent-dark">
              <ChevronMark className="h-3.5 w-3.5" /> {w.result}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-24 rounded-3xl bg-ink px-8 py-16 text-center lg:px-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto">
          Ready to feel the difference in your own business?
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button to="/request-demo" variant="accent">
            See Servio in action <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button to="/contact" variant="ghost" className="border-white/20 text-white hover:border-white">
            Talk to Servio
          </Button>
        </div>
      </div>
    </div>
  );
}
