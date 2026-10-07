import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MonitorSmartphone, Loader2 } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { fetchProducts } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState(null); // null = still loading
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetchProducts({ limit: 20 })
      .then((res) => setProducts(res.data?.data || []))
      .catch(() => {
        setProducts([]);
        setLoadError(true);
      });
  }, []);

  return (
    <div className="container-content py-16 lg:py-24">
      <SectionHeading
        title="Technology you can see. Performance you can trust."
        description="Every Servio product is chosen and configured to work together: hardware, software and support included."
      />

      <div className="mt-14 space-y-6">
        {products === null ? (
          <div className="flex items-center justify-center gap-2 py-16 text-muted">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading products…
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            {loadError
              ? "Couldn't reach the server to load products right now. Please try again shortly."
              : "No products published yet — check back soon."}
          </div>
        ) : (
          products.map((p, i) => (
            <Card key={p.slug} hover={false} className={i === 0 ? "lg:p-10" : ""}>
              <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
                    {p.category?.name}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-fg">{p.name}</h3>
                  <p className="mt-2 text-muted max-w-xl">{p.shortDescription}</p>
                  {p.features && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.features.slice(0, 4).map((f) => (
                        <li key={f} className="rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-fg">
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link
                  to={`/products/${p.slug}`}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Request Price
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="mt-16 rounded-3xl border border-dashed border-line bg-surface p-10 text-center">
        <MonitorSmartphone className="h-7 w-7 mx-auto text-fg" />
        <h3 className="mt-4 font-display text-xl font-bold text-fg">Need something different?</h3>
        <p className="mt-2 text-muted">We'll design a setup around your business.</p>
        <Button to="/contact" variant="ghost" className="mt-6">
          Talk to our team
        </Button>
      </div>
    </div>
  );
}
