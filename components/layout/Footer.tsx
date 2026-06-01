import Link from "next/link";
import { categories } from "@/lib/data/products";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-stone-900 font-serif text-lg">
              T
            </div>
            <div className="font-serif text-xl text-white">Terra & Holz</div>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed">
            Premium Garten- und Wohnmöbel aus nachhaltigen Materialien. Handgefertigt seit 1987.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/shop?category=${c.id}`} className="hover:text-amber-400 transition">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-white mb-4">Service</h4>
          <ul className="space-y-2 text-sm">
            {["FAQ", "Versand", "Rückgabe", "Garantie", "Kontakt"].map((item) => (
              <li key={item}>
                <Link href="/contact" className="hover:text-amber-400 transition">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-white mb-4">Rechtliches</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Impressum", href: "/impressum" },
              { label: "Datenschutz", href: "/datenschutz" },
              { label: "AGB", href: "/agb" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-amber-400 transition">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 py-6 text-center text-sm text-stone-500">
        © 2026 Terra & Holz. Alle Rechte vorbehalten. · realcore Group
      </div>
    </footer>
  );
}
