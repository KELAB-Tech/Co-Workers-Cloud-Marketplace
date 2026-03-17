import Link from "next/link";
import Image from "next/image";
import { Flame, Store, MapPin } from "lucide-react";
import { getFeaturedProducts, formatPrice } from "@/lib/api/marketplace";

export default async function OfertasDelDia() {
  let products = [];
  try {
    products = await getFeaturedProducts();
  } catch {
    return null;
  }
  if (!products.length) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-[#000180]">
              Destacados del día
            </h2>
            <p className="text-xs text-gray-500">
              Productos seleccionados por el equipo
            </p>
          </div>
        </div>

        <Link
          href="/?sortBy=featured"
          className="text-xs font-medium text-[#45C93E] hover:text-[#000180] transition-colors"
        >
          Ver todos →
        </Link>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory
                   md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible md:pb-0"
      >
        {products.slice(0, 8).map((p) => (
          <Link
            key={p.id}
            href={`/productos/${p.id}`}
            className="group flex-shrink-0 w-60 md:w-auto snap-start
                       bg-white rounded-2xl overflow-hidden border border-gray-100
                       hover:border-orange-200 hover:shadow-lg transition-all"
          >
            {/* Imagen */}
            <div className="relative h-40 bg-gray-50 overflow-hidden">
              {p.mainImageUrl ? (
                <Image
                  src={p.mainImageUrl}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {p.categoryIcon || "♻️"}
                </div>
              )}

              <div className="absolute top-2 left-2 flex items-center gap-1 bg-orange-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                <Flame className="w-2.5 h-2.5" /> Destacado
              </div>
            </div>

            {/* Body */}
            <div className="p-3 flex flex-col gap-2 min-w-0">
              {/* Nombre */}
              <h3 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-[#000180] transition-colors min-h-[2.5rem] break-words">
                {p.name}
              </h3>

              {/* Store */}
              <div className="flex items-center gap-1 text-[11px] text-gray-400 min-w-0">
                <Store className="w-3 h-3 shrink-0" />
                <span className="truncate min-w-0">{p.storeName}</span>

                {p.storeCity && (
                  <>
                    <span className="shrink-0">·</span>
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate min-w-0">{p.storeCity}</span>
                  </>
                )}
              </div>

              {/* ✅ PRECIO 100% SEGURO */}
              <div className="pt-2 border-t border-gray-100 min-w-0">
                <p className="text-[#45C93E] font-medium text-base leading-tight break-words">
                  {formatPrice(p.price)}
                </p>

                <span className="text-[11px] text-gray-400 group-hover:text-[#45C93E] transition-colors">
                  Ver más →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
