"use client";

import { useState, useEffect, useMemo } from "react";
import { categories } from "../data/categories";

export function useMarketplaceSearch(products = []) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Mapa de categorías → nombre
  const categoryMap = useMemo(() => {
    return categories.reduce((acc, c) => {
      acc[c.slug] = c.name;
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();

    if (q.length < 2) {
      setResults([]);
      return;
    }

    const filtered = products
      .map((product) => {
        const categoryName = categoryMap[product.category] || "";

        const searchableText = `
          ${product.title}
          ${product.description}
          ${categoryName}
        `.toLowerCase();

        if (!searchableText.includes(q)) return null;

        return {
          id: product.id,
          title: product.title,
          category: categoryName,
          image: product.image,
          price: product.price,
          unit: product.unit,
          href: `/productos/${product.slug}`, // ✅ RUTA REAL
        };
      })
      .filter(Boolean)
      .slice(0, 8);

    setResults(filtered);
  }, [query, products, categoryMap]);

  return {
    query,
    setQuery,
    results,
  };
}
