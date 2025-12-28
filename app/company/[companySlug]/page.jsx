import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight, MapPin } from "lucide-react";
import { companies } from "@/app/data/companies";
import { categories } from "@/app/data/categories";

export default async function CompanyProfilePage({ params }) {
  const { companySlug } = await params;

  const company = companies.find((c) => c.slug === companySlug);

  if (!company) {
    return <div className="py-20 text-center">Empresa no encontrada</div>;
  }

  return (
    <main className="bg-[#f7f9fc]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000180] to-[#000180]/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 text-white">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <Image
                src={company.logo}
                alt={company.name}
                width={80}
                height={80}
                priority
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold">
                <Building2 size={14} />
                Empresa asociada
              </span>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold">
                {company.name}
              </h1>

              <p className="mt-4 text-white/80 max-w-2xl">
                {company.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="-mt-16 relative z-20 max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-3xl shadow-xl p-10 space-y-14">
          {/* CATEGORÍAS */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#000180]">
              Categorías que maneja
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {company.categories.map((catSlug) => {
                const cat = categories.find((c) => c.slug === catSlug);

                return (
                  <Link
                    key={catSlug}
                    href={`/company/${company.slug}/${catSlug}`}
                    className="p-5 rounded-2xl bg-[#f7f9fc] border border-gray-200 text-sm font-semibold text-[#45C93E] hover:border-[#45C93E] hover:shadow transition"
                  >
                    {cat?.name || catSlug}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* MAPA */}
          <div className="w-full h-[300px] rounded-2xl overflow-hidden border shadow">
            <iframe
              src={`https://www.google.com/maps?q=${company.lat},${company.lng}&z=15&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>

          {/* CTA */}
          <div>
            <Link
              href={`/marketplace/company/${company.slug}`}
              className="inline-flex items-center gap-2 bg-[#45C93E] hover:bg-[#399334] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
            >
              Ver en Waste Store <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
