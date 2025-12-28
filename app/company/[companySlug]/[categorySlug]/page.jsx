import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { products } from "@/app/data/products";
import { companies } from "@/app/data/companies";
import { categories } from "@/app/data/categories";

export default async function ProductsByCategoryPage({ params }) {
  const { companySlug, categorySlug } = await params;

  const company = companies.find((c) => c.slug === companySlug);
  const category = categories.find((c) => c.slug === categorySlug);

  if (!company || !category) return notFound();

  const filteredProducts = products.filter(
    (p) => p.companyId === company.id && p.category === categorySlug
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#000180]">
          {category.name}
        </h1>
        <p className="mt-2 text-gray-600">
          {company.name} · {filteredProducts.length} producto
          {filteredProducts.length !== 1 && "s"}
        </p>
      </div>

      {/* GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">
          Esta empresa no tiene productos en esta categoría.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/productos/${product.slug}`}
              className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-[#45C93E] font-bold mt-2">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
