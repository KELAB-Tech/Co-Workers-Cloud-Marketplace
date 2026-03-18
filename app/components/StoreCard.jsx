"use client";

import Link from "next/link";
import { MapPin, Phone, CheckCircle } from "lucide-react";

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function StoreCard({ store, config }) {
  return (
    <Link
      href={`/tienda/${store.id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden
                 hover:border-[#45C93E]/40 hover:shadow-lg transition-all"
    >
      {/* Banner */}
      <div className="h-20 bg-gradient-to-br from-[#000180] to-[#45C93E] relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="px-5 pb-5">
        {/* Logo */}
        <div className="mt-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white
                          shadow-md bg-white flex items-center justify-center"
          >
            {store.logoUrl ? (
              <img
                src={store.logoUrl}
                alt={store.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling?.removeAttribute("style");
                }}
              />
            ) : null}
            <span
              className="text-[#45C93E] font-bold text-sm"
              style={store.logoUrl ? { display: "none" } : {}}
            >
              {getInitials(store.name)}
            </span>
          </div>
        </div>

        {/* Nombre */}
        <div className="flex items-center gap-1 mb-1">
          <h3
            className="font-bold text-sm text-[#000180]
                         group-hover:text-[#45C93E] transition-colors truncate"
          >
            {store.name}
          </h3>
          <CheckCircle className="w-3.5 h-3.5 text-[#45C93E] shrink-0" />
        </div>

        {store.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {store.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-col gap-1">
          {store.city && (
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <MapPin className="w-2.5 h-2.5" />
              {store.city}
              {store.address ? ` · ${store.address}` : ""}
            </span>
          )}
          {store.phone && (
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <Phone className="w-2.5 h-2.5" /> {store.phone}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                            border ${config.bg} ${config.color}`}
          >
            {config.icon} {config.label}
          </span>
          <span className="text-[10px] text-[#45C93E] font-semibold">
            Ver tienda →
          </span>
        </div>
      </div>
    </Link>
  );
}
