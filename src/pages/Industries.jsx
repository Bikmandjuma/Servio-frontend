import { ShoppingBag, ShoppingCart, Utensils, Coffee, Hotel, TrendingUp, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const industries = [
  { name: "Retail", icon: ShoppingBag, desc: "POS and inventory solutions." },
  { name: "Supermarkets", icon: ShoppingCart, desc: "High-volume transaction management." },
  { name: "Restaurants", icon: Utensils, desc: "Faster ordering and sales workflows." },
  { name: "Cafés", icon: Coffee, desc: "Simple and efficient POS operations." },
  { name: "Hospitality", icon: Hotel, desc: "Technology for customer-focused businesses." },
  { name: "Growing Businesses", icon: TrendingUp, desc: "Solutions that scale with your business." },
];

export default function Industries() {
  return (
    <div className="container-content py-16 lg:py-24">
      <SectionHeading title="Built for the businesses that keep Rwanda moving." />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind) => (
          <Card key={ind.name}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
              <ind.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold text-fg">{ind.name}</h3>
            <p className="mt-2 text-sm text-muted">{ind.desc}</p>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-ink px-8 py-14 text-center lg:px-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Don't see your business type? We build custom setups too.
        </h2>
        <Button to="/contact" variant="accent" className="mt-7">
          Talk to our team <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
