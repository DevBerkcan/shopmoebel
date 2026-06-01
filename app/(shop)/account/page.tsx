"use client";

import Link from "next/link";
import { useShop } from "@/lib/context/ShopContext";

const menuItems = ["Profil", "Bestellungen", "Adressen", "Wunschliste", "Einstellungen", "Abmelden"];

const mockOrders = [
  { id: "#2026-1001", date: "02.05.2026", amount: 450, status: "Geliefert" },
  { id: "#2026-1002", date: "18.04.2026", amount: 1249, status: "Geliefert" },
  { id: "#2026-1003", date: "03.04.2026", amount: 89, status: "Geliefert" },
];

export default function AccountPage() {
  const { wishlist } = useShop();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-stone-900 mb-8">Mein Konto</h1>
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="space-y-1 text-sm">
          {menuItems.map((item) => (
            <button key={item} className="block w-full text-left px-4 py-3 hover:bg-stone-100 text-stone-700 transition rounded">
              {item}
            </button>
          ))}
        </aside>
        <div className="md:col-span-3 bg-stone-50 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-stone-900 flex items-center justify-center text-white font-serif text-2xl">
              A
            </div>
            <div>
              <h2 className="font-serif text-2xl text-stone-900">Willkommen zurück, Anna</h2>
              <p className="text-stone-500 text-sm">anna@beispiel.de</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { l: "Bestellungen", v: "12" },
              { l: "Wunschliste", v: wishlist.length.toString() },
              { l: "Bonuspunkte", v: "340" },
            ].map((s, i) => (
              <div key={i} className="bg-white p-4 text-center border border-stone-100">
                <p className="font-serif text-3xl text-stone-900">{s.v}</p>
                <p className="text-stone-500 text-sm">{s.l}</p>
              </div>
            ))}
          </div>

          <h3 className="font-serif text-lg text-stone-900 mb-4">Letzte Bestellungen</h3>
          <div className="space-y-3">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white p-4 flex justify-between items-center border border-stone-100">
                <div>
                  <p className="text-stone-900 font-medium">{order.id}</p>
                  <p className="text-stone-500 text-sm">
                    {order.date} · €{order.amount.toLocaleString("de-DE")}
                  </p>
                </div>
                <span className="text-green-700 text-sm font-medium">{order.status}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 text-sm text-amber-800">
            Authentifizierung mit NextAuth folgt in Phase 3 — dann werden echte Bestellungen angezeigt.
          </div>
        </div>
      </div>
    </div>
  );
}
