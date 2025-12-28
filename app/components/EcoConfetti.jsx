"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function EcoConfetti() {
  useEffect(() => {
    const duration = 1800;
    const end = Date.now() + duration;

    const colors = ["#45C93E", "#000180"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return null;
}
