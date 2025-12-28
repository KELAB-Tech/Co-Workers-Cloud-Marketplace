// app/marketplace/components/HeroMarketplace.jsx
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    titulo: "El reciclaje ya no es opcional",
    descripcion:
      "Materiales aprovechables verificados. El futuro exige decisiones ahora.",
    cta: "Explorar materiales",
    bgFrom: "#000120",
    bgTo: "#000180",
    bgGlow: "#45C93E",
    glow: "0 0 25px rgba(69,201,62,0.6)",
    imagen: "/marketplace/hero/reciclaje.jpg",
    eco: true,
  },
  {
    id: 2,
    titulo: "Conectamos residuos con oportunidad",
    descripcion:
      "Transforme desperdicios en valor real. Comercio circular inteligente.",
    cta: "Publicar ahora",
    bgFrom: "#0b3d1c",
    bgTo: "#45C93E",
    bgGlow: "#ffffff",
    glow: "0 0 30px rgba(255,255,255,0.4)",
    imagen: "/marketplace/hero/limpieza.jpg",
  },
  {
    id: 3,
    titulo: "El mercado que observa todo",
    descripcion:
      "Transparencia, trazabilidad y confianza para cada negociación.",
    cta: "Conocer más",
    bgFrom: "#000180",
    bgTo: "#001fb3",
    bgGlow: "#45C93E",
    glow: "0 0 25px rgba(69,201,62,0.5)",
    imagen: "/marketplace/hero/joven-operador-con-auriculares.jpg",
    eco: true,
  },
];

export default function HeroMarketplace() {
  return (
    <section className="mb-14 relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="rounded-3xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[240px] md:h-[320px] flex items-center overflow-hidden"
              style={{
                background: `radial-gradient(circle at top left, ${slide.bgGlow}, ${slide.bgFrom}, ${slide.bgTo})`,
              }}
            >
              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 opacity-[0.07] bg-[url('/noise.png')]" />

              <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
                {/* TEXTO */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white"
                >
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                    {slide.titulo}
                  </h2>

                  <p className="text-white/90 mb-6 max-w-md">
                    {slide.descripcion}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: slide.glow }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-white text-[#000180] px-7 py-3 rounded-xl font-bold"
                  >
                    {slide.cta}
                  </motion.button>
                </motion.div>

                {/* IMAGEN */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="hidden md:flex justify-end relative"
                >
                  <Image
                    src={slide.imagen}
                    alt={slide.titulo}
                    width={320}
                    height={220}
                    className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                    priority={slide.id === 1}
                  />

                  {slide.eco && (
                    <Image
                      src="/marketplace/mascota/eco1.png"
                      alt="ECO observando"
                      width={64}
                      height={64}
                      className="absolute bottom-0 right-40 opacity-80"
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
