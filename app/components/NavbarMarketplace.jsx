"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X } from "lucide-react";

import { useCartStore } from "../store/cartStore";
import { useMarketplaceSearch } from "../hooks/useMarketplaceSearch";
import { products } from "../data/products";

export default function NavbarMarketplace() {
  const [openMobile, setOpenMobile] = useState(false);

  const { query, setQuery, results } = useMarketplaceSearch(products);
  const items = useCartStore((s) => s.items);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const closeAll = () => {
    setOpenMobile(false);
    setQuery("");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 py-3 items-center gap-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/co-workers/co-logo.svg"
            alt="Logo"
            width={70}
            height={70}
            priority
            className="-ml-5 -mr-1"
          />
          <span className="text-2xl font-bold text-[#000180]">
            Co-Workers <span className="text-[#45C93E]">Cloud</span>
          </span>
        </Link>

        {/* LINKS */}
        <Link
          href="/categorias"
          className="font-semibold text-gray-700 hover:text-[#000180]"
        >
          Categorías
        </Link>

        <Link
          href="https://kelab.com.co/paginas/inicio"
          target="_blank"
          className="font-semibold text-gray-700 hover:text-[#000180]"
        >
          Administra tu tienda
        </Link>

        {/* SEARCH + CART */}
        <div className="ml-auto flex items-center gap-4 w-full max-w-xl">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cartón, PET, estibas..."
              className="w-full h-10 pl-9 pr-4 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#45C93E]"
            />

            {results.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-xl z-50 overflow-hidden">
                {results.map((r) => (
                  <Link
                    key={r.id}
                    href={r.href}
                    onClick={closeAll}
                    className="block px-4 py-3 hover:bg-gray-50"
                  >
                    <p className="font-semibold">{r.title}</p>
                    <p className="text-xs text-gray-500">{r.category}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CART */}
          <Link href="/checkout" className="relative p-2">
            <ShoppingCart className="w-6 h-6 text-[#000180]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#45C93E] text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden px-4 py-3 flex items-center justify-between">
        <button onClick={() => setOpenMobile(true)}>
          <Menu className="w-6 h-6 text-[#000180]" />
        </button>

        <Link href="/" className="font-bold text-[#000180]">
          Co-Workers <span className="text-[#45C93E]">Cloud</span>
        </Link>

        <Link href="/checkout" className="relative">
          <ShoppingCart className="w-6 h-6 text-[#000180]" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#45C93E] text-white text-xs min-w-[18px] h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* MOBILE DRAWER */}
      {openMobile && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-white border-t shadow-xl">
          <div className="p-4 space-y-4 relative">
            <button onClick={closeAll} className="absolute top-4 right-4">
              <X />
            </button>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar en el marketplace..."
              className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#45C93E]"
            />

            {results.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                {results.map((r) => (
                  <Link
                    key={r.id}
                    href={r.href}
                    onClick={closeAll}
                    className="block px-4 py-3 hover:bg-gray-50"
                  >
                    {r.title}
                  </Link>
                ))}
              </div>
            )}

            <Link
              onClick={closeAll}
              href="/categorias"
              className="block font-semibold"
            >
              Categorías
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
