import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Terra & Holz" };

const navItems = [
  { href: "/admin", label: "Übersicht", icon: "▦" },
  { href: "/admin/products", label: "Produkte", icon: "📦" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 border-r border-stone-800 flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-stone-800">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white font-serif text-sm">
              T
            </div>
            <div>
              <p className="font-serif text-white text-sm">Terra & Holz</p>
              <p className="text-stone-500 text-xs">Admin</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition text-sm"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-800">
          <Link href="/shop" className="flex items-center gap-2 text-stone-500 hover:text-stone-300 text-xs transition">
            <span>←</span>
            <span>Zum Shop</span>
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
