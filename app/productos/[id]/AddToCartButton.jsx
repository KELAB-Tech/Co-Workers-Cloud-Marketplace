"use client";

import { useState } from "react";
import { ShoppingCart, MessageCircle, Check } from "lucide-react";
import { useCartStore } from "@/app/store/cartStore";

export default function AddToCartButton({ product, disabled }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    // adaptar el producto del backend al formato del cartStore
    addItem(
      {
        id: product.id,
        slug: String(product.id),
        title: product.name,
        price: product.price,
        unit: "unidad",
        image: product.mainImageUrl,
        companyId: product.storeId,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="space-y-3">
      {/* qty selector */}
      {!disabled && (
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-gray-600">
            Cantidad:
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-gray-500 hover:bg-gray-50 text-lg font-bold transition-colors"
            >
              −
            </button>
            <span className="px-4 py-2 text-sm font-bold text-gray-900 min-w-[3rem] text-center border-x border-gray-200">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              className="px-3 py-2 text-gray-500 hover:bg-gray-50 text-lg font-bold transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-xs text-gray-400">máx. {product.stock}</span>
        </div>
      )}

      {/* botones */}
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          disabled={disabled}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm
                      transition-all duration-200 active:scale-95
                      ${
                        disabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : added
                            ? "bg-[#45C93E] text-white shadow-lg shadow-[#45C93E]/30"
                            : "bg-[#000180] text-white hover:bg-[#00014d] shadow-lg shadow-[#000180]/20 hover:shadow-xl"
                      }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" /> ¡Agregado al carrito!
            </>
          ) : disabled ? (
            "Sin stock disponible"
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Agregar al carrito
            </>
          )}
        </button>

        <button
          className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm
                     border-2 border-[#45C93E] text-[#45C93E] hover:bg-[#45C93E] hover:text-white
                     transition-all duration-200 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          Contactar
        </button>
      </div>
    </div>
  );
}
