import { Suspense } from "react";
import HeroMarketplace from "./components/HeroMarketplace";
import OfertasDelDia from "./components/OfertasDelDia";
import CategoriasDestacadas from "./components/CategoriasDestacadas";
import TiendasDestacadas from "./components/TiendasDestacadas";
import UltimosProductos from "./components/UltimosProductos";
import ComoFunciona from "./components/ComoFunciona";
import Beneficios from "./components/Beneficios";
import ProductosGrid from "./components/ProductosGrid";

export const metadata = {
  title: "Marketplace | Waste Store – R&R Kelab S.A.S",
  description:
    "Marketplace digital para la comercialización segura de materiales aprovechables.",
};

export default async function MarketplacePage({ searchParams }) {
  const sp = await searchParams;

  const hasFilters = !!(
    sp.name ||
    sp.categoryId ||
    sp.minPrice ||
    sp.maxPrice ||
    sp.city ||
    sp.page
  );

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <HeroMarketplace />

        {hasFilters ? (
          <Suspense fallback={<GridSkeleton />}>
            <ProductosGrid searchParams={sp} />
          </Suspense>
        ) : (
          <>
            <Suspense fallback={<SectionSkeleton />}>
              <OfertasDelDia />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <CategoriasDestacadas />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <TiendasDestacadas />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <UltimosProductos />
            </Suspense>
            <ComoFunciona />
          </>
        )}
      </div>
      <Beneficios />
    </main>
  );
}

function SectionSkeleton() {
  return (
    <div className="mb-10 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded-lg mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-14 bg-gray-200 rounded-xl mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-72 bg-gray-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
