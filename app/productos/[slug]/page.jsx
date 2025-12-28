"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState, useMemo } from "react";

import { products } from "@/app/data/products";
import { companies } from "@/app/data/companies";
import { useCartStore } from "@/app/store/cartStore";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  const addItem = useCartStore((s) => s.addItem);

  /* ================= PRODUCT ================= */
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold text-[#000180]">
          Producto no encontrado
        </h2>
      </div>
    );
  }

  const company = companies.find((c) => c.id === product.companyId);

  /* ================= STATE ================= */
  const defaultQty =
    product.options?.values?.[0] && Number(product.options.values[0]) > 0
      ? Number(product.options.values[0])
      : 1;

  const [quantity, setQuantity] = useState(defaultQty);
  const total = product.price * quantity;

  /* ================= ACTIONS ================= */
  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handlePayNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  /* ================= UI ================= */
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* ===== TOP ===== */}
      <div className="grid md:grid-cols-2 gap-14">
        {/* Imagen */}
        <div className="relative h-[420px] rounded-3xl overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold text-[#000180]">
            {product.title}
          </h1>

          <p className="text-3xl font-bold text-[#45C93E]">
            ${product.price.toLocaleString()}
            <span className="text-base text-gray-500"> / {product.unit}</span>
          </p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Selector */}
          {product.options?.values?.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Cantidad ({product.unit})
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#45C93E]"
              >
                {product.options.values.map((v) => (
                  <option key={v} value={v}>
                    {v} {product.unit}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Total */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">Total estimado</p>
            <p className="text-2xl font-bold text-[#000180]">
              ${total.toLocaleString()}
            </p>
          </div>

          {/* Acciones */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#000180] text-white py-3 rounded-xl font-semibold hover:bg-[#00014d] transition"
            >
              Agregar al carrito
            </button>

            <button
              onClick={handlePayNow}
              className="flex-1 bg-[#45C93E] text-white py-3 rounded-xl font-semibold hover:bg-[#399334] transition"
            >
              Pagar
            </button>
          </div>

          {/* Empresa */}
          {company && (
            <Link
              href={`/company/${company.slug}`}
              className="block p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="text-xs text-gray-500">Vendido por</p>
              <p className="font-semibold">{company.name}</p>
              {company.city && (
                <p className="text-sm text-gray-500">{company.city}</p>
              )}
            </Link>
          )}
        </div>
      </div>

      {/* ===== DETALLES ===== */}
      <div className="mt-20 space-y-16">
        {product.features?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#000180] mb-6">
              Características
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 max-w-4xl">
              {product.features.map((item, i) => (
                <li
                  key={i}
                  className="bg-gray-50 p-4 rounded-xl flex items-center gap-2"
                >
                  ♻️ {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.conditions?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#000180] mb-4">
              Condiciones de venta
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {product.conditions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
