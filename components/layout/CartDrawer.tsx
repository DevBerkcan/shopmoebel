"use client";

import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/lib/context/ShopContext";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, subtotal, shipping, total } = useShop();

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 transform transition-transform duration-300 flex flex-col ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b border-stone-200 flex justify-between items-center">
          <h2 className="font-serif text-2xl text-stone-900">Warenkorb</h2>
          <button onClick={() => setCartOpen(false)} className="text-stone-500 hover:text-stone-900 text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272" />
              </svg>
              <p className="text-stone-500">Dein Warenkorb ist leer</p>
              <button onClick={() => setCartOpen(false)} className="mt-4 text-amber-700 underline text-sm">Weiter einkaufen</button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-24 bg-stone-100 flex-shrink-0">
                    <Image src={item.img} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-stone-900 text-sm leading-tight mb-1">{item.name}</h3>
                    <p className="text-stone-600 text-sm mb-3">€{item.price.toLocaleString("de-DE")}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-stone-300">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 hover:bg-stone-100 text-stone-700">−</button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 hover:bg-stone-100 text-stone-700">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-amber-700 text-xs transition">
                        Entfernen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-stone-200 p-6 space-y-4">
            {subtotal < 500 && (
              <div className="bg-stone-50 px-4 py-3 text-xs text-stone-600">
                Noch €{(500 - subtotal).toLocaleString("de-DE")} bis zum kostenlosen Versand
                <div className="mt-2 h-1 bg-stone-200 rounded-full">
                  <div
                    className="h-1 bg-amber-700 rounded-full transition-all"
                    style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-between text-stone-700 text-sm">
              <span>Zwischensumme</span>
              <span>€{subtotal.toLocaleString("de-DE")}</span>
            </div>
            <div className="flex justify-between text-stone-700 text-sm">
              <span>Versand</span>
              <span>{shipping === 0 ? "Kostenlos" : `€${shipping}`}</span>
            </div>
            <div className="flex justify-between font-serif text-xl text-stone-900 pt-2 border-t border-stone-200">
              <span>Gesamt</span>
              <span>€{total.toLocaleString("de-DE")}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full bg-stone-900 text-white py-4 text-center hover:bg-stone-800 transition tracking-wide text-sm"
            >
              Zur Kasse
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
