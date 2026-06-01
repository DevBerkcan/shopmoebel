import Link from "next/link";
import Image from "next/image";
import { readProducts } from "@/lib/admin/productStore";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

const categoryLabels: Record<string, string> = {
  gartenmoebel: "Gartenmöbel",
  indoor: "Indoor",
  deko: "Deko",
  pflanzen: "Pflanzen",
};

export default function AdminProductsPage() {
  const products = readProducts();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white mb-1">Produkte</h1>
          <p className="text-stone-400 text-sm">{products.length} Produkte insgesamt</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm transition"
        >
          <span>+</span>
          Neues Produkt
        </Link>
      </div>

      {/* Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-800 text-left">
                <th className="px-5 py-3.5 text-stone-400 font-normal w-16">Bild</th>
                <th className="px-5 py-3.5 text-stone-400 font-normal">Produkt</th>
                <th className="px-5 py-3.5 text-stone-400 font-normal hidden md:table-cell">Kategorie</th>
                <th className="px-5 py-3.5 text-stone-400 font-normal">Preis</th>
                <th className="px-5 py-3.5 text-stone-400 font-normal hidden lg:table-cell">Bestand</th>
                <th className="px-5 py-3.5 text-stone-400 font-normal hidden lg:table-cell">Badge</th>
                <th className="px-5 py-3.5 text-stone-400 font-normal w-32">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => {
                const isLow = product.stock > 0 && product.stock <= product.lowStockThreshold;
                const isOut = product.stock === 0;
                return (
                  <tr
                    key={product.id}
                    className={`border-b border-stone-800/60 hover:bg-stone-800/40 transition ${
                      i === products.length - 1 ? "border-0" : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-800 flex-shrink-0">
                        <Image
                          src={product.img}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-stone-500 text-xs mt-0.5">/{product.slug}</p>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="text-stone-400 text-xs px-2 py-1 bg-stone-800 rounded">
                        {categoryLabels[product.category] ?? product.category}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-white">€{product.price.toLocaleString("de-DE")}</p>
                      {product.oldPrice && (
                        <p className="text-stone-500 text-xs line-through">
                          €{product.oldPrice.toLocaleString("de-DE")}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          isOut
                            ? "bg-red-900/40 text-red-400"
                            : isLow
                            ? "bg-amber-900/40 text-amber-400"
                            : "bg-green-900/40 text-green-400"
                        }`}
                      >
                        {isOut ? "Ausverkauft" : isLow ? `${product.stock} niedrig` : `${product.stock} OK`}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      {product.badge ? (
                        <span className="text-xs px-2 py-1 bg-amber-900/30 text-amber-400 rounded">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-stone-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-xs px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg transition"
                        >
                          Bearbeiten
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-16 text-stone-500">
            <p className="text-4xl mb-3">📦</p>
            <p>Noch keine Produkte vorhanden.</p>
            <Link href="/admin/products/new" className="text-amber-500 hover:text-amber-400 text-sm mt-2 inline-block">
              Erstes Produkt hinzufügen →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
