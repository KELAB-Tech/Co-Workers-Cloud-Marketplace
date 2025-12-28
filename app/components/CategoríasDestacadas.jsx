"use client";

import Image from "next/image";
import Link from "next/link";
import { Store } from "lucide-react";

import { products } from "../data/products";
import { companies } from "../data/companies";

export default function CategoriasDestacadas() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#000180]">
            Productos destacados
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Descubra productos disponibles en el marketplace y conozca las
            empresas que los ofrecen.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const company = companies.find((c) => c.id === product.companyId);

            return (
              <Link
                key={product.id}
                href={`/productos/${product.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                {/* Imagen */}
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      product.image || "/marketplace/product-placeholder.jpg"
                    }
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>

                  <p className="text-[#45C93E] font-bold">${product.price}</p>

                  {/* Empresa */}
                  {company && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Store className="w-4 h-4 text-[#000180]" />
                      <span>{company.name}</span>
                    </div>
                  )}

                  <span className="inline-block text-sm text-[#45C93E] font-medium mt-2">
                    Ver producto →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
