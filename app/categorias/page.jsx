"use client";

import Link from "next/link";
import { Package, Building2 } from "lucide-react";

import { categories } from "../data/categories";
import { products } from "../data/products";
import { companyCategories } from "../data/companyCategories";
import { companies } from "../data/companies";

export default function CategoriasPage() {
  // 🔹 Categorías de productos con productos reales
  const categoriasProductos = categories.filter((cat) =>
    products.some((p) => p.category === cat.slug)
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-20">
      {/* ================= PRODUCTOS ================= */}
      <div>
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-[#000180]">
            Categorías del Marketplace
          </h1>
          <p className="mt-4 text-gray-600">
            Materiales, servicios y soluciones disponibles
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#000180]">
          Categorías de productos
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoriasProductos.map((cat) => {
            const total = products.filter(
              (p) => p.category === cat.slug
            ).length;

            return (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition border hover:border-[#45C93E]"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#45C93E]/10 text-[#45C93E] p-3 rounded-xl">
                    <Package />
                  </div>

                  <div>
                    <h3 className="font-semibold group-hover:text-[#000180]">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {total} producto{total > 1 && "s"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ================= EMPRESAS ================= */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-[#000180]">
          Categorías de empresas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyCategories.map((cat) => {
            const total = companies.filter(
              (c) => c.companyCategory === cat.slug
            ).length;

            return (
              <Link
                key={cat.slug}
                href={`/categorias/empresas/${cat.slug}`}
                className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#000180]/10 text-[#000180] p-3 rounded-xl">
                    <Building2 />
                  </div>

                  <div>
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-sm text-gray-500">
                      {total} empresa{total !== 1 && "s"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
