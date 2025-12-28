import { ShieldCheck, Recycle, Zap, BarChart } from "lucide-react";

const benefits = [
  { icon: ShieldCheck, text: "Empresas verificadas" },
  { icon: Recycle, text: "Economía circular" },
  { icon: Zap, text: "Contacto directo" },
  { icon: BarChart, text: "Datos y trazabilidad" },
];

export default function Beneficios() {
  return (
    <section className="py-20 bg-[#000180] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {benefits.map((b, i) => (
            <div key={i}>
              <b.icon className="w-8 h-8 mx-auto mb-4 text-[#45C93E]" />
              <p className="font-medium">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
