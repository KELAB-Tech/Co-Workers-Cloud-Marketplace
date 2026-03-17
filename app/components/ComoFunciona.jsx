// ─── ComoFunciona.jsx ───────────────────────────────────────
import { Upload, Search, Handshake, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Publica tu material",
    desc: "Las empresas registran sus productos: PET, cartón, metal, estibas, servicios de transporte y más.",
    icon: Upload,
    color: "bg-[#000180]",
  },
  {
    step: "02",
    title: "Compradores conectan",
    desc: "Recicladores, transformadores y gestores encuentran exactamente lo que necesitan con filtros avanzados.",
    icon: Search,
    color: "bg-[#45C93E]",
  },
  {
    step: "03",
    title: "Cierra el negocio",
    desc: "Contacto directo entre empresas. Trazabilidad completa y datos reales para cada transacción.",
    icon: Handshake,
    color: "bg-[#000180]",
  },
];

export default function ComoFunciona() {
  return (
    <section className="py-14" id="como-funciona">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#45C93E] mb-2 block">
          ¿Cómo funciona?
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#000180]">
          Simple, directo y transparente
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative">
        {/* línea conectora desktop */}
        <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-[#000180]/20 via-[#45C93E]/40 to-[#000180]/20" />

        {steps.map((s, i) => (
          <div
            key={i}
            className="relative bg-white rounded-3xl p-7 border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div
              className={`w-12 h-12 ${s.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}
            >
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-4xl font-extrabold text-gray-100 absolute top-6 right-6">
              {s.step}
            </span>
            <h3 className="font-bold text-[#000180] mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Beneficios.jsx ─────────────────────────────────────────
import {
  ShieldCheck,
  Recycle,
  Zap,
  BarChart2,
  Leaf,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Empresas verificadas",
    desc: "Solo actores aprobados por el equipo Kelab.",
  },
  {
    icon: Recycle,
    title: "Economía circular",
    desc: "Cada transacción reduce el impacto ambiental.",
  },
  {
    icon: Zap,
    title: "Contacto directo",
    desc: "Sin intermediarios. B2B real y transparente.",
  },
  {
    icon: BarChart2,
    title: "Datos y trazabilidad",
    desc: "Historial completo de cada material comerciado.",
  },
  {
    icon: Leaf,
    title: "Impacto ambiental",
    desc: "Métricas de CO₂ evitado por cada operación.",
  },
  {
    icon: Users,
    title: "Red de actores",
    desc: "Recicladores, transformadores, transportadores.",
  },
];

export function Beneficios() {
  return (
    <section className="bg-[#000180] rounded-3xl p-8 md:p-12 mb-10">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#45C93E] mb-2 block">
          Por qué Waste Store
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          La plataforma que el sector necesitaba
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/12 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[#45C93E]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <b.icon className="w-4 h-4 text-[#45C93E]" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{b.title}</p>
              <p className="text-white/50 text-xs leading-relaxed mt-0.5">
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
