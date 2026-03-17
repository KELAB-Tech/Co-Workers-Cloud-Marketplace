import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { getMarketplaceProducts, formatPrice } from "@/lib/api/marketplace";
import ProductCard from "./ProductCard";

export default async function UltimosProductos() {
  let products = [];
  try {
    const data = await getMarketplaceProducts({
      size: 8,
      sortBy: "createdAt",
      sortDir: "desc",
    });
    products = data.content || [];
  } catch {
    return null;
  }

  if (!products.length) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#45C93E]/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-[#45C93E]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#000180]">
              Últimos agregados
            </h2>
            <p className="text-xs text-gray-500">
              Publicados recientemente en el marketplace
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="text-xs font-semibold text-[#45C93E] hover:text-[#000180] flex items-center gap-1 transition-colors"
        >
          Ver todos <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}
