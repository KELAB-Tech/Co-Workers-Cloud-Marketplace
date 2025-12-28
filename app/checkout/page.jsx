"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/cartStore";

const IVA_RATE = 0.19;

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const iva = subtotal * IVA_RATE;
  const shipping = 0; // listo para futuro
  const total = subtotal + iva + shipping;

  /* ================= EMPTY STATE ================= */
  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-extrabold text-[#000180] mb-4">
          Tu carrito está vacío
        </h1>
        <Link href="/" className="text-[#45C93E] font-semibold hover:underline">
          ← Volver al marketplace
        </Link>
      </section>
    );
  }

  /* ================= PAGE ================= */
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-extrabold text-[#000180] mb-12">
        Carrito de compra
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* ================== CARRITO ================== */}
        <div className="lg:col-span-2 space-y-10">
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-6 py-4">Producto</th>
                  <th className="text-center px-6 py-4">Precio</th>
                  <th className="text-center px-6 py-4">Cantidad</th>
                  <th className="text-center px-6 py-4">IVA</th>
                  <th className="text-right px-6 py-4">Total</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => {
                  const itemSubtotal = item.price * item.quantity;
                  const itemIva = itemSubtotal * IVA_RATE;
                  const itemTotal = itemSubtotal + itemIva;

                  return (
                    <tr key={item.id} className="border-t">
                      <td className="px-6 py-4 font-medium">
                        {item.title}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="block text-xs text-red-500 hover:underline mt-1"
                        >
                          Quitar
                        </button>
                      </td>

                      <td className="text-center px-6 py-4">
                        ${item.price.toLocaleString()}
                      </td>

                      <td className="text-center px-6 py-4">
                        {item.quantity} {item.unit}
                      </td>

                      <td className="text-center px-6 py-4">
                        ${itemIva.toLocaleString()}
                      </td>

                      <td className="text-right px-6 py-4 font-semibold">
                        ${itemTotal.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Link
            href="/marketplace"
            className="inline-block text-[#45C93E] font-semibold hover:underline"
          >
            ← Seguir comprando
          </Link>

          {/* ================== DATOS DE ENVÍO ================== */}
          <div className="bg-gray-50 p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-[#000180] mb-6">
              Datos de envío
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <input className="input" placeholder="Ciudad" />
              <input className="input" placeholder="Nombre completo" />
              <input className="input" placeholder="Email" />
              <input className="input" placeholder="Teléfono" />
              <input className="input sm:col-span-2" placeholder="Dirección" />
            </div>
          </div>
        </div>

        {/* ================== RESUMEN ================== */}
        <div className="bg-gray-50 p-8 rounded-3xl h-fit">
          <h2 className="text-xl font-bold text-[#000180] mb-6">Resumen</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (19%)</span>
              <span>${iva.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>${shipping.toLocaleString()}</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-base">
              <span>Total orden</span>
              <span className="text-[#45C93E]">${total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => {
              clearCart();
              router.push("/checkout/success");
            }}
            className="w-full mt-8 bg-[#45C93E] text-white py-3 rounded-xl font-semibold hover:bg-[#399334] transition"
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </section>
  );
}
