import type { Category, Product } from "./types";

export const categories: Category[] = [
  {
    id: "gartenmoebel",
    name: "Gartenmöbel",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  },
  {
    id: "indoor",
    name: "Indoor Möbel",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
  },
  {
    id: "deko",
    name: "Deko & Accessoires",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
  },
  {
    id: "pflanzen",
    name: "Pflanzen & Töpfe",
    img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
  },
];

export const products: Product[] = [
  {
    id: 1,
    slug: "teak-loungeset-oslo",
    name: "Teak Loungeset Oslo",
    price: 1899,
    oldPrice: 2299,
    category: "gartenmoebel",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    rating: 4.8,
    reviews: 142,
    badge: "Bestseller",
    desc: "Handgefertigtes Loungeset aus massivem Teakholz. Wetterfest, langlebig und zeitlos elegant.",
    stock: 8,
    lowStockThreshold: 5,
    variants: [
      {
        type: "finish",
        options: [
          { label: "Natur", value: "natur", hex: "#c8a96a", available: true },
          { label: "Geölt", value: "geölt", hex: "#8b6234", available: true },
          { label: "Grau", value: "grau", hex: "#6b7280", available: false },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "eichen-esstisch-bjork",
    name: "Eichen Esstisch Björk",
    price: 1249,
    category: "indoor",
    img: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800",
    rating: 4.9,
    reviews: 87,
    badge: "Neu",
    desc: "Massiver Esstisch aus europäischer Eiche, geölt und FSC-zertifiziert.",
    stock: 12,
    lowStockThreshold: 3,
    variants: [
      {
        type: "material",
        options: [
          { label: "Eiche geölt", value: "eiche-geölt", available: true },
          { label: "Eiche gewachst", value: "eiche-gewachst", available: true },
          { label: "Eiche schwarz", value: "eiche-schwarz", available: true },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "rattan-sessel-mira",
    name: "Rattan Sessel Mira",
    price: 549,
    category: "gartenmoebel",
    img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
    rating: 4.7,
    reviews: 64,
    desc: "Geflochtener Sessel mit weichem Leinenkissen für Terrasse und Wohnzimmer.",
    stock: 3,
    lowStockThreshold: 3,
    variants: [
      {
        type: "color",
        options: [
          { label: "Leinen Natur", value: "leinen-natur", hex: "#d4c5a0", available: true },
          { label: "Salbei", value: "salbei", hex: "#7d9b76", available: true },
          { label: "Sandbeige", value: "sandbeige", hex: "#c2aa83", available: false },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "terracotta-pflanztopf",
    name: "Terracotta Pflanztopf XL",
    price: 89,
    category: "pflanzen",
    img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    rating: 4.6,
    reviews: 38,
    desc: "Handgetöpferter Terracotta-Topf, frostfest und atmungsaktiv.",
    stock: 25,
    lowStockThreshold: 5,
    variants: [
      {
        type: "size",
        options: [
          { label: "S (20cm)", value: "s", available: true, priceModifier: -30 },
          { label: "M (30cm)", value: "m", available: true },
          { label: "L (40cm)", value: "l", available: true, priceModifier: 20 },
          { label: "XL (50cm)", value: "xl", available: true, priceModifier: 40 },
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "leinen-sofa-nord",
    name: "Leinen Sofa Nord",
    price: 2199,
    oldPrice: 2599,
    category: "indoor",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    rating: 4.9,
    reviews: 213,
    badge: "Sale",
    desc: "3-Sitzer Sofa mit naturbelassenem Leinenbezug und Buchenholz-Gestell.",
    stock: 4,
    lowStockThreshold: 3,
    variants: [
      {
        type: "color",
        options: [
          { label: "Leinen Natur", value: "leinen-natur", hex: "#d4c5a0", available: true },
          { label: "Hellgrau", value: "hellgrau", hex: "#d1d5db", available: true },
          { label: "Dunkelblau", value: "dunkelblau", hex: "#1e3a5f", available: true },
          { label: "Terrakotta", value: "terrakotta", hex: "#c2714f", available: false },
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "keramik-vase-sand",
    name: "Keramik Vase Sand",
    price: 79,
    category: "deko",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
    rating: 4.5,
    reviews: 29,
    desc: "Minimalistische Vase in warmem Sandton, handgefertigt in Portugal.",
    stock: 18,
    lowStockThreshold: 5,
    variants: [
      {
        type: "color",
        options: [
          { label: "Sand", value: "sand", hex: "#c2aa83", available: true },
          { label: "Weiß", value: "weiss", hex: "#f5f5f0", available: true },
          { label: "Schwarz", value: "schwarz", hex: "#1c1917", available: true },
        ],
      },
    ],
  },
  {
    id: 7,
    slug: "olivenbaum-100cm",
    name: "Olivenbaum 100cm",
    price: 189,
    category: "pflanzen",
    img: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800",
    rating: 4.8,
    reviews: 92,
    badge: "Beliebt",
    desc: "Mediterraner Olivenbaum aus Spanien, winterhart bis -10°C.",
    stock: 2,
    lowStockThreshold: 3,
    variants: [],
  },
  {
    id: 8,
    slug: "holz-gartenliege-sol",
    name: "Holz Gartenliege Sol",
    price: 429,
    category: "gartenmoebel",
    img: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
    rating: 4.7,
    reviews: 51,
    desc: "Verstellbare Sonnenliege aus Akazienholz mit Rollen.",
    stock: 7,
    lowStockThreshold: 3,
    variants: [
      {
        type: "color",
        options: [
          { label: "Natur", value: "natur", hex: "#c8a96a", available: true },
          { label: "Grau gebeizt", value: "grau", hex: "#6b7280", available: true },
        ],
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  return [...sameCategory, ...others].slice(0, count);
}

export function getCategoryName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? id;
}
