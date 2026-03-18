"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, X, Loader2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { formatPrice } from "@/lib/api/marketplace";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend-co-workers-cloud.onrender.com/api";

export default function NavbarMarketplace() {
  const router = useRouter();
  const [openMobile, setOpenMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef(null);
  const items = useCartStore((s) => s.items);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  // Búsqueda debounced al backend
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `${API_URL}/products/marketplace?name=${encodeURIComponent(query)}&size=5&page=0`,
        );
        const data = await res.json();
        setResults(data.content ?? []);
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowDropdown(false);
    router.push(`/marketplace?name=${encodeURIComponent(query.trim())}`);
  };

  const closeAll = () => {
    setOpenMobile(false);
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 py-2 items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/co-workers/co-logo.svg"
            alt="Logo"
            width={60}
            height={60}
            priority
          />
          <span className="text-xl font-bold text-[#000180]">
            Co-Workers <span className="text-[#45C93E]">Cloud</span>
          </span>
        </Link>

        {/* Links */}
        <Link
          href="/categorias"
          className="font-semibold text-sm text-gray-700 hover:text-[#000180] transition-colors whitespace-nowrap"
        >
          Categorías
        </Link>
        <Link
          href="/actores"
          className="font-semibold text-sm text-gray-700 hover:text-[#000180] transition-colors whitespace-nowrap"
        >
          Empresas
        </Link>

        {/* Search + Cart */}
        <div className="ml-auto flex items-center gap-3 w-full max-w-xl">
          {/* Buscador */}
          <form onSubmit={handleSearch} className="relative flex-1">
            {searching ? (
              <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            )}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="Buscar cartón, PET, aluminio..."
              className="w-full h-10 pl-9 pr-4 text-sm rounded-xl border border-gray-200
                         focus:ring-2 focus:ring-[#45C93E] focus:border-[#45C93E]
                         outline-none transition-all"
            />

            {/* Dropdown resultados */}
            {showDropdown && results.length > 0 && (
              <div
                className="absolute top-full mt-2 w-full bg-white border border-gray-100
                              rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                {results.map((r) => (
                  <Link
                    key={r.id}
                    href={`/productos/${r.id}`}
                    onClick={closeAll}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      {r.mainImageUrl ? (
                        <img
                          src={r.mainImageUrl}
                          alt={r.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">
                          {r.categoryIcon || "📦"}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 truncate">
                        {r.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {r.storeName}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-[#45C93E] shrink-0">
                      {formatPrice(r.price)}
                    </p>
                  </Link>
                ))}
                <div className="border-t border-gray-100">
                  <button
                    onMouseDown={handleSearch}
                    className="w-full px-4 py-2.5 text-xs font-semibold text-[#000180]
                               hover:bg-gray-50 text-left transition-colors"
                  >
                    Ver todos los resultados para "{query}" →
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Carrito */}
          <Link href="/checkout" className="relative p-2 group">
            <ShoppingCart className="w-6 h-6 text-[#000180] group-hover:text-[#45C93E] transition-colors" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-[#45C93E] text-white text-xs
                               min-w-[20px] h-5 rounded-full flex items-center justify-center
                               font-bold"
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden px-4 py-3 flex items-center justify-between">
        <button onClick={() => setOpenMobile(true)}>
          <Menu className="w-6 h-6 text-[#000180]" />
        </button>
        <Link href="/marketplace" className="font-bold text-[#000180]">
          Co-Workers <span className="text-[#45C93E]">Cloud</span>
        </Link>
        <Link href="/checkout" className="relative">
          <ShoppingCart className="w-6 h-6 text-[#000180]" />
          {totalItems > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-[#45C93E] text-white text-xs
                             min-w-[18px] h-4 rounded-full flex items-center justify-center"
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile drawer */}
      {openMobile && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-white border-t shadow-xl z-40">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Menú</span>
              <button onClick={closeAll}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                handleSearch(e);
                closeAll();
              }}
              className="flex gap-2"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en el marketplace..."
                className="flex-1 h-11 px-4 rounded-xl border border-gray-200 text-sm
                           focus:ring-2 focus:ring-[#45C93E] outline-none"
              />
              <button
                type="submit"
                className="px-4 bg-[#45C93E] text-white rounded-xl text-sm font-bold"
              >
                Buscar
              </button>
            </form>

            <nav className="flex flex-col gap-3">
              <Link
                onClick={closeAll}
                href="/marketplace/categorias"
                className="font-semibold text-gray-700 hover:text-[#000180]"
              >
                Categorías
              </Link>
              <Link
                onClick={closeAll}
                href="/marketplace/actores"
                className="font-semibold text-gray-700 hover:text-[#000180]"
              >
                Empresas
              </Link>
              <Link
                onClick={closeAll}
                href="/checkout"
                className="font-semibold text-gray-700 hover:text-[#000180]"
              >
                Carrito {totalItems > 0 && `(${totalItems})`}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
