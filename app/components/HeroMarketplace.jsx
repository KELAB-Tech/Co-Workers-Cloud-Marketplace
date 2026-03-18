"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Recycle, TrendingUp, Shield } from "lucide-react";
import { getFeaturedProducts, formatPrice } from "@/lib/api/marketplace";

const STATIC_SLIDES = [
  {
    tag: "Economía Circular",
    title: "El reciclaje ya no\nes opcional",
    sub: "Materiales aprovechables verificados. Conectamos recicladores, transformadores y transportadores en una sola plataforma.",
    cta: "Explorar materiales",
    href: "/categorias",
    bg: "from-[#000120] via-[#000180] to-[#001fb3]",
    accent: "#45C93E",
    icon: Recycle,
  },
  {
    tag: "Waste Store",
    title: "Residuos convertidos\nen valor real",
    sub: "Comercio circular inteligente. Transparencia, trazabilidad y confianza para cada negociación entre empresas.",
    cta: "Ver tiendas",
    href: "/actores",
    bg: "from-[#0b3d1c] via-[#166534] to-[#15803d]",
    accent: "#ffffff",
    icon: TrendingUp,
  },
  {
    tag: "Empresas verificadas",
    title: "Plataforma segura\npara tu negocio",
    sub: "Solo empresas aprobadas. Datos reales, precios transparentes y contacto directo entre actores de la cadena.",
    cta: "Conocer más",
    href: "#como-funciona",
    bg: "from-[#000180] via-[#0000b3] to-[#000180]",
    accent: "#45C93E",
    icon: Shield,
  },
];

export default function HeroMarketplace() {
  const [current, setCurrent] = useState(0);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getFeaturedProducts()
      .then(setFeatured)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % STATIC_SLIDES.length),
      5500,
    );
    return () => clearInterval(t);
  }, []);

  const slide = STATIC_SLIDES[current];
  const Icon = slide.icon;

  return (
    <section className="mb-10">
      {/* ── HERO SLIDER ── */}
      <div
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-700`}
      >
        {/* noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* glow */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 transition-colors duration-700"
          style={{ background: slide.accent }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          {/* texto */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border"
                style={{
                  borderColor: `${slide.accent}60`,
                  color: slide.accent,
                  background: `${slide.accent}15`,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {slide.tag}
              </span>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5 whitespace-pre-line">
                {slide.title}
              </h1>

              <p className="text-white/75 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                {slide.sub}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={slide.href}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: slide.accent,
                    color: slide.accent === "#ffffff" ? "#000180" : "#000",
                  }}
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
                >
                  Ver todo
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* featured mini-cards */}
          <div className="hidden md:flex flex-col gap-3">
            {featured.slice(0, 3).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/productos/${p.id}`}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-3 hover:bg-white/20 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                    {p.mainImageUrl ? (
                      <Image
                        src={p.mainImageUrl}
                        alt={p.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        {p.categoryIcon || "♻️"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">
                      {p.name}
                    </p>
                    <p className="text-white/60 text-xs truncate">
                      {p.storeName}
                    </p>
                  </div>
                  <div className="text-right min-w-0">
                    <p className="text-[#45C93E] font-medium text-sm leading-tight break-words">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
            {featured.length === 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-white/40 text-sm">
                Cargando destacados...
              </div>
            )}
          </div>
        </div>

        {/* dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {STATIC_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 h-2 bg-[#45C93E]" : "w-2 h-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="mt-4 grid grid-cols-3 divide-x divide-gray-200 bg-white rounded-2xl border border-gray-100 shadow-sm">
        {[
          { label: "Materiales activos", value: "10+" },
          { label: "Categorías", value: "10" },
          { label: "Empresas verificadas", value: "✓" },
        ].map((s, i) => (
          <div key={i} className="py-4 px-6 text-center">
            <p className="text-xl font-extrabold text-[#000180]">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
