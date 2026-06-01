"use client";

import { useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Kontakt" }];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Breadcrumb items={breadcrumbs} />
      <h1 className="font-serif text-4xl text-stone-900 mb-2">Kontakt</h1>
      <p className="text-stone-600 mb-10">Wir freuen uns auf deine Nachricht und antworten innerhalb von 24 Stunden.</p>

      {sent ? (
        <div className="bg-stone-50 border border-stone-200 p-8 text-center">
          <div className="text-4xl mb-4">✓</div>
          <h2 className="font-serif text-2xl text-stone-900 mb-2">Nachricht gesendet!</h2>
          <p className="text-stone-600">Wir melden uns so schnell wie möglich bei dir.</p>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input
            required
            placeholder="Name"
            className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900 transition"
          />
          <input
            required
            type="email"
            placeholder="E-Mail"
            className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900 transition"
          />
          <input
            placeholder="Betreff"
            className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900 transition"
          />
          <textarea
            required
            placeholder="Nachricht"
            rows={6}
            className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900 transition resize-none"
          />
          <button
            type="submit"
            className="bg-stone-900 text-white px-8 py-3 hover:bg-stone-800 transition tracking-wide"
          >
            Senden
          </button>
        </form>
      )}

      <div className="mt-12 grid grid-cols-2 gap-6">
        {[
          { label: "E-Mail", value: "hallo@terra-holz.de" },
          { label: "Telefon", value: "+49 89 12345678" },
          { label: "Adresse", value: "Naturstraße 12, 80333 München" },
          { label: "Öffnungszeiten", value: "Mo–Fr 9–17 Uhr" },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-stone-500 text-xs uppercase tracking-wide mb-1">{item.label}</p>
            <p className="text-stone-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
