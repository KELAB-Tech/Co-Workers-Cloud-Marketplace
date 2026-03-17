"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

export default function FiltrosMarketplace({
  categories = [],
  totalElements = 0,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("name") || "");
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || "",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "createdAt",
  );
  const [sortDir, setSortDir] = useState(searchParams.get("sortDir") || "desc");

  const pushParams = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set("name", search);
    if (categoryId) params.set("categoryId", categoryId);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (city) params.set("city", city);
    if (sortBy !== "createdAt") params.set("sortBy", sortBy);
    if (sortDir !== "desc") params.set("sortDir", sortDir);
    params.set("page", "0");
    router.push(`${pathname}?${params.toString()}`);
  }, [
    search,
    categoryId,
    minPrice,
    maxPrice,
    city,
    sortBy,
    sortDir,
    router,
    pathname,
  ]);

  const handleReset = () => {
    setSearch("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setCity("");
    setSortBy("createdAt");
    setSortDir("desc");
    router.push(pathname);
  };

  const activeCount = [search, categoryId, minPrice, maxPrice, city].filter(
    Boolean,
  ).length;

  return (
    <div className="mb-6">
      {/* ── BARRA PRINCIPAL ── */}
      <div className="flex gap-2">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && pushParams()}
            placeholder="Buscar material, producto, tienda…"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm
                       focus:outline-none focus:border-[#45C93E] focus:ring-2 focus:ring-[#45C93E]/20
                       transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtros toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all
                      ${
                        open || activeCount > 0
                          ? "bg-[#000180] text-white border-[#000180]"
                          : "bg-white text-gray-700 border-gray-200 hover:border-[#000180]"
                      }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#45C93E] text-white text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Ordenar */}
        <select
          value={`${sortBy}-${sortDir}`}
          onChange={(e) => {
            const [by, dir] = e.target.value.split("-");
            setSortBy(by);
            setSortDir(dir);
            setTimeout(pushParams, 50);
          }}
          className="hidden md:block px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700
                     focus:outline-none focus:border-[#45C93E] cursor-pointer"
        >
          <option value="createdAt-desc">Más recientes</option>
          <option value="createdAt-asc">Más antiguos</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name-asc">Nombre A-Z</option>
        </select>

        {/* Buscar btn */}
        <button
          onClick={pushParams}
          className="px-5 py-3 bg-[#45C93E] text-white rounded-xl text-sm font-bold hover:bg-[#399334] transition-colors"
        >
          Buscar
        </button>
      </div>

      {/* ── PANEL EXPANDIDO ── */}
      {open && (
        <div className="mt-3 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Categoría */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
              Categoría
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#45C93E] bg-gray-50"
            >
              <option value="">Todas las categorías</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Precio mín */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
              Precio mínimo (COP)
            </label>
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#45C93E] bg-gray-50"
            />
          </div>

          {/* Precio máx */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
              Precio máximo (COP)
            </label>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Sin límite"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#45C93E] bg-gray-50"
            />
          </div>

          {/* Ciudad */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
              Ciudad
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Bogotá, Medellín…"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#45C93E] bg-gray-50"
            />
          </div>

          {/* Acciones */}
          <div className="sm:col-span-2 md:col-span-4 flex gap-3 pt-1 border-t border-gray-100">
            <button
              onClick={pushParams}
              className="px-5 py-2 bg-[#000180] text-white rounded-xl text-sm font-bold hover:bg-[#00014d] transition-colors"
            >
              Aplicar filtros
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      )}

      {/* ── CHIPS ACTIVOS ── */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {search && (
            <Chip
              label={`"${search}"`}
              onRemove={() => {
                setSearch("");
                pushParams();
              }}
            />
          )}
          {categoryId && (
            <Chip
              label={
                categories.find((c) => String(c.id) === categoryId)?.name ||
                "Categoría"
              }
              onRemove={() => {
                setCategoryId("");
                pushParams();
              }}
            />
          )}
          {minPrice && (
            <Chip
              label={`Desde $${Number(minPrice).toLocaleString()}`}
              onRemove={() => {
                setMinPrice("");
                pushParams();
              }}
            />
          )}
          {maxPrice && (
            <Chip
              label={`Hasta $${Number(maxPrice).toLocaleString()}`}
              onRemove={() => {
                setMaxPrice("");
                pushParams();
              }}
            />
          )}
          {city && (
            <Chip
              label={`📍 ${city}`}
              onRemove={() => {
                setCity("");
                pushParams();
              }}
            />
          )}

          <span className="text-xs text-gray-400 self-center ml-1">
            {totalElements} resultado{totalElements !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span className="flex items-center gap-1.5 bg-[#000180]/8 text-[#000180] text-xs font-medium px-3 py-1.5 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-red-500 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
