import {
  ShoppingCart,
  Package,
  Boxes,
  Receipt,
  BarChart3,
  Users,
  UsersRound,
  LineChart,
  UtensilsCrossed,
  ClipboardList,
  ChefHat,
  Settings2,
  ArrowUpRight,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const posFeatures = [
  { label: "Sales management", icon: ShoppingCart },
  { label: "Product management", icon: Package },
  { label: "Inventory", icon: Boxes },
  { label: "Receipts", icon: Receipt },
  { label: "Reporting", icon: BarChart3 },
  { label: "Customer management", icon: Users },
  { label: "Multi-user access", icon: UsersRound },
  { label: "Business analytics", icon: LineChart },
];

const retailFor = ["Supermarkets", "Boutiques", "Electronics stores", "Pharmacies", "General shops", "Wholesalers"];

const restaurantFeatures = [
  { label: "Table management", icon: UtensilsCrossed },
  { label: "Order management", icon: ClipboardList },
  { label: "Kitchen workflow", icon: ChefHat },
  { label: "Receipts", icon: Receipt },
  { label: "Sales reporting", icon: BarChart3 },
];
const restaurantFor = ["Restaurants", "Cafés", "Bars", "Fast-food businesses", "Hotels"];

export default function Solutions() {
  return (
    <div>
      <div className="container-content pt-16 lg:pt-24">
        <SectionHeading
          title="Solutions built for real businesses."
          description="Technology shouldn't make business complicated. Servio helps you simplify it."
        />
      </div>

      {/* POS Systems */}
      <section className="container-content mt-16">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <h2 className="font-display text-2xl font-bold text-fg">POS Systems</h2>
            <p className="mt-3 text-muted leading-relaxed max-w-md">
              A complete point of sale, built around how your team actually works, from the
              counter to the back office.
            </p>
            <Button to="/products" variant="ghost" className="mt-6">
              See POS products
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {posFeatures.map((f) => (
              <div key={f.label} className="rounded-2xl border border-line bg-surface p-4 text-center">
                <f.icon className="h-5 w-5 mx-auto text-fg" />
                <p className="mt-2.5 text-xs font-medium text-muted">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retail */}
      <section className="container-content mt-20">
        <Card hover={false} className="lg:p-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-fg">Retail Solutions</h2>
              <p className="mt-3 text-muted leading-relaxed">
                POS and inventory built for the shape of retail: fast checkout, accurate stock,
                and reporting that tells you what's actually selling.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 content-start">
              {retailFor.map((r) => (
                <span key={r} className="rounded-full border border-line px-4 py-2 text-sm text-fg">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Restaurants */}
      <section className="container-content mt-8">
        <Card hover={false} className="lg:p-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-fg">Restaurant Solutions</h2>
              <p className="mt-3 text-muted leading-relaxed">
                From table to kitchen to receipt, Servio keeps orders moving and every sale
                accounted for.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {restaurantFor.map((r) => (
                  <span key={r} className="rounded-full border border-line px-4 py-2 text-sm text-fg">
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {restaurantFeatures.map((f) => (
                <div key={f.label} className="rounded-2xl bg-paper p-4 text-center">
                  <f.icon className="h-5 w-5 mx-auto text-fg" />
                  <p className="mt-2.5 text-xs font-medium text-muted">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Custom */}
      <section className="container-content my-20">
        <div className="rounded-3xl bg-ink px-8 py-14 lg:px-16 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white mb-5">
              <Settings2 className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Your business isn't standard. Your technology shouldn't be either.
            </h2>
            <p className="mt-3 text-white/60 max-w-lg">
              Servio can customize technology around your operational requirements, from a single
              counter to a multi-location setup.
            </p>
          </div>
          <Button to="/contact" variant="accent" className="whitespace-nowrap">
            Talk to our team <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
