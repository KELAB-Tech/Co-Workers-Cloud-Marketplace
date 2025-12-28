import { create } from "zustand";
import { persist } from "zustand/middleware";

const IVA_RATE = 0.19;

/**
 * FACTORES DE IMPACTO ECO
 * kg CO₂ evitado aprox por unidad
 */
const ECO_IMPACT = {
  kg: 1.8,
  ton: 1800,
  unidad: 0.5,
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      /* ================== STATE ================== */
      items: [],
      ecoCelebration: false, // 🐿️🎉

      /* ================== ACTIONS ================== */
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.id === product.id);

        const unit = product.unit || "unidad";
        const ecoFactor = ECO_IMPACT[unit] || 1;

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id
                ? {
                    ...i,
                    quantity: i.quantity + quantity,
                    ecoImpact: (i.quantity + quantity) * ecoFactor,
                  }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                slug: product.slug,
                title: product.title,
                price: product.price,
                unit,
                image: product.image,
                companyId: product.companyId,
                quantity,
                ecoImpact: quantity * ecoFactor,
              },
            ],
          });
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity,
                  ecoImpact: quantity * (ECO_IMPACT[i.unit] || 1),
                }
              : i
          ),
        });
      },

      removeItem: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      clearCart: () =>
        set({
          items: [],
          ecoCelebration: true, // 🎉 activa celebración
        }),

      resetEco: () => set({ ecoCelebration: false }),

      /* ================== SELECTORS ================== */
      getSubtotal: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),

      getIva: () => get().getSubtotal() * IVA_RATE,

      getTotal: () => get().getSubtotal() + get().getIva(),

      getTotalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      /* ================== ECO ================== */
      getEcoImpact: () =>
        get().items.reduce((acc, i) => acc + (i.ecoImpact || 0), 0),
    }),
    {
      name: "wastestore-cart",
    }
  )
);
