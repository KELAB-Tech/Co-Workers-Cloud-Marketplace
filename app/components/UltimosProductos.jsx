import Link from "next/link";
import { products } from "../data/products";

export default function UltimosProductos() {
  const latest = products.slice(-4);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-[#000180] mb-10">
          Últimos productos agregados
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {latest.map((p) => (
            <Link
              key={p.id}
              href={`/productos/${p.slug}`}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-[#45C93E] font-bold">${p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
