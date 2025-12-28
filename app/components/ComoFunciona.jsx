import { Upload, Search, Handshake } from "lucide-react";

const steps = [
  {
    title: "Publica",
    desc: "Las empresas suben sus productos o servicios.",
    icon: Upload,
  },
  {
    title: "Conecta",
    desc: "Compradores encuentran soluciones sostenibles.",
    icon: Search,
  },
  {
    title: "Cierra negocios",
    desc: "Contacto directo entre empresas.",
    icon: Handshake,
  },
];

export default function ComoFunciona() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#000180] mb-14">
          ¿Cómo funciona?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={i} className="p-8 rounded-3xl bg-gray-50">
              <step.icon className="w-10 h-10 text-[#45C93E] mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
