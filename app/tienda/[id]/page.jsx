import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Phone,
  Store,
  CheckCircle,
  ArrowLeft,
  Package,
} from "lucide-react";
import {
  getStoreById,
  getStoreImages,
  getStoreProducts,
  formatPrice,
} from "@/lib/api/marketplace";
import ProductCard from "../../components/ProductCard";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const s = await getStoreById(id);
    return {
      title: `${s.name} | Waste Store`,
      description: s.description,
    };
  } catch {
    return { title: "Tienda | Waste Store" };
  }
}

export default async function StoreDetailPage({ params }) {
  const { id } = await params;
  let store, storeImages, products;

  try {
    [store, storeImages] = await Promise.all([
      getStoreById(id),
      getStoreImages(id).catch(() => []),
    ]);
  } catch {
    notFound();
  }

  try {
    products = await getStoreProducts(id);
  } catch {
    products = [];
  }

  const activeProducts = products.filter((p) => p.status === "ACTIVE");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ── BREADCRUMB ── */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#000180] transition-colors">
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-gray-600 font-medium truncate max-w-[200px]">
            {store.name}
          </span>
        </nav>

        {/* ── HEADER TIENDA ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          {/* Banner */}
          <div className="h-30 md:h-48 bg-gradient-to-br from-[#000180] via-[#000180] to-[#001fb3] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, #45C93E 0%, transparent 50%),
                                   radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 40%)`,
              }}
            />
            {storeImages.length > 0 && (
              <Image
                src={storeImages[0].imageUrl}
                alt={store.name}
                fill
                className="object-cover opacity-30"
              />
            )}
          </div>

          {/* Info */}
          <div className="px-6 mt-12 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0 bg-white">
                {store.logoUrl ? (
                  <Image
                    src={store.logoUrl}
                    alt={store.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#000180]/10">
                    <Store className="w-8 h-8 text-[#000180]/40" />
                  </div>
                )}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-[#000180]">
                    {store.name}
                  </h1>
                  <CheckCircle className="w-5 h-5 text-[#45C93E]" />
                </div>
                <div className="flex flex-wrap gap-3 mt-1">
                  {store.city && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" /> {store.city}
                    </span>
                  )}
                  {store.phone && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Phone className="w-3 h-3" /> {store.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-[#45C93E] font-medium">
                    <Package className="w-3 h-3" /> {activeProducts.length}{" "}
                    productos activos
                  </span>
                </div>
              </div>
            </div>

            {store.description && (
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                {store.description}
              </p>
            )}

            {store.address && (
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {store.address}
              </p>
            )}
          </div>
        </div>

        {/* ── PRODUCTOS ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-extrabold text-[#000180]">
              Productos de {store.name}
            </h2>
            <span className="text-xs text-gray-500">
              {activeProducts.length} disponibles
            </span>
          </div>

          {activeProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="font-bold text-gray-700 mb-1">
                Sin productos disponibles
              </h3>
              <p className="text-sm text-gray-400">
                Esta tienda aún no tiene productos activos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {activeProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 4} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
