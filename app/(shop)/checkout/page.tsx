"use client";

import { useState } from "react";
import Link from "next/link";
import { useShop } from "@/lib/context/ShopContext";

export default function CheckoutPage() {
  const { cart, subtotal, shipping, total } = useShop();
  const [step, setStep] = useState(1);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-stone-500 text-lg mb-4">Dein Warenkorb ist leer.</p>
        <Link href="/shop" className="bg-stone-900 text-white px-8 py-3 hover:bg-stone-800 transition inline-block">
          Weiter einkaufen
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-stone-900 mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-12">
        {["Adresse", "Versand", "Zahlung"].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > i + 1
                  ? "bg-amber-700 text-white"
                  : step === i + 1
                  ? "bg-stone-900 text-white"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className={step >= i + 1 ? "text-stone-900" : "text-stone-400"}>{s}</span>
            {i < 2 && <div className="w-12 h-px bg-stone-200 ml-2" />}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-stone-900 mb-4">Lieferadresse</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Vorname" className="border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900 w-full" />
                <input placeholder="Nachname" className="border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900 w-full" />
              </div>
              <input placeholder="E-Mail" type="email" className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
              <input placeholder="Straße & Hausnummer" className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="PLZ" className="border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
                <input placeholder="Stadt" className="border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-stone-900 mb-4">Versandoption</h2>
              {[
                { name: "Standard", time: "3-5 Werktage", price: shipping },
                { name: "Express", time: "1-2 Werktage", price: 49 },
              ].map((s, i) => (
                <label key={i} className="flex items-center justify-between border border-stone-300 p-4 cursor-pointer hover:border-stone-900 transition">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="ship" defaultChecked={i === 0} className="accent-stone-900" />
                    <div>
                      <p className="text-stone-900 font-medium">{s.name}</p>
                      <p className="text-stone-500 text-sm">{s.time}</p>
                    </div>
                  </div>
                  <span className="text-stone-900">{s.price === 0 ? "Kostenlos" : `€${s.price}`}</span>
                </label>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-stone-900 mb-4">Zahlungsmethode</h2>
              {["Kreditkarte", "Klarna", "PayPal", "SEPA Lastschrift"].map((p, i) => (
                <label key={i} className="flex items-center gap-3 border border-stone-300 p-4 cursor-pointer hover:border-stone-900 transition">
                  <input type="radio" name="pay" defaultChecked={i === 0} className="accent-stone-900" />
                  <span className="text-stone-900">{p}</span>
                </label>
              ))}
              <label className="flex items-start gap-3 mt-6 text-sm text-stone-600 cursor-pointer">
                <input type="checkbox" className="mt-1 accent-stone-900" />
                <span>
                  Ich akzeptiere die{" "}
                  <Link href="/agb" className="underline hover:text-amber-700">AGB</Link> und die{" "}
                  <Link href="/datenschutz" className="underline hover:text-amber-700">Datenschutzerklärung</Link>.
                </span>
              </label>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t border-stone-100">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-stone-300 hover:border-stone-900 text-stone-700 transition">
                Zurück
              </button>
            ) : (
              <Link href="/shop" className="px-6 py-3 border border-stone-300 hover:border-stone-900 text-stone-700 transition">
                ← Zum Shop
              </Link>
            )}
            <button
              onClick={() => {
                if (step < 3) setStep(step + 1);
                else alert("Zahlung mit Stripe folgt in Phase 3!");
              }}
              className="ml-auto bg-stone-900 text-white px-8 py-3 hover:bg-stone-800 transition"
            >
              {step === 3 ? "Jetzt kaufen" : "Weiter"}
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-stone-50 p-6 h-fit">
          <h3 className="font-serif text-xl text-stone-900 mb-4">Bestellübersicht</h3>
          <div className="space-y-3 mb-4">
            {cart.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="text-stone-700 truncate mr-2">{i.name} × {i.qty}</span>
                <span className="flex-shrink-0">€{(i.price * i.qty).toLocaleString("de-DE")}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-stone-700">
              <span>Zwischensumme</span>
              <span>€{subtotal.toLocaleString("de-DE")}</span>
            </div>
            <div className="flex justify-between text-stone-700">
              <span>Versand</span>
              <span>{shipping === 0 ? "Frei" : `€${shipping}`}</span>
            </div>
            <div className="flex justify-between font-serif text-lg text-stone-900 pt-2 border-t border-stone-200">
              <span>Gesamt</span>
              <span>€{total.toLocaleString("de-DE")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
