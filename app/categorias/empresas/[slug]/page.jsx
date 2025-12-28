import Image from "next/image";
import Link from "next/link";

import { companyCategories } from "@/app/data/companyCategories";
import { companies } from "@/app/data/companies";
import { categories } from "@/app/data/categories";

export default async function EmpresasPorCategoriaPage({ params }) {
  const { slug } = await params; // ✅ CLAVE

  const category = companyCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="py-20 text-center text-xl font-semibold">
        Categoría no encontrada
      </div>
    );
  }

  const empresas = companies.filter((c) => c.companyCategory === slug);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-12">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#000180]">
          {category.name}
        </h1>
        <p className="mt-4 text-gray-600">
          Empresas registradas en esta categoría
        </p>
      </div>

      {/* LISTA EMPRESAS */}
      {empresas.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay empresas registradas en esta categoría aún.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {empresas.map((company) => (
            <Link
              key={company.id}
              href={`/company/${company.slug}`}
              className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition border hover:border-[#45C93E]"
            >
              {/* LOGO */}
              <div className="flex items-center gap-4">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={64}
                  height={64}
                  className="rounded-xl bg-gray-100 object-contain"
                />

                <div>
                  <h3 className="text-lg font-bold text-[#000180] group-hover:text-[#45C93E]">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-500">{company.location}</p>
                </div>
              </div>

              {/* DESC */}
              <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                {company.description}
              </p>

              {/* CATEGORÍAS DE PRODUCTOS */}
              <div className="mt-5 flex flex-wrap gap-2">
                {company.categories.map((catSlug) => {
                  const cat = categories.find((c) => c.slug === catSlug);

                  return (
                    <span
                      key={catSlug}
                      className="text-xs bg-[#45C93E]/10 text-[#45C93E] px-3 py-1 rounded-full"
                    >
                      {cat?.name || catSlug}
                    </span>
                  );
                })}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
