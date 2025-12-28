export const products = [
  {
    id: 1,
    slug: "carton-sencillo",
    title: "Cartón sencillo",
    price: 410,
    unit: "kg",
    companyId: 1,
    category: "carton",
    image: "/marketplace/categorias-gri/cartones/carton-sencillo.jpeg",
    description:
      "Venta de cartón sencillo por kilos, disponible en la ciudad de Mosquera. Excelente calidad para procesos de reciclaje.",
    options: { type: "weight", values: [1, 5, 10, 20, 50] },
    features: [
      "Material 100% reciclable",
      "Cartón limpio y clasificado",
      "Alta demanda industrial",
      "Disponible para recolección",
    ],
    conditions: [
      "Precio por kilogramo",
      "Compra mínima: 1 kg",
      "Entrega coordinada con el proveedor",
    ],
  },

  {
    id: 2,
    slug: "plegadiza",
    title: "Plegadiza",
    price: 250,
    unit: "kg",
    companyId: 1,
    category: "carton",
    image: "/marketplace/categorias-gri/cartones/plegadiza.png",
    description:
      "Cartón plegadizo ideal para reciclaje liviano y procesos industriales.",
    options: { type: "weight", values: [5, 10, 20] },
    features: ["Fácil compactación", "Cartón liviano", "Uso industrial"],
  },

  {
    id: 3,
    slug: "transporte-de-gri",
    title: "Transporte de GRI",
    price: 250,
    unit: "servicio",
    companyId: 1,
    category: "transporte",
    image: "/marketplace/categorias-gri/transporte.png",
    description:
      "Servicio de transporte especializado para materiales reciclables.",
    options: null,
    features: [
      "Cobertura urbana",
      "Coordinación directa",
      "Servicio confiable",
    ],
  },

  {
    id: 4,
    slug: "vinipel-bolsas",
    title: "Vinipel, Bolsas",
    price: 500,
    unit: "kg",
    companyId: 1,
    category: "plastico-varios",
    image: "/marketplace/categorias-gri/plasticos-varios/bolsas.png",
    description:
      "Bolsas de vinipel limpias y clasificadas, listas para reciclaje.",
    options: { type: "weight", values: [5, 10, 25, 50] },
    features: [
      "Plástico flexible",
      "Alta reutilización",
      "Ideal para reciclaje",
    ],
  },

  {
    id: 5,
    slug: "zunchos",
    title: "Zunchos",
    price: 70,
    unit: "kg",
    companyId: 1,
    category: "plastico-varios",
    image: "/marketplace/categorias-gri/plasticos-varios/zunchos.png",
    description: "Zunchos plásticos industriales para reciclaje.",
    options: { type: "weight", values: [5, 10, 20] },
    features: ["Plástico resistente", "Uso industrial", "Alta durabilidad"],
  },

  {
    id: 6,
    slug: "nevera-de-icopor",
    title: "Nevera de Icopor",
    price: 280,
    unit: "unidad",
    companyId: 1,
    category: "icopor",
    image: "/marketplace/categorias-gri/icopor/icopor.jpeg",
    description:
      "Neveras de icopor reutilizables, ideales para procesos de reciclaje.",
    options: null,
    features: ["Material liviano", "Reutilizable", "Aislante térmico"],
  },

  {
    id: 7,
    slug: "estibas-plasticas",
    title: "Estibas plásticas",
    price: 12,
    unit: "unidad",
    companyId: 1,
    category: "estibas",
    image: "/marketplace/categorias-gri/estibas/estibas-plasticas.png",
    description:
      "Estibas plásticas resistentes para logística y almacenamiento.",
    options: null,
    features: ["Alta resistencia", "Reutilizable", "Uso industrial"],
  },

  {
    id: 8,
    slug: "estibas-de-madera",
    title: "Estibas de madera",
    price: 12,
    unit: "unidad",
    companyId: 1,
    category: "estibas",
    image: "/marketplace/categorias-gri/estibas/estibas-madera.png",
    description:
      "Estibas de madera reutilizables para transporte y almacenamiento.",
    options: null,
    features: ["Material natural", "Fácil reparación", "Uso logístico"],
  },

  {
    id: 9,
    slug: "pet",
    title: "PET",
    price: 500,
    unit: "kg",
    companyId: 1,
    category: "pet",
    image: "/marketplace/categorias-gri/pet/pet.png",
    description: "Plástico PET limpio y clasificado para reciclaje.",
    options: { type: "weight", values: [5, 10, 25, 50] },
    features: ["Alta demanda", "Plástico reciclable", "Uso industrial"],
  },

  {
    id: 10,
    slug: "plasticos-varios-dp",
    title: "Plásticos Varios",
    price: 500,
    unit: "kg",
    companyId: 2,
    category: "plastico-varios", // ✅ FIX
    image: "/marketplace/pet.jpg",
    description: "Mezcla de plásticos varios para procesos de reciclaje.",
    options: { type: "weight", values: [10, 25, 50] },
    features: ["Material mixto", "Clasificación básica", "Uso industrial"],
  },

  {
    id: 11,
    slug: "pet-soluciones",
    title: "Plástico PET",
    price: 500,
    unit: "kg",
    companyId: 3,
    category: "pet", // ✅ FIX
    image: "/marketplace/pet.jpg",
    description: "PET de alta calidad listo para procesos de reciclaje.",
    options: { type: "weight", values: [5, 10, 25, 50] },
    features: ["Alta pureza", "Excelente compactación", "Alta demanda"],
  },
];
