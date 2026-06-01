import Link from "next/link";
import { readProducts } from "@/lib/admin/productStore";

export default function AdminDashboard() {
  const products = readProducts();
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold);
  const outOfStock = products.filter((p) => p.stock === 0);
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);

  const categoryCount = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white mb-1">Dashboard</h1>
        <p className="text-stone-400 text-sm">Willkommen im Terra & Holz Admin-Bereich</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Produkte gesamt", value: totalProducts, icon: "📦", color: "text-blue-400" },
          { label: "Niedriger Bestand", value: lowStock.length, icon: "⚡", color: "text-amber-400", alert: lowStock.length > 0 },
          { label: "Ausverkauft", value: outOfStock.length, icon: "❌", color: "text-red-400", alert: outOfStock.length > 0 },
          {
            label: "Lagerwert",
            value: `€${totalValue.toLocaleString("de-DE")}`,
            icon: "💶",
            color: "text-green-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-stone-900 border rounded-xl p-5 ${
              stat.alert ? "border-amber-700/50" : "border-stone-800"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              {stat.alert && (
                <span className="text-xs bg-amber-700/20 text-amber-400 px-2 py-0.5 rounded-full">
                  Achtung
                </span>
              )}
            </div>
            <p className={`font-serif text-2xl ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-stone-500 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="font-serif text-lg text-white mb-4">Schnellaktionen</h2>
          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-3 p-3 bg-amber-700 hover:bg-amber-600 rounded-lg text-white text-sm transition group"
            >
              <span className="text-xl">+</span>
              <span>Neues Produkt hinzufügen</span>
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition">→</span>
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-3 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-300 text-sm transition group"
            >
              <span className="text-xl">📋</span>
              <span>Alle Produkte verwalten</span>
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition">→</span>
            </Link>
            <Link
              href="/shop"
              target="_blank"
              className="flex items-center gap-3 p-3 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-300 text-sm transition group"
            >
              <span className="text-xl">🛍️</span>
              <span>Shop ansehen</span>
              <span className="ml-auto text-stone-500 text-xs">↗</span>
            </Link>
          </div>
        </div>

        {/* Low Stock Warnings */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="font-serif text-lg text-white mb-4">
            Bestandswarnungen
            {lowStock.length > 0 && (
              <span className="ml-2 text-xs bg-amber-700/20 text-amber-400 px-2 py-0.5 rounded-full">
                {lowStock.length}
              </span>
            )}
          </h2>
          {lowStock.length === 0 ? (
            <p className="text-stone-500 text-sm">Alle Bestände sind ausreichend ✓</p>
          ) : (
            <div className="space-y-2">
              {lowStock.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/products/${p.id}/edit`}
                  className="flex items-center justify-between p-2 hover:bg-stone-800 rounded-lg transition"
                >
                  <span className="text-stone-300 text-sm truncate">{p.name}</span>
                  <span className="text-amber-400 text-xs ml-2 flex-shrink-0">
                    {p.stock} Stück
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Category Overview */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <h2 className="font-serif text-lg text-white mb-4">Kategorien</h2>
          <div className="space-y-3">
            {Object.entries(categoryCount).map(([cat, count]) => {
              const labels: Record<string, string> = {
                gartenmoebel: "Gartenmöbel",
                indoor: "Indoor Möbel",
                deko: "Deko & Accessoires",
                pflanzen: "Pflanzen & Töpfe",
              };
              const pct = Math.round((count / totalProducts) * 100);
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs text-stone-400 mb-1">
                    <span>{labels[cat] ?? cat}</span>
                    <span>{count} Produkte</span>
                  </div>
                  <div className="h-1.5 bg-stone-800 rounded-full">
                    <div
                      className="h-1.5 bg-amber-700 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
