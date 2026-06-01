"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product } from "@/lib/data/types";

type Props = {
  product?: Product;
  mode: "create" | "edit";
};

const CATEGORIES = [
  { id: "gartenmoebel", label: "Gartenmöbel" },
  { id: "indoor", label: "Indoor Möbel" },
  { id: "deko", label: "Deko & Accessoires" },
  { id: "pflanzen", label: "Pflanzen & Töpfe" },
];

const BADGES = ["", "Bestseller", "Neu", "Sale", "Beliebt"];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProductForm({ product, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imgPreview, setImgPreview] = useState(product?.img ?? "");

  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    price: product?.price?.toString() ?? "",
    oldPrice: product?.oldPrice?.toString() ?? "",
    category: product?.category ?? "gartenmoebel",
    img: product?.img ?? "",
    desc: product?.desc ?? "",
    badge: product?.badge ?? "",
    stock: product?.stock?.toString() ?? "10",
    lowStockThreshold: product?.lowStockThreshold?.toString() ?? "3",
  });

  const set = (key: string, val: string) =>
    setForm((prev) => ({
      ...prev,
      [key]: val,
      ...(key === "name" ? { slug: slugify(val) } : {}),
    }));

  useEffect(() => {
    const timer = setTimeout(() => setImgPreview(form.img), 500);
    return () => clearTimeout(timer);
  }, [form.img]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      category: form.category,
      img: form.img,
      desc: form.desc,
      badge: form.badge || null,
      stock: Number(form.stock),
      lowStockThreshold: Number(form.lowStockThreshold),
    };

    try {
      const url =
        mode === "create"
          ? "/api/admin/products"
          : `/api/admin/products/${product!.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Unbekannter Fehler");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Netzwerkfehler — bitte erneut versuchen.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
      {/* Left: Main fields */}
      <div className="lg:col-span-2 space-y-5">
        {/* Name */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4">
          <h2 className="font-serif text-white text-lg mb-2">Produktinformationen</h2>
          <div>
            <label className="block text-stone-400 text-xs mb-1.5 uppercase tracking-wide">
              Produktname *
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="z.B. Teak Loungeset Oslo"
              className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-amber-700 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-stone-400 text-xs mb-1.5 uppercase tracking-wide">
              URL-Slug (auto-generiert)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-stone-500 text-sm">/shop/</span>
              <input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                className="flex-1 bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-stone-400 focus:outline-none focus:border-amber-700 transition text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-400 text-xs mb-1.5 uppercase tracking-wide">
              Beschreibung *
            </label>
            <textarea
              required
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
              rows={4}
              placeholder="Kurze Produktbeschreibung..."
              className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-amber-700 transition text-sm resize-none"
            />
          </div>
        </div>

        {/* Image */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="font-serif text-white text-lg mb-4">Produktbild</h2>
          <div>
            <label className="block text-stone-400 text-xs mb-1.5 uppercase tracking-wide">
              Bild-URL * (Unsplash, eigener Server, etc.)
            </label>
            <input
              required
              value={form.img}
              onChange={(e) => set("img", e.target.value)}
              placeholder="https://images.unsplash.com/photo-...?w=800"
              className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-amber-700 transition text-sm"
            />
            <p className="text-stone-500 text-xs mt-1.5">
              Tipp: Auf Unsplash ein Bild suchen → Rechtsklick → "Bildadresse kopieren"
            </p>
          </div>

          {/* Preview */}
          {imgPreview && (
            <div className="mt-4">
              <p className="text-stone-500 text-xs mb-2">Vorschau:</p>
              <div className="relative w-full aspect-[4/3] bg-stone-800 rounded-lg overflow-hidden">
                <Image
                  src={imgPreview}
                  alt="Vorschau"
                  fill
                  className="object-cover"
                  sizes="600px"
                  onError={() => setImgPreview("")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="font-serif text-white text-lg mb-4">Preise</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-400 text-xs mb-1.5 uppercase tracking-wide">
                Verkaufspreis (€) *
              </label>
              <input
                required
                type="number"
                min="1"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="1899"
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-amber-700 transition text-sm"
              />
            </div>
            <div>
              <label className="block text-stone-400 text-xs mb-1.5 uppercase tracking-wide">
                Streichpreis (€) optional
              </label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={form.oldPrice}
                onChange={(e) => set("oldPrice", e.target.value)}
                placeholder="2299 (leer = kein Sale)"
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-amber-700 transition text-sm"
              />
            </div>
          </div>
          {form.price && form.oldPrice && Number(form.oldPrice) > Number(form.price) && (
            <p className="mt-3 text-amber-400 text-xs">
              ↓ {Math.round((1 - Number(form.price) / Number(form.oldPrice)) * 100)}% Rabatt wird angezeigt
            </p>
          )}
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="space-y-5">
        {/* Publish */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="font-serif text-white text-lg mb-4">Veröffentlichen</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-900/40 border border-red-800 rounded-lg text-red-400 text-xs">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-lg text-sm transition font-medium"
          >
            {saving ? "Wird gespeichert..." : mode === "create" ? "Produkt erstellen" : "Änderungen speichern"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="w-full mt-2 bg-stone-800 hover:bg-stone-700 text-stone-400 py-3 rounded-lg text-sm transition"
          >
            Abbrechen
          </button>
        </div>

        {/* Category */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="font-serif text-white text-lg mb-4">Kategorie</h2>
          <div className="space-y-2">
            {CATEGORIES.map((c) => (
              <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value={c.id}
                  checked={form.category === c.id}
                  onChange={() => set("category", c.id)}
                  className="accent-amber-700"
                />
                <span className="text-stone-300 text-sm group-hover:text-white transition">
                  {c.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Badge */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="font-serif text-white text-lg mb-4">Badge</h2>
          <div className="grid grid-cols-2 gap-2">
            {BADGES.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => set("badge", b)}
                className={`py-2 px-3 rounded-lg text-xs border transition ${
                  form.badge === b
                    ? "bg-amber-700 border-amber-700 text-white"
                    : "bg-stone-800 border-stone-700 text-stone-400 hover:border-stone-500"
                }`}
              >
                {b || "Kein Badge"}
              </button>
            ))}
          </div>
        </div>

        {/* Stock */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4">
          <h2 className="font-serif text-white text-lg">Lagerbestand</h2>
          <div>
            <label className="block text-stone-400 text-xs mb-1.5 uppercase tracking-wide">
              Aktueller Bestand
            </label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-700 transition text-sm"
            />
          </div>
          <div>
            <label className="block text-stone-400 text-xs mb-1.5 uppercase tracking-wide">
              Warnschwelle (Niedriger Bestand)
            </label>
            <input
              type="number"
              min="1"
              value={form.lowStockThreshold}
              onChange={(e) => set("lowStockThreshold", e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-700 transition text-sm"
            />
            <p className="text-stone-500 text-xs mt-1.5">
              Bei ≤ {form.lowStockThreshold} Stück erscheint "Nur noch X Stück" im Shop
            </p>
          </div>

          {/* Stock preview */}
          <div className="p-3 bg-stone-800 rounded-lg">
            <p className="text-xs text-stone-500 mb-1">Anzeige im Shop:</p>
            {Number(form.stock) === 0 ? (
              <p className="text-red-400 text-xs">❌ Nicht verfügbar</p>
            ) : Number(form.stock) <= Number(form.lowStockThreshold) ? (
              <p className="text-amber-400 text-xs">⚡ Nur noch {form.stock} Stück verfügbar!</p>
            ) : (
              <p className="text-green-400 text-xs">✓ Verfügbar ({form.stock} Stück)</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
