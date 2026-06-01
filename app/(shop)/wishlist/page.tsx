import Link from "next/link";
import { getAllProducts } from "@/lib/data/getProducts";
import ProductCard from "@/components/ui/ProductCard";
import WishlistContent from "./WishlistContent";

export default async function WishlistPage() {
  const products = getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Wunschliste</p>
      <h1 className="font-serif text-5xl text-stone-900 mb-2">Deine Favoriten</h1>
      <WishlistContent products={products} />
    </div>
  );
}

