import { Lightbulb, ShieldCheck, Sparkles, Heart, ScrollText } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ArrowUpRight } from "lucide-react";

const values = [
  { title: "Innovation", icon: Lightbulb, desc: "We look for the simpler, faster way to solve a real business problem." },
  { title: "Reliability", icon: ShieldCheck, desc: "Technology and support your business can count on every day." },
  { title: "Simplicity", icon: Sparkles, desc: "If your team can't use it easily, we haven't finished building it." },
  { title: "Customer Success", icon: Heart, desc: "Your business doing better is how we measure our own success." },
  { title: "Integrity", icon: ScrollText, desc: "Straightforward pricing, honest advice, and follow-through." },
];

export default function About() {
  return (
    <div className="container-content py-16 lg:py-24">
      <SectionHeading
        title="Technology with a purpose."
        description="Servio is a technology and business-solutions company focused on helping businesses operate more efficiently through modern POS systems, hardware and customized technology solutions."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Card hover={false}>
          <h3 className="font-display text-xl font-bold text-fg">Our Mission</h3>
          <p className="mt-3 text-muted leading-relaxed">
            To make business technology faster, easier and more reliable.
          </p>
        </Card>
        <Card hover={false}>
          <h3 className="font-display text-xl font-bold text-fg">Our Vision</h3>
          <p className="mt-3 text-muted leading-relaxed">
            To become a trusted technology partner for businesses across Rwanda and beyond.
          </p>
        </Card>
      </div>

      <div className="mt-20">
        <h3 className="font-display text-2xl font-bold text-fg">Our Values</h3>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => (
            <Card key={v.title} className="text-center">
              <v.icon className="h-6 w-6 mx-auto text-fg" />
              <p className="mt-4 font-semibold text-fg">{v.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{v.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-20 rounded-3xl bg-ink px-8 py-14 text-center lg:px-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Want to know what Servio can build for your business?
        </h2>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Button to="/contact" variant="accent">
            Talk to Servio <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
