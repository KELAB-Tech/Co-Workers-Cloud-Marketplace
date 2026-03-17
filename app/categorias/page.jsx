import Link from "next/link";
import { Package } from "lucide-react";
import { getCategories } from "@/lib/api/marketplace";

const ACTOR_CONFIG = {
  RECICLADOR: { label: "Recicladores", icon: "♻️", slug: "reciclador" },
  TRANSFORMADOR: {
    label: "Transformadores",
    icon: "🏭",
    slug: "transformador",
  },
  TRANSPORTADOR: {
    label: "Transportadores",
    icon: "🚛",
    slug: "transportador",
  },
  ADMIN_SECTORIAL: {
    label: "Gestores Sectoriales",
    icon: "🏢",
    slug: "admin_sectorial",
  },
};

export default async function CategoriasPage() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    /* silencioso */
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#000180]">
          Categorías del Marketplace
        </h1>
        <p className="mt-3 text-gray-500">
          Materiales, servicios y soluciones disponibles
        </p>
      </div>

      {/* Categorías de productos */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-[#000180]">
          Categorías de productos
        </h2>
        {categories.length === 0 ? (
          <p className="text-gray-400 text-sm">Sin categorías disponibles.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/?categoryId=${cat.id}`}
                className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl
                           transition-all border hover:border-[#45C93E]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#45C93E]/10 text-[#45C93E] p-3 rounded-xl text-xl">
                    {cat.icon || <Package size={20} />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-[#000180]">
                      {cat.name}
                    </h3>
                    {cat.productCount > 0 && (
                      <p className="text-xs text-gray-400">
                        {cat.productCount} producto
                        {cat.productCount !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Categorías de empresas */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-[#000180]">
          Categorías de empresas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(ACTOR_CONFIG).map(([type, config]) => (
            <Link
              key={type}
              href={`/actores/${config.slug}`}
              className="group bg-gray-50 rounded-2xl p-5 hover:bg-gray-100
                         transition-all border border-gray-100 hover:border-[#45C93E]"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#000180]/10 text-[#000180] p-3 rounded-xl text-xl">
                  {config.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{config.label}</h3>
                  <p className="text-xs text-gray-400">Ver empresas →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
