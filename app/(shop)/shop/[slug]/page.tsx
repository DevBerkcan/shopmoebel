"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { useShop } from "@/lib/context/ShopContext";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductCard from "@/components/ui/ProductCard";
import type { VariantOption } from "@/lib/data/types";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  return <ProductDetail slug={slug} />;
}

function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)!;
  const related = getRelatedProducts(product, 4);
  const { addToCart, toggleWishlist, isInWishlist, setCartOpen } = useShop();
  const [qty, setQty] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const isOutOfStock = product.stock === 0;
  const inWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setCartOpen(true);
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-stone-100 overflow-hidden">
            <Image
              src={product.img}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square bg-stone-100 cursor-pointer hover:opacity-80 overflow-hidden">
                <Image
                  src={product.img}
                  alt={`${product.name} ${i}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          {product.badge && (
            <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 mb-4 tracking-wide uppercase">
              {product.badge}
            </span>
          )}
          <h1 className="font-serif text-4xl text-stone-900 mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-amber-700">★★★★★</span>
            <span className="text-stone-500 text-sm">
              {product.rating} ({product.reviews} Bewertungen)
            </span>
          </div>

          {isLowStock && !isOutOfStock && (
            <p className="text-amber-700 text-sm mb-4 font-medium">
              ⚡ Nur noch {product.stock} Stück verfügbar!
            </p>
          )}
          {isOutOfStock && (
            <p className="text-red-600 text-sm mb-4 font-medium">Derzeit nicht verfügbar</p>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl text-stone-900 font-serif">
              €{product.price.toLocaleString("de-DE")}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-stone-400 line-through text-xl">
                  €{product.oldPrice.toLocaleString("de-DE")}
                </span>
                <span className="bg-amber-100 text-amber-800 text-sm px-2 py-1">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="text-stone-600 leading-relaxed mb-8">{product.desc}</p>

          {/* Variants */}
          {product.variants.map((variant) => (
            <div key={variant.type} className="mb-6">
              <p className="text-sm text-stone-700 mb-3 font-medium">
                {variant.type === "color" ? "Farbe"
                  : variant.type === "material" ? "Material"
                  : variant.type === "finish" ? "Oberfläche"
                  : "Größe"}
                {selectedVariants[variant.type] && (
                  <span className="font-normal text-stone-500 ml-2">
                    — {variant.options.find((o) => o.value === selectedVariants[variant.type])?.label}
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((opt: VariantOption) =>
                  variant.type === "color" || variant.type === "finish" ? (
                    <button
                      key={opt.value}
                      onClick={() => opt.available && setSelectedVariants((prev) => ({ ...prev, [variant.type]: opt.value }))}
                      title={opt.label}
                      className={`w-10 h-10 rounded-full border-2 transition ${
                        selectedVariants[variant.type] === opt.value
                          ? "border-stone-900 scale-110"
                          : "border-transparent hover:border-stone-400"
                      } ${!opt.available ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                      style={{ backgroundColor: opt.hex }}
                    />
                  ) : (
                    <button
                      key={opt.value}
                      onClick={() => opt.available && setSelectedVariants((prev) => ({ ...prev, [variant.type]: opt.value }))}
                      className={`px-4 py-2 border text-sm transition ${
                        selectedVariants[variant.type] === opt.value
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-300 hover:border-stone-900"
                      } ${!opt.available ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                    >
                      {opt.label}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-sm text-stone-700 mb-3 font-medium">Menge</p>
            <div className="flex items-center border border-stone-300 w-fit">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 hover:bg-stone-100 transition">−</button>
              <span className="w-12 text-center">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock || 99, qty + 1))} className="w-12 h-12 hover:bg-stone-100 transition">+</button>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 bg-stone-900 text-white py-4 hover:bg-stone-800 transition tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOutOfStock ? "Nicht verfügbar" : "In den Warenkorb"}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label={inWish ? "Von Wunschliste entfernen" : "Zur Wunschliste"}
              className="w-14 h-14 border border-stone-300 flex items-center justify-center hover:border-stone-900 transition"
            >
              <svg className="w-5 h-5" fill={inWish ? "#b45309" : "none"} stroke="#44403c" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          <div className="border-t border-stone-200 pt-6 space-y-3 text-sm text-stone-600">
            <div className="flex justify-between"><span>🚚 Lieferung</span><span>3-5 Werktage</span></div>
            <div className="flex justify-between"><span>↩️ Rückgabe</span><span>30 Tage kostenlos</span></div>
            <div className="flex justify-between"><span>🛡️ Garantie</span><span>5 Jahre</span></div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-serif text-3xl text-stone-900 mb-8">Das könnte dir auch gefallen</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
