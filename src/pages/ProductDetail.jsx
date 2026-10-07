import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, MonitorSmartphone, ChevronLeft, Users, Receipt } from "lucide-react";
import Button from "../components/ui/Button";
import ChevronMark from "../components/ui/ChevronMark";
import { fetchProduct } from "../services/api";
import { fallbackProducts } from "../data/fallbackProducts";

/**
 * The "surprise" for the Dual-Screen POS page: rather than a generic icon in
 * a box, an actual little animation of the two screens it's named after —
 * the cashier's running total on the left, the customer-facing "thank you"
 * screen on the right — with the brand's chevron motif flowing between them
 * to suggest the two screens staying in sync in real time.
 */
function DualScreenShowcase() {
  const items = [
    ["Rice 25kg", "RWF 18,000"],
    ["Cooking oil 5L", "RWF 9,500"],
    ["Sugar 2kg", "RWF 3,200"],
  ];

  return (
    <div className="relative rounded-3xl bg-ink p-6 sm:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-6 sm:gap-4">
        {/* Cashier display */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
        >
          <div className="flex items-center gap-2 text-white/50 text-[11px] font-medium uppercase tracking-wide">
            <Receipt className="h-3.5 w-3.5" /> Cashier display
          </div>
          <div className="mt-4 space-y-2.5">
            {items.map(([label, price], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.25, duration: 0.4 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-white/70">{label}</span>
                <span className="text-white font-medium">{price}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/50">Total</span>
            <span className="font-display font-bold text-white">RWF 30,700</span>
          </div>
        </motion.div>

        {/* Flowing chevrons: the two screens staying in sync */}
        <div className="hidden sm:flex flex-col items-center gap-1.5 px-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
            >
              <ChevronMark className="h-4 w-4 text-accent rotate-90" />
            </motion.div>
          ))}
        </div>

        {/* Customer-facing display */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl bg-white p-5 text-ink"
        >
          <div className="flex items-center gap-2 text-muted text-[11px] font-medium uppercase tracking-wide">
            <Users className="h-3.5 w-3.5" /> Customer display
          </div>
          <p className="mt-4 text-sm text-muted">Thank you for shopping with us</p>
          <p className="mt-1 font-display text-2xl font-bold">RWF 30,700</p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Payment received
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function GenericProductVisual() {
  return (
    <div className="rounded-3xl bg-ink p-14 flex items-center justify-center aspect-square">
      <MonitorSmartphone className="h-24 w-24 sm:h-28 sm:w-28 text-white/30" strokeWidth={1} />
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const fallback = fallbackProducts.find((p) => p.slug === slug);
  const [product, setProduct] = useState(fallback || null);

  useEffect(() => {
    fetchProduct(slug)
      .then((res) => res.data?.data && setProduct(res.data.data))
      .catch(() => {
        /* keep fallback */
      });
  }, [slug]);

  if (!product) {
    return (
      <div className="container-content py-24 text-center">
        <p className="text-muted">We couldn't find that product.</p>
        <Link to="/products" className="mt-4 inline-block font-semibold text-fg">
          ← Back to products
        </Link>
      </div>
    );
  }

  const specs = product.specifications || {};

  return (
    <div className="container-content py-10 sm:py-14 lg:py-20">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg">
        <ChevronLeft className="h-4 w-4" /> All products
      </Link>

      <div className="mt-6 sm:mt-8 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
        {slug === "dual-screen-pos" ? <DualScreenShowcase /> : <GenericProductVisual />}

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
            {product.category?.name}
          </span>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-fg leading-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">{product.description}</p>

          <p className="mt-6 text-sm font-semibold text-fg">Request Pricing</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button to="/quote" variant="primary">
              Request Quote <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button to="/contact" variant="ghost">
              Talk to Sales
            </Button>
          </div>

          {product.features && (
            <div className="mt-10">
              <h3 className="font-display text-lg font-bold text-fg">Feature Details</h3>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(specs).length > 0 && (
            <div className="mt-10 rounded-2xl border border-line overflow-hidden">
              <div className="table-scroll">
                <table className="w-full min-w-[420px] text-sm">
                  <tbody>
                    {Object.entries(specs).map(([k, v], i) => (
                      <tr key={k} className={i % 2 === 0 ? "bg-surface" : "bg-paper/60"}>
                        <td className="px-5 py-3 font-medium text-fg w-1/3">{k}</td>
                        <td className="px-5 py-3 text-muted">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
