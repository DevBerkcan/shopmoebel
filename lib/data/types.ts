export type VariantOption = {
  label: string;
  value: string;
  hex?: string;
  available: boolean;
  priceModifier?: number;
};

export type ProductVariant = {
  type: "size" | "color" | "material" | "finish";
  options: VariantOption[];
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  img: string;
  rating: number;
  reviews: number;
  badge?: "Bestseller" | "Neu" | "Sale" | "Beliebt";
  desc: string;
  stock: number;
  lowStockThreshold: number;
  variants: ProductVariant[];
};

export type Category = {
  id: string;
  name: string;
  img: string;
};

export type CartItem = Product & { qty: number };

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "top-rated";
