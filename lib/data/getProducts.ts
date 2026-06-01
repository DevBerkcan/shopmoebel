import { readProducts } from "@/lib/admin/productStore";
import { products as staticProducts, categories } from "@/lib/data/products";
import type { Product } from "@/lib/data/types";

/**
 * Returns products from the JSON file (products.json) if it exists and is not empty,
 * otherwise falls back to the static TypeScript data.
 * This allows the admin dashboard to manage products while the shop always shows the latest data.
 */
export function getAllProducts(): Product[] {
  try {
    const fromFile = readProducts();
    if (fromFile.length > 0) return fromFile;
  } catch {}
  return staticProducts;
}

export function getProductBySlugDynamic(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getRelatedProductsDynamic(product: Product, count = 4): Product[] {
  const all = getAllProducts();
  const same = all.filter((p) => p.category === product.category && p.id !== product.id);
  const others = all.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...same, ...others].slice(0, count);
}

export { categories };
