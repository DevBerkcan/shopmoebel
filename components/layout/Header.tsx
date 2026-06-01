"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useShop } from "@/lib/context/ShopContext";

export default function Header() {
  const { itemCount, wishlist, setCartOpen, setSearchOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-white"
      }`}
    >
      <div className="border-b border-stone-100 bg-stone-900 text-stone-100 text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between">
          <span>Kostenloser Versand ab 500€ · 30 Tage Rückgabe</span>
          <span className="hidden md:block">DE · EUR</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center text-amber-50 font-serif text-lg">
            T
          </div>
          <div className="font-serif text-xl tracking-wide text-stone-900">
            Terra <span className="text-amber-700">&</span> Holz
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-stone-700">
          <Link href="/shop" className="hover:text-amber-700 transition">Shop</Link>
          <Link href="/shop?category=gartenmoebel" className="hover:text-amber-700 transition">Garten</Link>
          <Link href="/shop?category=indoor" className="hover:text-amber-700 transition">Indoor</Link>
          <Link href="/blog" className="hover:text-amber-700 transition">Journal</Link>
          <Link href="/about" className="hover:text-amber-700 transition">Über uns</Link>
          <Link href="/contact" className="hover:text-amber-700 transition">Kontakt</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Suche"
            className="text-stone-700 hover:text-amber-700 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <Link href="/account" className="hidden md:block text-stone-700 hover:text-amber-700 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
            </svg>
          </Link>
          <Link href="/wishlist" className="text-stone-700 hover:text-amber-700 transition relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Warenkorb"
            className="text-stone-700 hover:text-amber-700 transition relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-stone-700"
            aria-label="Menü"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden border-t border-stone-100 px-6 py-4 space-y-3 bg-white">
          {[
            { href: "/shop", label: "Shop" },
            { href: "/blog", label: "Journal" },
            { href: "/about", label: "Über uns" },
            { href: "/contact", label: "Kontakt" },
            { href: "/account", label: "Konto" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenu(false)}
              className="block text-stone-700 hover:text-amber-700 py-1"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
