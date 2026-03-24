import Link from "next/link";
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
  plan_colectivo: {
    label: "Planes Colectivos",
    icon: "📋",
    color: "text-indigo-700",
    bg: "bg-indigo-50 border-indigo-200",
  },
  sostenibilidad: {
    label: "Sostenibilidad",
    icon: "🌱",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
  },
};

const DEFAULT_CONFIG = {
  icon: "🏪",
  label: "Empresa",
  color: "text-[#000180]",
  bg: "bg-blue-50 border-blue-200",
};

async function getStoresByActor(actorType) {
  try {
    const data = await getStores({ actorType, size: 100 });
    return data.content ?? data ?? [];
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Empresas | Marketplace Waste Store",
  description:
    "Todas las empresas verificadas del marketplace: recicladores, transformadores, transportadores y gestores.",
};

export default async function ActoresPage() {
  // Cargar todas las categorías en paralelo
  const [
    recicladores,
    transformadores,
    transportadores,
    gestores,
    planes,
    sostenibilidad,
  ] = await Promise.all([
    getStoresByActor("RECICLADOR"),
    getStoresByActor("TRANSFORMADOR"),
    getStoresByActor("TRANSPORTADOR"),
    getStoresByActor("ADMIN_SECTORIAL"),
    getStoresByActor("PLAN_COLECTIVO"),
    getStoresByActor("SOSTENIBILIDAD"),
  ]);

  const sections = [
    {
      key: "reciclador",
      stores: recicladores,
      config: ACTOR_CONFIG.reciclador,
    },
    {
      key: "transformador",
      stores: transformadores,
      config: ACTOR_CONFIG.transformador,
    },
    {
      key: "transportador",
      stores: transportadores,
      config: ACTOR_CONFIG.transportador,
    },
    {
      key: "admin_sectorial",
      stores: gestores,
      config: ACTOR_CONFIG.admin_sectorial,
    },
    {
      key: "PLAN_COLECTIVO",
      stores: planes,
      config: ACTOR_CONFIG.plan_colectivo,
    },
    {
      key: "SOSTENIBILIDAD",
      stores: sostenibilidad,
      config: ACTOR_CONFIG.sostenibilidad,
    },
  ];

  const totalEmpresas = sections.reduce((acc, s) => acc + s.stores.length, 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── HERO ── */}
      <div className="bg-gradient-to-br from-[#000180] via-[#000180] to-[#001fb3] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 50%, #45C93E 0%, transparent 50%),
                               radial-gradient(circle at 85% 20%, white 0%, transparent 40%)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-white/60
                       hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Marketplace
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                Empresas del Marketplace
              </h1>
              <p className="text-white/70 text-sm max-w-xl">
                Empresas verificadas que hacen parte de la cadena de valor de la
                economía circular en Colombia.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-4xl font-black text-[#45C93E]">
                {totalEmpresas}
              </p>
              <p className="text-white/60 text-sm">
                empresa{totalEmpresas !== 1 ? "s" : ""} registradas
              </p>
            </div>
          </div>

          {/* Pills de categorías */}
          <div className="flex flex-wrap gap-2 mt-6">
            {sections.map((s) => (
              <a
                key={s.key}
                href={`#${s.key}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                           bg-white/10 text-white/80 text-xs font-medium
                           hover:bg-white/20 transition-colors backdrop-blur-sm border
                           border-white/10"
              >
                {s.config.icon} {s.config.label}
                <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">
                  {s.stores.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECCIONES POR ACTOR ── */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
        {sections.map((section) => (
          <div key={section.key} id={section.key}>
            {/* Header de sección */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center
                                  text-2xl border-2 ${section.config.bg}`}
                >
                  {section.config.icon}
                </div>
                <div>
                  <h2
                    className={`text-xl font-extrabold ${section.config.color}`}
                  >
                    {section.config.label}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {section.stores.length} empresa
                    {section.stores.length !== 1 ? "s" : ""} registrada
                    {section.stores.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <Link
                href={`/actores/${section.key}`}
                className="text-xs font-semibold text-[#45C93E] hover:text-[#000180]
                           transition-colors hidden sm:block"
              >
                Ver todas →
              </Link>
            </div>

            {/* Grid de tiendas */}
            {section.stores.length === 0 ? (
              <div
                className={`flex items-center gap-4 p-6 rounded-2xl border-2
                               border-dashed ${section.config.bg}`}
              >
                <span className="text-3xl">{section.config.icon}</span>
                <div>
                  <p
                    className={`font-semibold text-sm ${section.config.color}`}
                  >
                    Sin empresas registradas aún
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Las empresas de esta categoría aparecerán aquí cuando se
                    registren.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {section.stores.map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      config={section.config}
                    />
                  ))}
                </div>

                {/* Ver más si hay muchas */}
                {section.stores.length >= 8 && (
                  <div className="text-center mt-6">
                    <Link
                      href={`/actores/${section.key}`}
                      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
                                  border-2 text-sm font-semibold transition-all hover:shadow-md
                                  ${section.config.bg} ${section.config.color}`}
                    >
                      {section.config.icon} Ver todos los{" "}
                      {section.config.label.toLowerCase()}
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
