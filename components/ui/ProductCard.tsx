"use client";

import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/lib/context/ShopContext";
import SpotlightCard from "@/components/ui/SpotlightCard";
import type { Product } from "@/lib/data/types";

const STAR = "★";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWish = isInWishlist(product.id);
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const isOutOfStock = product.stock === 0;

  return (
    <SpotlightCard className="group cursor-pointer rounded-none">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative overflow-hidden bg-stone-100 aspect-[4/5] mb-4">
          <Image
            src={product.img}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-white text-stone-900 text-xs px-3 py-1 tracking-wide uppercase z-10">
              {product.badge}
            </span>
          )}
          {isOutOfStock && (
            <span className="absolute top-4 left-4 bg-stone-500 text-white text-xs px-3 py-1 tracking-wide uppercase z-10">
              Ausverkauft
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label={inWish ? "Von Wunschliste entfernen" : "Zur Wunschliste"}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition z-10"
          >
            <svg
              className="w-4 h-4"
              fill={inWish ? "#b45309" : "none"}
              stroke="#44403c"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          {!isOutOfStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="absolute bottom-0 left-0 right-0 bg-stone-900 text-white py-3 text-sm tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10"
            >
              In den Warenkorb
            </button>
          )}
        </div>
      </Link>
      <div className="space-y-1">
        <h3 className="font-serif text-stone-900 text-lg">{product.name}</h3>
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span className="text-amber-700">{STAR.repeat(5)}</span>
          <span>({product.reviews})</span>
        </div>
        {isLowStock && !isOutOfStock && (
          <p className="text-amber-700 text-xs">Nur noch {product.stock} Stück verfügbar!</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-stone-900 font-medium">
            €{product.price.toLocaleString("de-DE")}
          </span>
          {product.oldPrice && (
            <span className="text-stone-400 line-through text-sm">
              €{product.oldPrice.toLocaleString("de-DE")}
            </span>
          )}
          {product.oldPrice && (
            <span className="text-amber-700 text-xs font-medium">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
