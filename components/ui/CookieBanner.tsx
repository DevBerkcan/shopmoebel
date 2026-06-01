"use client";

import { useState, useEffect } from "react";

const COOKIE_KEY = "terra-holz-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = (type: "all" | "necessary" | "custom") => {
    const consent =
      type === "all"
        ? { necessary: true, analytics: true, marketing: true }
        : type === "necessary"
        ? { necessary: true, analytics: false, marketing: false }
        : { necessary: true, ...prefs };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-5">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-stone-900 font-medium mb-1">Wir verwenden Cookies</p>
              <p className="text-stone-600 text-sm">
                Wir nutzen Cookies, um dir die beste Erfahrung zu bieten und unsere Website zu verbessern.
                Weitere Infos in unserer{" "}
                <a href="/datenschutz" className="underline hover:text-amber-700">
                  Datenschutzerklärung
                </a>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm border border-stone-300 text-stone-700 hover:border-stone-900 transition"
              >
                Einstellungen
              </button>
              <button
                onClick={() => accept("necessary")}
                className="px-4 py-2 text-sm border border-stone-300 text-stone-700 hover:border-stone-900 transition"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => accept("all")}
                className="px-6 py-2 text-sm bg-stone-900 text-white hover:bg-stone-800 transition"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="font-serif text-lg text-stone-900">Cookie-Einstellungen</p>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-stone-50">
                <div>
                  <p className="text-stone-900 text-sm font-medium">Notwendige Cookies</p>
                  <p className="text-stone-500 text-xs">Für den Betrieb der Website erforderlich</p>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4" />
              </label>
              <label className="flex items-center justify-between p-3 bg-stone-50 cursor-pointer">
                <div>
                  <p className="text-stone-900 text-sm font-medium">Analyse-Cookies</p>
                  <p className="text-stone-500 text-xs">Helfen uns, die Website zu verbessern</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                  className="w-4 h-4"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-stone-50 cursor-pointer">
                <div>
                  <p className="text-stone-900 text-sm font-medium">Marketing-Cookies</p>
                  <p className="text-stone-500 text-xs">Für personalisierte Werbung</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                  className="w-4 h-4"
                />
              </label>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => accept("custom")}
                className="px-6 py-2 text-sm bg-stone-900 text-white hover:bg-stone-800 transition"
              >
                Auswahl speichern
              </button>
              <button
                onClick={() => accept("all")}
                className="px-6 py-2 text-sm border border-stone-300 text-stone-700 hover:border-stone-900 transition"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
