import { Recycle, Wrench, Factory, Truck } from "lucide-react";

const categorias = [
  { title: "Asociaciones de Reciclaje", icon: Recycle },
  { title: "Gestores Ambientales", icon: Wrench },
  { title: "Transformadores", icon: Factory },
  { title: "Empresas Transportadoras", icon: Truck },
];

export default function ExplorarCategorias() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-[#000180] mb-10 text-center">
          Explorar por categorías
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {categorias.map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-10 text-center shadow-sm hover:shadow-xl transition"
            >
              <cat.icon className="w-10 h-10 text-[#45C93E] mx-auto mb-4" />
              <h3 className="font-semibold text-lg">{cat.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
