import Link from "next/link";
import { getCategories } from "@/lib/api/marketplace";

const ACTOR_CONFIG = {
  RECICLADOR: {
    icon: "♻️",
    color: "bg-green-50  border-green-200  text-green-700",
    label: "Recicladores",
  },
  TRANSFORMADOR: {
    icon: "🏭",
    color: "bg-blue-50   border-blue-200   text-blue-700",
    label: "Transformadores",
  },
  TRANSPORTADOR: {
    icon: "🚛",
    color: "bg-amber-50  border-amber-200  text-amber-700",
    label: "Transportadores",
  },
  ADMIN_SECTORIAL: {
    icon: "🏢",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    label: "Productores",
  },
  PLAN_COLECTIVO: {
    icon: "📋",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    label: "Plan Colectivo",
  },
  SOSTENIBILIDAD: {
    icon: "🌱",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    label: "Sostenibilidad",
  },
};

export default async function CategoriasDestacadas() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    /* silencioso */
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold text-[#000180]">
          Categorías de materiales
        </h2>
        <Link
          href="/categorias"
          className="text-xs font-semibold text-[#45C93E] hover:text-[#000180]"
        >
          Ver todas →
        </Link>
      </div>

      {/* Por tipo de actor */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Por tipo de actor
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(ACTOR_CONFIG).map(([type, config]) => (
            <Link
              key={type}
              href={`/actores/${type.toLowerCase()}`}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2
                          transition-all hover:shadow-md hover:scale-[1.02] ${config.color}`}
            >
              <span className="text-3xl">{config.icon}</span>
              <span className="text-xs font-bold text-center">
                {config.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Por tipo de material */}
      {categories.length > 0 && (
        <>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Por tipo de material
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.slice(0, 12).map((cat) => (
              <Link
                key={cat.id}
                href={`/?categoryId=${cat.id}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white
                           border border-gray-100 hover:border-[#45C93E]/40
                           hover:shadow-md transition-all text-center"
              >
                <span className="text-2xl">{cat.icon || "📦"}</span>
                <span className="text-xs font-semibold text-gray-700 line-clamp-2">
                  {cat.name}
                </span>
                {cat.productCount > 0 && (
                  <span className="text-[10px] text-gray-400">
                    {cat.productCount} productos
                  </span>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
