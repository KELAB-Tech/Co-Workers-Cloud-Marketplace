import HeroMarketplace from "./components/HeroMarketplace";
import OfertasDelDia from "./components/OfertasDelDia";
import CategoriasDestacadas from "./components/CategoríasDestacadas";
import TiendasDestacadas from "./components/TiendasDestacadas";
import ExplorarCategorias from "./components/ExplorarCategorias";
import ComoFunciona from "./components/ComoFunciona";
import Beneficios from "./components/Beneficios";
import UltimosProductos from "./components/UltimosProductos";

// ===================== META SEO NIVEL DIOS =====================
export const metadata = {
  title: "Marketplace | Waste Store – R&R Kelab S.A.S",
  description:
    "Marketplace digital para la comercialización segura de materiales aprovechables, maquinaria y servicios en Colombia. Descubra cómo funcionará Waste Store y su contribución a la economía circular.",
  keywords: [
    "marketplace residuos",
    "reciclaje digital",
    "materiales aprovechables",
    "economía circular",
    "Waste Store",
    "Colombia",
    "comercialización residuos",
    "plataforma residuos",
    "trazabilidad residuos",
  ],
  authors: [{ name: "R&R Kelab S.A.S" }],
  robots: "index, follow",
  openGraph: {
    title: "Marketplace Waste Store | R&R Kelab S.A.S",
    description:
      "Comercialice y adquiera materiales aprovechables de forma segura y ágil en el marketplace de Waste Store, impulsando la sostenibilidad y economía circular.",
    url: "https://kelab.com.co/marketplace",
    type: "website",
    images: [
      {
        url: "https://kelab.com.co/preview-marketplace.jpg",
        width: 1200,
        height: 630,
        alt: "Marketplace Waste Store - R&R Kelab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketplace Waste Store",
    description:
      "Descubra el marketplace digital de Waste Store para materiales aprovechables, servicios y maquinaria en Colombia.",
    images: ["https://kelab.com.co/preview-marketplace.jpg"],
  },
  alternates: {
    canonical: "https://kelab.com.co/marketplace",
  },
  category: "Marketplace, Gestión de Residuos, Economía Circular",
  publisher: "R&R Kelab S.A.S",
};

export default function MarketplacePage() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <HeroMarketplace />
        <OfertasDelDia />
        <CategoriasDestacadas />
        <TiendasDestacadas />
        <ExplorarCategorias />
        <ComoFunciona />
        <Beneficios />
        <UltimosProductos />
      </div>
    </main>
  );
}
