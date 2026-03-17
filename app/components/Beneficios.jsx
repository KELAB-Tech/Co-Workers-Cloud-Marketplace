import { ShieldCheck, Recycle, Zap, BarChart } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Empresas verificadas",
    desc: "Solo trabajamos con organizaciones validadas para garantizar confianza y seguridad.",
  },
  {
    icon: Recycle,
    title: "Economía circular",
    desc: "Impulsa la reutilización de recursos y reduce el desperdicio industrial.",
  },
  {
    icon: Zap,
    title: "Contacto directo",
    desc: "Conecta sin intermediarios y acelera tus procesos comerciales.",
  },
  {
    icon: BarChart,
    title: "Datos y trazabilidad",
    desc: "Monitorea el impacto y toma decisiones basadas en información real.",
  },
];

export default function Beneficios() {
  return (
    <section className="w-full py-24 bg-[#000180] text-white relative overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#45C93E]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      {/* CONTENIDO FULL WIDTH */}
      <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">
            ¿Por qué elegir nuestra plataforma?
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            Diseñada para empresas que buscan eficiencia, transparencia y
            sostenibilidad en un solo lugar.
          </p>
        </div>

        {/* Grid FULL WIDTH */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group w-full bg-white/5 backdrop-blur-md border border-white/10 
                         rounded-2xl p-6 text-center transition-all duration-300
                         hover:bg-white/10 hover:border-[#45C93E]/40 hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 mx-auto mb-4 flex items-center justify-center 
                              rounded-xl bg-[#45C93E]/10 group-hover:bg-[#45C93E]/20 
                              transition-colors"
              >
                <b.icon className="w-6 h-6 text-[#45C93E]" />
              </div>

              {/* Title */}
              <h3 className="font-medium text-sm mb-2">{b.title}</h3>

              {/* Description */}
              <p className="text-xs text-gray-300 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
