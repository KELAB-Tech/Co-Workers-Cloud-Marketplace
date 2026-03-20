import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getStores } from "@/lib/api/marketplace";
import StoreCard from "@/app/components/StoreCard";

const ACTOR_CONFIG = {
  reciclador: {
    label: "Recicladores",
    icon: "♻️",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
  },
  transformador: {
    label: "Transformadores",
    icon: "🏭",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  transportador: {
    label: "Transportadores",
    icon: "🚛",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  admin_sectorial: {
    label: "Productores",
    icon: "🏢",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
  },
};

export async function generateMetadata({ params }) {
  const { actor } = await params;
  const config = ACTOR_CONFIG[actor];
  if (!config) return { title: "Categoría | Marketplace" };
  return {
    title: `${config.label} | Marketplace Waste Store`,
    description: `Encuentra empresas ${config.label.toLowerCase()} en el marketplace`,
  };
}

export default async function ActoresPorTipoPage({ params, searchParams }) {
  const { actor } = await params;
  const sp = await searchParams;
  const config = ACTOR_CONFIG[actor];
  if (!config) notFound();

  const page = Number(sp.page ?? 0);
  const search = sp.name ?? "";

  let stores = [],
    totalPages = 0,
    totalElements = 0;
  try {
    const data = await getStores({
      actorType: actor.toUpperCase(),
      page,
      size: 12,
      name: search || undefined,
    });
    stores = data.content ?? data ?? [];
    totalPages = data.totalPages ?? 0;
    totalElements = data.totalElements ?? stores.length;
  } catch {
    /* silencioso */
  }

  const buildUrl = (newPage) => {
    const p = new URLSearchParams(sp);
    p.set("page", newPage);
    return `/actores/${actor}?${p}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500
                       hover:text-gray-700 mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Marketplace
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center
                              text-3xl border-2 ${config.bg}`}
            >
              {config.icon}
            </div>
            <div className="flex-1">
              <h1 className={`text-2xl font-extrabold ${config.color}`}>
                {config.label}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Empresas registradas en esta categoría
              </p>
            </div>
            {totalElements > 0 && (
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-gray-800">
                  {totalElements}
                </p>
                <p className="text-xs text-gray-500">
                  empresa{totalElements !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>

          {/* Buscador */}
          <form className="mt-4 flex items-center gap-2 max-w-md" method="GET">
            <input
              name="name"
              defaultValue={search}
              placeholder={`Buscar en ${config.label.toLowerCase()}...`}
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-xl
                         outline-none focus:border-[#45C93E] transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#45C93E] text-white text-sm font-semibold
                         rounded-xl hover:opacity-90 transition-all"
            >
              Buscar
            </button>
            {search && (
              <Link
                href={`/actores/${actor}`}
                className="px-3 py-2 text-sm text-gray-500 border border-gray-200
                           rounded-xl hover:bg-gray-50 transition-colors"
              >
                ✕
              </Link>
            )}
          </form>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {stores.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-6xl">{config.icon}</span>
            <p className="font-semibold text-gray-700">
              {search ? "Sin resultados" : "Sin empresas aún"}
            </p>
            <p className="text-sm text-gray-400">
              {search
                ? "Intenta con otro término"
                : "No hay empresas registradas en esta categoría"}
            </p>
            {search && (
              <Link
                href={`/actores/${actor}`}
                className="text-sm text-[#45C93E] hover:underline"
              >
                Limpiar búsqueda
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {stores.map((store) => (
                <StoreCard key={store.id} store={store} config={config} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {page > 0 && (
                  <Link
                    href={buildUrl(page - 1)}
                    className="px-4 py-2 text-sm font-medium border border-gray-200
                               rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    ← Anterior
                  </Link>
                )}
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const p =
                    page <= 2
                      ? i
                      : page >= totalPages - 3
                        ? totalPages - 5 + i
                        : page - 2 + i;
                  if (p < 0 || p >= totalPages) return null;
                  return (
                    <Link
                      key={p}
                      href={buildUrl(p)}
                      className={`h-9 w-9 flex items-center justify-center text-sm
                                  font-medium rounded-xl transition-colors ${
                                    p === page
                                      ? "bg-[#45C93E] text-white"
                                      : "border border-gray-200 hover:bg-gray-50"
                                  }`}
                    >
                      {p + 1}
                    </Link>
                  );
                })}
                {page < totalPages - 1 && (
                  <Link
                    href={buildUrl(page + 1)}
                    className="px-4 py-2 text-sm font-medium border border-gray-200
                               rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Siguiente →
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
