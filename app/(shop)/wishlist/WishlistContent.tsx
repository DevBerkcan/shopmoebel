'use client';

import Link from "next/link";
import { useShop } from "@/lib/context/ShopContext";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/lib/data/types";

interface WishlistContentProps {
  products: Product[];
}

export default function WishlistContent({ products }: WishlistContentProps) {
  const { wishlist } = useShop();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <p className="text-stone-500 mb-10">{wishlistProducts.length} Produkte</p>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <p className="text-stone-500 mb-4">Deine Wunschliste ist leer.</p>
          <Link href="/shop" className="bg-stone-900 text-white px-8 py-3 hover:bg-stone-800 transition inline-block">
            Produkte entdecken
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
