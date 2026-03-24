import Link from "next/link";
import { MapPin, CheckCircle } from "lucide-react";
import { getStores } from "@/lib/api/marketplace";
import StoreLogoImage from "./StoreLogoImage";

export default async function TiendasDestacadas() {
  let stores = [];
  try {
    const data = await getStores({ size: 6 });
    stores = data.content ?? data ?? [];
  } catch {
    /* silencioso */
  }

  if (!stores.length) return null;

  const getInitials = (name) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold text-[#000180]">
          Tiendas destacadas
        </h2>
        <Link
          href="/actores"
          className="text-xs font-semibold text-[#45C93E] hover:text-[#000180]"
        >
          Ver todas →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <Link
            key={store.id}
            href={`/tienda/${store.id}`}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden
                       hover:border-[#45C93E]/40 hover:shadow-lg transition-all"
          >
            {/* Banner */}
            <div className="h-16 bg-gradient-to-r from-[#000180] to-[#45C93E] relative">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)",
                }}
              />
            </div>

            <div className="px-4 pb-4 mt-6">
              {/* Logo */}
              <div className="-mt-5 mb-3">
                <div
                  className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white
                                shadow bg-white flex items-center justify-center"
                >
                  {/* ✅ Client Component maneja el onError */}
                  <StoreLogoImage
                    logoUrl={store.logoUrl}
                    name={store.name}
                    initials={getInitials(store.name)}
                  />
                </div>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h3
                      className="font-bold text-sm text-[#000180]
                                   group-hover:text-[#45C93E] transition-colors truncate"
                    >
                      {store.name}
                    </h3>
                    <CheckCircle className="w-3.5 h-3.5 text-[#45C93E] shrink-0" />
                  </div>
                  {store.city && (
                    <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                      <MapPin className="w-2.5 h-2.5" /> {store.city}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#45C93E] font-semibold shrink-0">
                  Ver →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
