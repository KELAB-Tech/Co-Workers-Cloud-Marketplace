"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginacionMarketplace({ totalPages, currentPage }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goTo = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const range = getPageRange(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-1.5 py-8">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 0}
        className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium
                   text-gray-600 hover:border-[#000180] hover:text-[#000180] disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all"
      >
        <ChevronLeft className="w-4 h-4" /> Anterior
      </button>

      {range.map((p, i) =>
        p === "…" ? (
          <span
            key={i}
            className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={i}
            onClick={() => goTo(p)}
            className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all
                        ${
                          p === currentPage
                            ? "bg-[#000180] text-white shadow-md shadow-[#000180]/20"
                            : "bg-white border border-gray-200 text-gray-600 hover:border-[#000180] hover:text-[#000180]"
                        }`}
          >
            {p + 1}
          </button>
        ),
      )}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium
                   text-gray-600 hover:border-[#000180] hover:text-[#000180] disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all"
      >
        Siguiente <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function getPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);
  if (current < 4) return [0, 1, 2, 3, 4, "…", total - 1];
  if (current > total - 5)
    return [0, "…", total - 5, total - 4, total - 3, total - 2, total - 1];
  return [0, "…", current - 1, current, current + 1, "…", total - 1];
}
