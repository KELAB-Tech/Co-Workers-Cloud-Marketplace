import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Store,
  Package,
  Star,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

import {
  getProductById,
  getProductImages,
  getMarketplaceProducts,
  formatPrice,
} from "@/lib/api/marketplace";

import AddToCartButton from "./AddToCartButton";
import ProductCard from "../../components/ProductCard";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const p = await getProductById(id);

    return {
      title: `${p.name} | Waste Store`,
      description: p.description,
      openGraph: {
        title: p.name,
        description: p.description,
        images: p.mainImageUrl ? [{ url: p.mainImageUrl }] : [],
      },
    };
  } catch {
    return { title: "Producto | Waste Store" };
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  let product, images, related;

  try {
    [product, images] = await Promise.all([
      getProductById(id),
      getProductImages(id).catch(() => []),
    ]);
  } catch {
    notFound();
  }

  try {
    const data = await getMarketplaceProducts({
      categoryId: product.categoryId,
      size: 5,
    });

    related = (data.content || [])
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  } catch {
    related = [];
  }

  const isOOS = product.status === "OUT_OF_STOCK";
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const allImages = [product.mainImageUrl, ...images].filter(Boolean);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 min-w-0">
          <Link
            href="/marketplace"
            className="hover:text-[#000180] transition-colors flex items-center gap-1 shrink-0"
          >
            <ArrowLeft className="w-3 h-3" /> Marketplace
          </Link>

          <span>/</span>

          {product.categoryName && (
            <>
              <Link
                href={`/marketplace?categoryId=${product.categoryId}`}
                className="hover:text-[#000180] transition-colors truncate"
              >
                {product.categoryIcon} {product.categoryName}
              </Link>
              <span>/</span>
            </>
          )}

          <span className="text-gray-600 font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* GALERÍA */}
          <div className="space-y-3 min-w-0">
            <div className="relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
              {product.mainImageUrl ? (
                <Image
                  src={product.mainImageUrl}
                  alt={product.name}
                  fill
                  priority
                  className={`object-cover ${isOOS ? "grayscale opacity-70" : ""}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-gray-50 to-gray-100">
                  {product.categoryIcon || "♻️"}
                </div>
              )}

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <span className="flex items-center gap-1.5 bg-[#000180] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
                    <Star className="w-3 h-3 fill-[#45C93E] text-[#45C93E]" />
                    Destacado
                  </span>
                )}

                {product.categoryName && (
                  <span className="bg-white/95 backdrop-blur text-[#000180] text-xs font-medium px-3 py-1.5 rounded-full border border-[#000180]/10 shadow-sm">
                    {product.categoryIcon} {product.categoryName}
                  </span>
                )}
              </div>

              {isOOS && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 backdrop-blur-sm px-8 py-3 rounded-2xl">
                    <p className="text-white font-medium text-lg tracking-wider">
                      AGOTADO
                    </p>
                  </div>
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((url, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 border-gray-200 bg-white cursor-pointer hover:border-[#45C93E]"
                  >
                    <Image
                      src={url}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* INFO PRODUCTO */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5 min-w-0">
            {/* 🔥 TÍTULO SIN EXTRABOLD */}
            <h1 className="text-2xl md:text-3xl font-medium text-[#000180] break-words">
              {product.name}
            </h1>

            {/* ✅ PRECIO BLINDADO */}
            <div className="min-w-0">
              <p className="text-3xl md:text-4xl font-medium text-[#45C93E] leading-tight break-words">
                {formatPrice(product.price)}
              </p>
              <span className="text-sm text-gray-400">/ unidad</span>
            </div>

            <div className="border-t border-gray-100" />

            {/* STOCK */}
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                isOOS
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : isLowStock
                    ? "bg-orange-50 text-orange-600 border border-orange-100"
                    : "bg-[#45C93E]/10 text-[#2d7a28] border border-[#45C93E]/20"
              }`}
            >
              {isOOS ? (
                <>
                  <AlertTriangle className="w-4 h-4" /> Sin stock
                </>
              ) : isLowStock ? (
                <>
                  <AlertTriangle className="w-4 h-4" /> Solo {product.stock}{" "}
                  disponibles
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" /> En stock — {product.stock}{" "}
                  unidades
                </>
              )}
            </div>

            <p className="text-gray-500 text-sm leading-relaxed break-words">
              {product.description}
            </p>

            {/* CHIPS */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 bg-gray-100 text-xs px-3 py-1.5 rounded-full">
                <Package className="w-3 h-3" />
                Stock: {product.stock}
              </span>

              {product.storeCity && (
                <span className="flex items-center gap-1 bg-gray-100 text-xs px-3 py-1.5 rounded-full">
                  <MapPin className="w-3 h-3" />
                  {product.storeCity}
                </span>
              )}
            </div>

            <div className="border-t border-gray-100" />

            <AddToCartButton product={product} disabled={isOOS} />

            {/* TIENDA */}
            <Link
              href={`/marketplace/tienda/${product.storeId}`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#45C93E]/50 hover:shadow-md transition-all group min-w-0"
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-200 flex items-center justify-center">
                {product.storeLogoUrl ? (
                  <Image
                    src={product.storeLogoUrl}
                    alt={product.storeName}
                    width={44}
                    height={44}
                    className="object-cover"
                  />
                ) : (
                  <Store className="w-5 h-5 text-[#000180]/40" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400">Vendido por</p>
                <p className="font-medium text-sm text-[#000180] truncate">
                  {product.storeName}
                </p>
              </div>

              <span className="text-xs font-medium text-[#45C93E] shrink-0">
                Ver tienda →
              </span>
            </Link>
          </div>
        </div>

        {/* RELACIONADOS */}
        {related.length > 0 && (
          <section className="border-t border-gray-200 pt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-medium text-[#000180]">
                Más en {product.categoryName}
              </h2>

              <Link
                href={`/marketplace?categoryId=${product.categoryId}`}
                className="text-xs font-medium text-[#45C93E]"
              >
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
