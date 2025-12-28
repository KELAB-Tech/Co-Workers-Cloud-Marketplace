"use client";

import Link from "next/link";
import { companies } from "../data/companies";
import { products } from "../data/products";
import { Store } from "lucide-react";

export default function TiendasDestacadas() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#000180]">
            Tiendas destacadas
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Empresas confiables que impulsan la economía circular.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {companies.map((company) => {
            const count = products.filter(
              (p) => p.companyId === company.id
            ).length;

            return (
              <Link
                key={company.id}
                href={`/company/${company.slug}`}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#45C93E]/10 flex items-center justify-center">
                    <Store className="text-[#45C93E]" />
                  </div>
                  <h3 className="text-xl font-semibold">{company.name}</h3>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {company.description}
                </p>

                <span className="text-sm font-medium text-[#45C93E]">
                  {count} productos disponibles →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
