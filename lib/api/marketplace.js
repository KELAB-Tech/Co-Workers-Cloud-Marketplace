const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    next: { revalidate: 60 }, // cache 60s en Server Components
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status} en ${path}`);
  }

  return res.json();
}

// ── CATEGORÍAS ──────────────────────────────────────────────
export async function getCategories() {
  return apiFetch("/categories");
}

// ── PRODUCTOS ───────────────────────────────────────────────
export async function getMarketplaceProducts(filters = {}) {
  const params = new URLSearchParams();
  if (filters.name) params.set("name", filters.name);
  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.minPrice) params.set("minPrice", filters.minPrice);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  if (filters.city) params.set("city", filters.city);
  params.set("page", filters.page ?? 0);
  params.set("size", filters.size ?? 16);
  params.set("sortBy", filters.sortBy ?? "createdAt");
  params.set("sortDir", filters.sortDir ?? "desc");
  return apiFetch(`/products/marketplace?${params}`);
}

export async function getFeaturedProducts() {
  return apiFetch("/products/marketplace/featured");
}

export async function getProductsByCategory(categoryId) {
  return apiFetch(`/products/category/${categoryId}`);
}

export async function getProductById(productId) {
  return apiFetch(`/products/${productId}`);
}

export async function getProductImages(productId) {
  return apiFetch(`/products/${productId}/images`);
}

// ── TIENDAS ─────────────────────────────────────────────────
/**
 * @param {Object} filters
 * @param {string} [filters.city]
 * @param {string} [filters.name]
 * @param {string} [filters.actorType]  ← NUEVO
 * @param {number} [filters.page=0]
 * @param {number} [filters.size=12]
 */
export async function getStores(filters = {}) {
  const params = new URLSearchParams();
  if (filters.city) params.set("city", filters.city);
  if (filters.name) params.set("name", filters.name);
  if (filters.actorType) params.set("actorType", filters.actorType);
  params.set("page", filters.page ?? 0);
  params.set("size", filters.size ?? 12);
  params.set("sortBy", "name");
  params.set("sortDir", "asc");
  return apiFetch(`/store?${params}`);
}

export async function getStoreById(storeId) {
  return apiFetch(`/store/${storeId}`);
}

export async function getStoreImages(storeId) {
  return apiFetch(`/store/${storeId}/images`);
}

export async function getStoreProducts(storeId) {
  return apiFetch(`/store/store/${storeId}`);
}

// ── FORMATTERS ──────────────────────────────────────────────
export function formatPrice(price) {
  if (price == null) return "—";

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace(/\s/g, " "); // 👈 normaliza espacios
}

export function formatCount(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return String(n);
}
