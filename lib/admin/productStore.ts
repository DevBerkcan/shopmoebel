import fs from "fs";
import path from "path";
import type { Product } from "@/lib/data/types";

const DB_PATH = path.join(process.cwd(), "data", "products.json");

export function readProducts(): Product[] {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function writeProducts(products: Product[]): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2), "utf-8");
}

export function getProductById(id: number): Product | undefined {
  return readProducts().find((p) => p.id === id);
}

export function createProduct(data: Omit<Product, "id" | "rating" | "reviews">): Product {
  const products = readProducts();
  const maxId = products.reduce((m, p) => Math.max(m, p.id), 0);
  const product: Product = {
    ...data,
    id: maxId + 1,
    rating: 5.0,
    reviews: 0,
    variants: data.variants ?? [],
  };
  writeProducts([...products, product]);
  return product;
}

export function updateProduct(id: number, data: Partial<Product>): Product | null {
  const products = readProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...products[idx], ...data, id };
  products[idx] = updated;
  writeProducts(products);
  return updated;
}

export function deleteProduct(id: number): boolean {
  const products = readProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  writeProducts(filtered);
  return true;
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
