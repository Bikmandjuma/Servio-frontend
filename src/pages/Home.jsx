import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MonitorSmartphone,
  Cpu,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Utensils,
  Coffee,
  Hotel,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import HeroCarousel from "../components/home/HeroCarousel";
import ChevronMark from "../components/ui/ChevronMark";

const trustPoints = [
  { title: "Smart POS", desc: "Modern point-of-sale solutions.", icon: MonitorSmartphone },
  { title: "Business Hardware", desc: "Reliable hardware for daily operations.", icon: Cpu },
  { title: "Custom Technology", desc: "Solutions adapted to your business.", icon: Settings2 },
  { title: "Local Support", desc: "Support when your business needs it.", icon: ShieldCheck },
];

const whatWeDo = [
  {
    title: "POS Solutions",
    icon: MonitorSmartphone,
    desc: "Modern POS systems designed to simplify sales, inventory and everyday business operations.",
    to: "/solutions",
    cta: "Explore POS",
  },
  {
    title: "Business Hardware",
    icon: Cpu,
    desc: "Professional hardware solutions for shops, supermarkets, restaurants and growing businesses.",
    to: "/products",
    cta: "Explore Hardware",
  },
  {
    title: "Custom Solutions",
    icon: Settings2,
    desc: "Technology customized around your specific business requirements.",
    to: "/solutions",
    cta: "Build Your Solution",
  },
];

const industries = [
  { name: "Retail", icon: ShoppingBag },
  { name: "Supermarkets", icon: ShoppingCart },
  { name: "Restaurants", icon: Utensils },
  { name: "Cafés", icon: Coffee },
  { name: "Hospitality", icon: Hotel },
  { name: "Growing Businesses", icon: TrendingUp },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="container-content grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center pt-14 pb-20 lg:pt-24 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-display font-bold tracking-tight text-fg text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
              Business technology that moves at your speed.
            </h1>
            <p className="mt-5 chevrons text-lg font-semibold text-accent-dark">
              <ChevronMark className="h-4 w-4 mr-2" /> fast. easy. reliable.
            </p>
            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-muted">
              From smart POS systems to customized business technology, Servio helps businesses
              simplify operations, serve customers faster, and stay in control.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to="/solutions" variant="primary">
                Explore Solutions <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button to="/contact" variant="ghost">
                Talk to Servio
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative mt-8"
          >
            <HeroCarousel />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 left-6 hidden sm:flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 shadow-lift"
            >
              <ChevronMark className="h-4 w-4 text-accent-dark" />
              <span className="text-xs font-semibold text-fg">fast. easy. reliable.</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-5 top-[38%] hidden sm:flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 shadow-lift"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-fg">Inventory synced</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 shadow-lift"
            >
              <ShieldCheck className="h-4 w-4 text-accent-dark" />
              <span className="text-xs font-semibold text-fg">Payments secured</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-line bg-surface">
        <div className="container-content py-14">
          <p className="max-w-xl text-lg font-medium text-fg">
            Technology designed around the way your business works.
          </p>
          <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t) => (
              <div key={t.title} className="flex gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper text-fg">
                  <t.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-fg">{t.title}</p>
                  <p className="mt-1 text-sm text-muted">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 lg:py-28">
        <div className="container-content">
          <SectionHeading title="Everything your business needs to operate smarter." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {whatWeDo.map((item) => (
              <Card key={item.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-fg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
                <Link
                  to={item.to}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fg group"
                >
                  {item.cta}
                  <ChevronMark className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIO APP TEASER */}
      <section className="bg-ink py-20 lg:py-28 text-white">
        <div className="container-content grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading
              title="Your business. One smart system."
              description="The Servio App brings sales, inventory, reporting and support into a single place your team already knows how to use."
              className="[&_h2]:text-white [&_p]:text-white/60"
            />
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              {[
                ["Sales", "Track transactions easily."],
                ["Inventory", "Know what's available."],
                ["Reports", "Understand performance."],
                ["Management", "Stay organized."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{t}</p>
                  <p className="mt-1 text-xs text-white/50">{d}</p>
                </div>
              ))}
            </div>
            <Button to="/servio-app" variant="accent" className="mt-8">
              See the Servio App <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mx-auto w-full max-w-[280px] rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-3 shadow-lift">
            {/* Pinned to fixed light colors on purpose: this mockup represents
                a phone screen and should look the same regardless of the
                site's own light/dark setting. */}
            <div className="rounded-[2rem] bg-[#F5F6F8] p-5 text-[#12141C]">
              <p className="text-sm">Good morning 👋</p>
              <p className="mt-3 text-xs text-[#5B6472]">Today's Sales</p>
              <p className="font-display text-2xl font-bold">RWF 1,280,500</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-3 shadow-card">
                  <p className="text-[11px] text-[#5B6472]">Orders</p>
                  <p className="font-semibold">148</p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-card">
                  <p className="text-[11px] text-[#5B6472]">Products</p>
                  <p className="font-semibold">1,284</p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-card col-span-2">
                  <p className="text-[11px] text-[#5B6472]">Low Stock</p>
                  <p className="font-semibold text-accent-dark">12 items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES STRIP */}
      <section className="py-20 lg:py-24">
        <div className="container-content">
          <SectionHeading title="Built for the businesses that keep Rwanda moving." />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind) => (
              <Link
                key={ind.name}
                to="/industries"
                className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-6 text-center transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <ind.icon className="h-6 w-6 text-fg" />
                <span className="text-sm font-medium text-fg">{ind.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAST / EASY / RELIABLE */}
      <section className="py-20 lg:py-28 bg-surface border-y border-line">
        <div className="container-content grid gap-12 lg:grid-cols-3">
          {[
            ["FAST.", "Move faster. Serve customers faster. Make decisions faster.", "Better operations"],
            ["EASY.", "Simple technology your team can understand and use.", "Better experience"],
            ["RELIABLE.", "Dependable technology and support designed for everyday business.", "Better business"],
          ].map(([word, copy, result]) => (
            <div key={word}>
              <p className="font-display text-4xl font-extrabold tracking-tight text-fg">{word}</p>
              <p className="mt-4 text-muted leading-relaxed">{copy}</p>
              <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark">
                <ChevronMark className="h-3.5 w-3.5" /> {result}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 lg:py-28">
        <div className="container-content">
          <div className="rounded-3xl bg-ink px-8 py-16 text-center lg:px-20">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto leading-tight">
              Ready to make business easier?
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">
              Tell us what your business needs. We'll help you find the right technology.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button to="/contact" variant="accent">
                Talk to Servio <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button to="/quote" variant="ghost" className="border-white/20 text-white hover:border-white">
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
