import Link from "next/link";
import Image from "next/image";
import { Store, MapPin, Star, Package } from "lucide-react";
import { formatPrice } from "@/lib/api/marketplace";

export default function ProductCard({ product, priority = false }) {
  const isOOS = product.status === "OUT_OF_STOCK";
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Link
      href={`/productos/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100
                 hover:border-[#45C93E]/40 hover:shadow-lg
                 transition-all duration-300 flex flex-col h-full"
    >
      {/* ── IMAGEN ── */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-gray-50">
        {product.mainImageUrl ? (
          <Image
            src={product.mainImageUrl}
            alt={product.name}
            fill
            priority={priority}
            className={`object-cover transition-transform duration-500
                        group-hover:scale-105
                        ${isOOS ? "opacity-60 grayscale" : ""}`}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center
                          text-5xl bg-gradient-to-br from-gray-100 to-gray-200"
          >
            {product.categoryIcon || "♻️"}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.featured && (
            <span
              className="flex items-center gap-1 bg-[#000180] text-white
                             text-[10px] font-medium px-2 py-0.5 rounded-full"
            >
              <Star className="w-2.5 h-2.5 fill-[#45C93E] text-[#45C93E]" />
              Destacado
            </span>
          )}
          {product.categoryName && (
            <span
              className="bg-white/90 text-[#000180] text-[10px] font-medium
                             px-2 py-0.5 rounded-full border border-[#000180]/10
                             backdrop-blur-sm line-clamp-1 max-w-[120px]"
            >
              {product.categoryIcon} {product.categoryName}
            </span>
          )}
        </div>

        {isOOS && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="bg-black/60 text-white text-xs font-medium
                             px-3 py-1 rounded-full tracking-wide"
            >
              AGOTADO
            </span>
          </div>
        )}
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-col flex-1 p-3 gap-2 min-w-0">
        {/* Nombre */}
        <h3
          className="text-sm font-medium text-gray-800 line-clamp-2
                       leading-snug group-hover:text-[#000180] transition-colors
                       min-h-[2.5rem]"
        >
          {product.name}
        </h3>

        {/* Tienda */}
        <div className="flex items-center gap-1 text-[11px] text-gray-400 min-w-0">
          <Store className="w-3 h-3 text-[#000180]/40 shrink-0" />
          <span className="truncate">{product.storeName}</span>
          {product.storeCity && (
            <>
              <span className="shrink-0">·</span>
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{product.storeCity}</span>
            </>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* ✅ PRECIO — bloque independiente que no rompe layout */}
        <div className="pt-2 border-t border-gray-100">
          {/* Precio en su propia línea — sin flex competir con otros elementos */}
          <p
            className="text-[#45C93E] font-medium text-base leading-tight
                        break-words hyphens-none overflow-hidden"
          >
            {formatPrice(product.price)}
          </p>

          {/* Stock info debajo del precio */}
          <div className="flex items-center justify-between mt-1">
            {isOOS ? (
              <span className="text-[10px] text-red-400">Sin stock</span>
            ) : isLowStock ? (
              <span className="text-[10px] text-orange-500">
                ⚠ Solo {product.stock}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-gray-400">
                <Package className="w-2.5 h-2.5" /> {product.stock} uds.
              </span>
            )}
            <span
              className="text-[11px] font-medium text-[#000180]
                             group-hover:text-[#45C93E] transition-colors shrink-0"
            >
              Ver →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
