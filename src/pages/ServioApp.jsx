import { ArrowUpRight, ShoppingCart, Boxes, BarChart3, LayoutGrid, Settings2 } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const features = [
  { title: "Sales", icon: ShoppingCart, desc: "Track transactions easily." },
  { title: "Inventory", icon: Boxes, desc: "Know what's available." },
  { title: "Reports", icon: BarChart3, desc: "Understand your business performance." },
  { title: "Management", icon: LayoutGrid, desc: "Keep important business information organized." },
  { title: "Customization", icon: Settings2, desc: "Configure the experience around business requirements." },
];

export default function ServioApp() {
  return (
    <div className="container-content py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <SectionHeading
            title="Your business. One smart system."
            description="Sales, inventory, reporting and support: the Servio App keeps your whole operation in one place, on any device."
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/request-demo" variant="primary">
              See it in action <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button to="/contact" variant="ghost">
              Talk to Servio
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[300px] rounded-[2.5rem] border border-line bg-ink p-3 shadow-lift">
          {/* Pinned to fixed light colors on purpose — see Home.jsx's teaser
              mockup for why. */}
          <div className="rounded-[2rem] bg-white p-6">
            <p className="text-sm text-[#12141C]">Good morning 👋</p>
            <p className="mt-4 text-xs text-[#5B6472]">Today's Sales</p>
            <p className="font-display text-2xl font-bold text-[#12141C]">RWF 1,280,500</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#F5F6F8] p-3">
                <p className="text-[11px] text-[#5B6472]">Orders</p>
                <p className="font-semibold text-[#12141C]">148</p>
              </div>
              <div className="rounded-xl bg-[#F5F6F8] p-3">
                <p className="text-[11px] text-[#5B6472]">Products</p>
                <p className="font-semibold text-[#12141C]">1,284</p>
              </div>
              <div className="rounded-xl bg-[#F5F6F8] p-3 col-span-2">
                <p className="text-[11px] text-[#5B6472]">Low Stock</p>
                <p className="font-semibold text-accent-dark">12 items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {features.map((f) => (
          <Card key={f.title} className="text-center">
            <f.icon className="h-6 w-6 mx-auto text-fg" />
            <p className="mt-4 font-semibold text-fg">{f.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
