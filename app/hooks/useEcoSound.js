"use client";

import { useEffect } from "react";

export function useEcoSound(play) {
  useEffect(() => {
    if (!play) return;

    const audio = new Audio("/marketplace/sounds/eco-success.mp3");
    audio.volume = 0.6;
    audio.play().catch(() => {});
  }, [play]);
}
