import { getMarketplaceProducts, getCategories } from "@/lib/api/marketplace";
import ProductCard from "./ProductCard";
import FiltrosMarketplace from "./FiltrosMarketplace";
import PaginacionMarketplace from "./PaginacionMarketplace";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function ProductosGrid({ searchParams = {} }) {
  const page = Number(searchParams.page) || 0;

  const [data, categories] = await Promise.all([
    getMarketplaceProducts({
      name: searchParams.name,
      categoryId: searchParams.categoryId,
      minPrice: searchParams.minPrice,
      maxPrice: searchParams.maxPrice,
      city: searchParams.city,
      sortBy: searchParams.sortBy,
      sortDir: searchParams.sortDir,
      page,
      size: 16,
    }).catch(() => ({ content: [], totalPages: 0, totalElements: 0 })),
    getCategories().catch(() => []),
  ]);

  const products = data.content || [];

  // ✅ Si viene filtro de categoría, mostrar el nombre de la categoría
  const activeCategory = searchParams.categoryId
    ? categories.find((c) => String(c.id) === String(searchParams.categoryId))
    : null;

  return (
    <div>
      {/* ✅ Header de categoría si viene filtro categoryId */}
      {activeCategory && (
        <div className="mb-6">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1 text-sm text-gray-500
                       hover:text-gray-700 mb-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Volver al marketplace
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{activeCategory.icon || "📦"}</span>
            <div>
              <h1 className="text-2xl font-extrabold text-[#000180]">
                {activeCategory.name}
              </h1>
              <p className="text-sm text-gray-500">
                {data.totalElements} producto
                {data.totalElements !== 1 ? "s" : ""} disponibles
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <FiltrosMarketplace
        categories={categories}
        totalElements={data.totalElements}
      />

      {/* Resultados */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-4">
            <PackageOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Sin resultados
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            No encontramos productos con esos filtros.
          </p>
          <Link
            href="/"
            className="mt-4 text-sm text-[#45C93E] hover:underline"
          >
            Limpiar filtros
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>

          <PaginacionMarketplace
            totalPages={data.totalPages}
            currentPage={page}
          />
        </>
      )}
    </div>
  );
}
