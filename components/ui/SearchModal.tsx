"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/lib/context/ShopContext";
import { products } from "@/lib/data/products";

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSearchOpen]);

  if (!searchOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setSearchOpen(false)}
      />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 bg-white shadow-2xl">
        <div className="flex items-center border-b border-stone-200 px-6">
          <svg className="w-5 h-5 text-stone-400 mr-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Produkte suchen…"
            className="flex-1 py-5 text-stone-900 placeholder-stone-400 focus:outline-none text-lg"
          />
          <kbd className="hidden md:block text-xs text-stone-400 border border-stone-200 px-2 py-1 rounded">ESC</kbd>
        </div>

        {results.length > 0 ? (
          <ul className="py-2 max-h-96 overflow-y-auto">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/shop/${p.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-4 px-6 py-3 hover:bg-stone-50 transition"
                >
                  <div className="relative w-12 h-12 bg-stone-100 flex-shrink-0">
                    <Image src={p.img} alt={p.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-900 font-medium truncate">{p.name}</p>
                    <p className="text-stone-500 text-sm">€{p.price.toLocaleString("de-DE")}</p>
                  </div>
                  <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        ) : query.trim().length > 1 ? (
          <p className="px-6 py-8 text-stone-500 text-center">Keine Produkte gefunden für „{query}"</p>
        ) : (
          <div className="px-6 py-6">
            <p className="text-stone-400 text-sm mb-3">Beliebte Suchen</p>
            <div className="flex flex-wrap gap-2">
              {["Teak", "Sofa", "Olivenbaum", "Vase"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 text-sm border border-stone-200 text-stone-700 hover:border-stone-900 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
