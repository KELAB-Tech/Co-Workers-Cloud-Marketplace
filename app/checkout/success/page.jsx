"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import EcoConfetti from "../../components/EcoConfetti";
import { useEcoSound } from "@/app/hooks/useEcoSound";
import { useCartStore } from "@/app/store/cartStore";

export default function CheckoutSuccessPage() {
  const ecoImpact = useCartStore((s) => s.getEcoImpact());
  const resetEco = useCartStore((s) => s.resetEco);

  const [celebrate, setCelebrate] = useState(false);

  const orderId = `WS-${Math.floor(100000 + Math.random() * 900000)}`;

  useEcoSound(celebrate);

  useEffect(() => {
    setCelebrate(true);

    return () => {
      resetEco(); // 🧹 limpia estado ECO al salir
    };
  }, [resetEco]);

  return (
    <section className="relative max-w-3xl mx-auto px-6 py-32 text-center overflow-hidden">
      {celebrate && <EcoConfetti />}

      {/* ECO */}
      <Image
        src="/marketplace/mascota/eco-celebracion.png"
        alt="ECO celebrando"
        width={180}
        height={180}
        className="mx-auto mb-8"
        priority
      />

      <h1 className="text-4xl font-extrabold text-[#000180] mb-4">
        ¡Pedido confirmado!
      </h1>

      <p className="text-gray-600 mb-4">
        Gracias por comprar de forma responsable 💚
      </p>

      <p className="text-lg font-bold text-[#45C93E] mb-8">
        🌍 Impacto generado: {ecoImpact.toFixed(1)} kg de CO₂ evitado
      </p>

      <div className="bg-gray-50 rounded-2xl p-6 mb-10 inline-block">
        <p className="text-sm text-gray-500">Número de orden</p>
        <p className="text-2xl font-bold text-[#000180]">{orderId}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/"
          className="bg-[#45C93E] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#399334]"
        >
          Seguir reciclando ♻️
        </Link>

        <Link
          href="/"
          className="border border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100"
        >
          Ir al inicio
        </Link>
      </div>
    </section>
  );
}
