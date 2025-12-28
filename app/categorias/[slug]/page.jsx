"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { categories } from "@/app/data/categories";
import { products } from "@/app/data/products";
import { companies } from "@/app/data/companies";

export default function CategoriaDetallePage() {
  const { slug } = useParams();

  const category = categories.find((c) => c.slug === slug);
  const filteredProducts = products.filter((p) => p.category === slug);

  if (!category) {
    return (
      <div className="py-32 text-center text-xl font-semibold text-gray-600">
        Categoría no encontrada
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-[#000180]">
          {category.name}
        </h1>
        <p className="mt-2 text-gray-600">
          {filteredProducts.length} productos disponibles
        </p>
      </div>

      {/* Productos */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No hay productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const company = companies.find((c) => c.id === product.companyId);

            return (
              <Link
                key={product.id}
                href={`/productos/${product.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition"
              >
                {/* Imagen */}
                <div className="relative h-52 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-6 space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {product.title}
                  </h3>

                  <p className="text-[#45C93E] font-bold text-lg">
                    ${product.price.toLocaleString()} / {product.unit}
                  </p>

                  {company && (
                    <p className="text-sm text-gray-500">{company.name}</p>
                  )}

                  <span className="text-sm text-[#45C93E] font-medium">
                    Ver producto →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
