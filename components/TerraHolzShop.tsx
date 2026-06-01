// @ts-nocheck
// DEPRECATED: Diese Datei ist der alte Monolith.
// Die neue Struktur befindet sich in app/ und components/layout/ bzw. components/ui/
"use client";

import { useState, useEffect } from "react";

export default function TerraHolzShop() {
  const [route, setRoute] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = [
    { id: "gartenmoebel", name: "Gartenmöbel", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" },
    { id: "indoor", name: "Indoor Möbel", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800" },
    { id: "deko", name: "Deko & Accessoires", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800" },
    { id: "pflanzen", name: "Pflanzen & Töpfe", img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800" },
  ];

  const products = [
    { id: 1, slug: "teak-loungeset-oslo", name: "Teak Loungeset Oslo", price: 1899, oldPrice: 2299, category: "gartenmoebel", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800", rating: 4.8, reviews: 142, badge: "Bestseller", desc: "Handgefertigtes Loungeset aus massivem Teakholz. Wetterfest, langlebig und zeitlos elegant." },
    { id: 2, slug: "eichen-esstisch-bjork", name: "Eichen Esstisch Björk", price: 1249, category: "indoor", img: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800", rating: 4.9, reviews: 87, badge: "Neu", desc: "Massiver Esstisch aus europäischer Eiche, geölt und FSC-zertifiziert." },
    { id: 3, slug: "rattan-sessel-mira", name: "Rattan Sessel Mira", price: 549, category: "gartenmoebel", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800", rating: 4.7, reviews: 64, desc: "Geflochtener Sessel mit weichem Leinenkissen für Terrasse und Wohnzimmer." },
    { id: 4, slug: "terracotta-pflanztopf", name: "Terracotta Pflanztopf XL", price: 89, category: "pflanzen", img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800", rating: 4.6, reviews: 38, desc: "Handgetöpferter Terracotta-Topf, frostfest und atmungsaktiv." },
    { id: 5, slug: "leinen-sofa-nord", name: "Leinen Sofa Nord", price: 2199, oldPrice: 2599, category: "indoor", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", rating: 4.9, reviews: 213, badge: "Sale", desc: "3-Sitzer Sofa mit naturbelassenem Leinenbezug und Buchenholz-Gestell." },
    { id: 6, slug: "keramik-vase-sand", name: "Keramik Vase Sand", price: 79, category: "deko", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800", rating: 4.5, reviews: 29, desc: "Minimalistische Vase in warmem Sandton, handgefertigt in Portugal." },
    { id: 7, slug: "olivenbaum-100cm", name: "Olivenbaum 100cm", price: 189, category: "pflanzen", img: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800", rating: 4.8, reviews: 92, badge: "Beliebt", desc: "Mediterraner Olivenbaum aus Spanien, winterhart bis -10°C." },
    { id: 8, slug: "holz-gartenliege-sol", name: "Holz Gartenliege Sol", price: 429, category: "gartenmoebel", img: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800", rating: 4.7, reviews: 51, desc: "Verstellbare Sonnenliege aus Akazienholz mit Rollen." },
  ];

  const filteredProducts = selectedCategory ? products.filter(p => p.category === selectedCategory) : products;

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 500 ? 0 : 29;
  const total = subtotal + shipping;

  const navigate = (r, data) => {
    if (r === "product") setSelectedProduct(data);
    if (r === "category") setSelectedCategory(data);
    if (r === "shop" && !data) setSelectedCategory(null);
    setRoute(r);
    setMobileMenu(false);
    window.scrollTo(0, 0);
  };

  const Header = () => (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-white"}`}>
      <div className="border-b border-stone-100 bg-stone-900 text-stone-100 text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between">
          <span>Kostenloser Versand ab 500€ · 30 Tage Rückgabe</span>
          <span className="hidden md:block">DE · EUR</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <button onClick={() => navigate("home")} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center text-amber-50 font-serif text-lg">T</div>
          <div className="font-serif text-xl tracking-wide text-stone-900">Terra <span className="text-amber-700">&</span> Holz</div>
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm text-stone-700">
          <button onClick={() => navigate("shop")} className="hover:text-amber-700 transition">Shop</button>
          <button onClick={() => navigate("category", "gartenmoebel")} className="hover:text-amber-700 transition">Garten</button>
          <button onClick={() => navigate("category", "indoor")} className="hover:text-amber-700 transition">Indoor</button>
          <button onClick={() => navigate("blog")} className="hover:text-amber-700 transition">Journal</button>
          <button onClick={() => navigate("about")} className="hover:text-amber-700 transition">Über uns</button>
          <button onClick={() => navigate("contact")} className="hover:text-amber-700 transition">Kontakt</button>
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("account")} className="hidden md:block text-stone-700 hover:text-amber-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"/></svg>
          </button>
          <button onClick={() => navigate("wishlist")} className="text-stone-700 hover:text-amber-700 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
            {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}
          </button>
          <button onClick={() => setCartOpen(true)} className="text-stone-700 hover:text-amber-700 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272"/></svg>
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{cart.reduce((s,i)=>s+i.qty,0)}</span>}
          </button>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-stone-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
          </button>
        </div>
      </div>
      {mobileMenu && (
        <div className="md:hidden border-t border-stone-100 px-6 py-4 space-y-3 bg-white">
          {["shop","blog","about","contact","account"].map(r => (
            <button key={r} onClick={() => navigate(r)} className="block text-stone-700 capitalize">{r}</button>
          ))}
        </div>
      )}
    </header>
  );

  const ProductCard = ({ product }) => (
    <div className="group cursor-pointer" onClick={() => navigate("product", product)}>
      <div className="relative overflow-hidden bg-stone-100 aspect-[4/5] mb-4">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {product.badge && <span className="absolute top-4 left-4 bg-white text-stone-900 text-xs px-3 py-1 tracking-wide uppercase">{product.badge}</span>}
        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition">
          <svg className="w-4 h-4" fill={wishlist.includes(product.id) ? "#b45309" : "none"} stroke="#44403c" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
        </button>
        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="absolute bottom-0 left-0 right-0 bg-stone-900 text-white py-3 text-sm tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">In den Warenkorb</button>
      </div>
      <div className="space-y-1">
        <h3 className="font-serif text-stone-900 text-lg">{product.name}</h3>
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span className="text-amber-700">★★★★★</span>
          <span>({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-stone-900 font-medium">€{product.price.toLocaleString()}</span>
          {product.oldPrice && <span className="text-stone-400 line-through text-sm">€{product.oldPrice.toLocaleString()}</span>}
        </div>
      </div>
    </div>
  );

  const Home = () => (
    <div>
      <section className="relative h-screen min-h-[600px] flex items-center">
        <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-90">Frühjahrskollektion 2026</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6 max-w-2xl">Natürlich schön. Handgefertigt mit Liebe.</h1>
          <p className="text-lg max-w-lg mb-8 opacity-90">Premium Garten- und Wohnmöbel aus nachhaltigen Materialien. Zeitloses Design für dein Zuhause.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate("shop")} className="bg-white text-stone-900 px-8 py-4 hover:bg-amber-50 transition tracking-wide">Kollektion entdecken</button>
            <button onClick={() => navigate("about")} className="border border-white text-white px-8 py-4 hover:bg-white hover:text-stone-900 transition tracking-wide">Unsere Geschichte</button>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Kategorien</p>
          <h2 className="font-serif text-4xl text-stone-900">Für jeden Raum das Richtige</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(c => (
            <div key={c.id} onClick={() => navigate("category", c.id)} className="group cursor-pointer relative overflow-hidden aspect-[3/4]">
              <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
              <h3 className="absolute bottom-6 left-6 right-6 font-serif text-2xl text-white">{c.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Bestseller</p>
              <h2 className="font-serif text-4xl text-stone-900">Unsere Lieblinge</h2>
            </div>
            <button onClick={() => navigate("shop")} className="hidden md:block text-stone-700 hover:text-amber-700 underline underline-offset-4">Alle ansehen →</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {[
          { icon: "🚚", title: "Kostenloser Versand", text: "Ab 500€ Bestellwert in DE" },
          { icon: "🌱", title: "Nachhaltig", text: "FSC-zertifizierte Hölzer" },
          { icon: "🛡️", title: "5 Jahre Garantie", text: "Auf alle Möbelstücke" },
          { icon: "↩️", title: "30 Tage Rückgabe", text: "Risikofreier Kauf" },
        ].map((f, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-serif text-lg text-stone-900 mb-2">{f.title}</h3>
            <p className="text-stone-600 text-sm">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Kundenstimmen</p>
            <h2 className="font-serif text-4xl text-stone-900">Geliebt von tausenden Kunden</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Anna M.", text: "Die Qualität ist außergewöhnlich. Mein Esstisch ist ein echtes Schmuckstück.", rating: 5 },
              { name: "Thomas K.", text: "Schnelle Lieferung, perfekte Verpackung. Das Loungeset ist traumhaft.", rating: 5 },
              { name: "Lisa S.", text: "Endlich nachhaltige Möbel mit Stil. Kann ich nur empfehlen!", rating: 5 },
            ].map((r, i) => (
              <div key={i} className="bg-white p-8">
                <div className="text-amber-700 mb-4">★★★★★</div>
                <p className="text-stone-700 italic mb-6">"{r.text}"</p>
                <p className="font-serif text-stone-900">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-3">Newsletter</p>
          <h2 className="font-serif text-4xl mb-4">Bleib inspiriert</h2>
          <p className="text-stone-300 mb-8">Erhalte 10% Rabatt auf deine erste Bestellung und exklusive Einblicke in neue Kollektionen.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Deine E-Mail" className="flex-1 bg-stone-800 border border-stone-700 px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-amber-700" />
            <button className="bg-amber-700 hover:bg-amber-800 px-6 py-3 transition">Abonnieren</button>
          </div>
        </div>
      </section>
    </div>
  );

  const Shop = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Shop</p>
        <h1 className="font-serif text-5xl text-stone-900">{selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "Alle Produkte"}</h1>
      </div>
      <div className="flex flex-wrap gap-3 mb-10">
        <button onClick={() => setSelectedCategory(null)} className={`px-5 py-2 text-sm border ${!selectedCategory ? "bg-stone-900 text-white border-stone-900" : "border-stone-300 text-stone-700 hover:border-stone-900"}`}>Alle</button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`px-5 py-2 text-sm border ${selectedCategory === c.id ? "bg-stone-900 text-white border-stone-900" : "border-stone-300 text-stone-700 hover:border-stone-900"}`}>{c.name}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );

  const ProductDetail = () => {
    const [qty, setQty] = useState(1);
    const [variant, setVariant] = useState("M");
    if (!selectedProduct) return null;
    const related = products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 4);
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button onClick={() => navigate("shop")} className="text-stone-600 hover:text-amber-700 text-sm mb-8">← Zurück zum Shop</button>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-stone-100 overflow-hidden">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-stone-100 cursor-pointer hover:opacity-80">
                  <img src={selectedProduct.img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div>
            {selectedProduct.badge && <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 mb-4 tracking-wide uppercase">{selectedProduct.badge}</span>}
            <h1 className="font-serif text-4xl text-stone-900 mb-3">{selectedProduct.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-700">★★★★★</span>
              <span className="text-stone-500 text-sm">{selectedProduct.rating} ({selectedProduct.reviews} Bewertungen)</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl text-stone-900">€{selectedProduct.price.toLocaleString()}</span>
              {selectedProduct.oldPrice && <span className="text-stone-400 line-through text-xl">€{selectedProduct.oldPrice.toLocaleString()}</span>}
            </div>
            <p className="text-stone-600 leading-relaxed mb-8">{selectedProduct.desc}</p>
            <div className="mb-6">
              <p className="text-sm text-stone-700 mb-3">Größe</p>
              <div className="flex gap-2">
                {["S","M","L","XL"].map(s => (
                  <button key={s} onClick={() => setVariant(s)} className={`w-12 h-12 border ${variant === s ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 hover:border-stone-900"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <p className="text-sm text-stone-700 mb-3">Menge</p>
              <div className="flex items-center border border-stone-300 w-fit">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="w-12 h-12 hover:bg-stone-100">−</button>
                <span className="w-12 text-center">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="w-12 h-12 hover:bg-stone-100">+</button>
              </div>
            </div>
            <div className="flex gap-3 mb-8">
              <button onClick={() => addToCart(selectedProduct, qty)} className="flex-1 bg-stone-900 text-white py-4 hover:bg-stone-800 transition tracking-wide">In den Warenkorb</button>
              <button onClick={() => toggleWishlist(selectedProduct.id)} className="w-14 h-14 border border-stone-300 flex items-center justify-center hover:border-stone-900">
                <svg className="w-5 h-5" fill={wishlist.includes(selectedProduct.id) ? "#b45309" : "none"} stroke="#44403c" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
              </button>
            </div>
            <div className="border-t border-stone-200 pt-6 space-y-3 text-sm text-stone-600">
              <div className="flex justify-between"><span>🚚 Lieferung</span><span>3-5 Werktage</span></div>
              <div className="flex justify-between"><span>↩️ Rückgabe</span><span>30 Tage kostenlos</span></div>
              <div className="flex justify-between"><span>🛡️ Garantie</span><span>5 Jahre</span></div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <h2 className="font-serif text-3xl text-stone-900 mb-8">Das könnte dir auch gefallen</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    );
  };

  const CartDrawer = () => (
    <>
      <div onClick={() => setCartOpen(false)} className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 transform transition-transform duration-300 flex flex-col ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-stone-200 flex justify-between items-center">
          <h2 className="font-serif text-2xl text-stone-900">Warenkorb</h2>
          <button onClick={() => setCartOpen(false)} className="text-stone-500 hover:text-stone-900">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <p className="text-stone-500 text-center py-12">Dein Warenkorb ist leer</p>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.img} alt="" className="w-20 h-24 object-cover bg-stone-100" />
                  <div className="flex-1">
                    <h3 className="font-serif text-stone-900">{item.name}</h3>
                    <p className="text-stone-600 text-sm mb-2">€{item.price.toLocaleString()}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-stone-300">
                        <button onClick={() => updateQty(item.id, item.qty-1)} className="w-8 h-8 hover:bg-stone-100">−</button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty+1)} className="w-8 h-8 hover:bg-stone-100">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-amber-700 text-sm">Entfernen</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t border-stone-200 p-6 space-y-4">
            <div className="flex justify-between text-stone-700"><span>Zwischensumme</span><span>€{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-stone-700"><span>Versand</span><span>{shipping === 0 ? "Kostenlos" : `€${shipping}`}</span></div>
            <div className="flex justify-between font-serif text-xl text-stone-900 pt-2 border-t border-stone-200"><span>Gesamt</span><span>€{total.toLocaleString()}</span></div>
            <button onClick={() => { setCartOpen(false); navigate("checkout"); setCheckoutStep(1); }} className="w-full bg-stone-900 text-white py-4 hover:bg-stone-800 transition tracking-wide">Zur Kasse</button>
          </div>
        )}
      </div>
    </>
  );

  const Checkout = () => (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-stone-900 mb-8">Checkout</h1>
      <div className="flex items-center gap-4 mb-12">
        {["Adresse","Versand","Zahlung"].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${checkoutStep > i ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-600"}`}>{i+1}</div>
            <span className={checkoutStep > i ? "text-stone-900" : "text-stone-500"}>{s}</span>
            {i < 2 && <div className="w-12 h-px bg-stone-300 ml-2" />}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          {checkoutStep === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-stone-900 mb-4">Lieferadresse</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Vorname" className="border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
                <input placeholder="Nachname" className="border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
              </div>
              <input placeholder="E-Mail" className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
              <input placeholder="Straße & Hausnummer" className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="PLZ" className="border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
                <input placeholder="Stadt" className="border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
              </div>
            </div>
          )}
          {checkoutStep === 2 && (
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-stone-900 mb-4">Versandoption</h2>
              {[
                { name: "Standard", time: "3-5 Werktage", price: shipping },
                { name: "Express", time: "1-2 Werktage", price: 49 },
              ].map((s, i) => (
                <label key={i} className="flex items-center justify-between border border-stone-300 p-4 cursor-pointer hover:border-stone-900">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="ship" defaultChecked={i===0} />
                    <div>
                      <p className="text-stone-900">{s.name}</p>
                      <p className="text-stone-500 text-sm">{s.time}</p>
                    </div>
                  </div>
                  <span>{s.price === 0 ? "Kostenlos" : `€${s.price}`}</span>
                </label>
              ))}
            </div>
          )}
          {checkoutStep === 3 && (
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-stone-900 mb-4">Zahlungsmethode</h2>
              {["Kreditkarte","Klarna","PayPal","SEPA Lastschrift"].map((p, i) => (
                <label key={i} className="flex items-center gap-3 border border-stone-300 p-4 cursor-pointer hover:border-stone-900">
                  <input type="radio" name="pay" defaultChecked={i===0} />
                  <span>{p}</span>
                </label>
              ))}
              <label className="flex items-start gap-3 mt-6 text-sm text-stone-600">
                <input type="checkbox" className="mt-1" />
                <span>Ich akzeptiere die AGB und die Datenschutzerklärung. Ich stimme der Verarbeitung meiner Daten gemäß DSGVO zu.</span>
              </label>
            </div>
          )}
          <div className="flex justify-between pt-6">
            {checkoutStep > 1 && <button onClick={() => setCheckoutStep(checkoutStep-1)} className="px-6 py-3 border border-stone-300 hover:border-stone-900">Zurück</button>}
            <button onClick={() => checkoutStep < 3 ? setCheckoutStep(checkoutStep+1) : alert("Bestellung erfolgreich!")} className="ml-auto bg-stone-900 text-white px-8 py-3 hover:bg-stone-800">{checkoutStep === 3 ? "Jetzt kaufen" : "Weiter"}</button>
          </div>
        </div>
        <div className="bg-stone-50 p-6 h-fit">
          <h3 className="font-serif text-xl text-stone-900 mb-4">Bestellübersicht</h3>
          <div className="space-y-3 mb-4">
            {cart.map(i => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="text-stone-700">{i.name} × {i.qty}</span>
                <span>€{(i.price*i.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span>Zwischensumme</span><span>€{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Versand</span><span>{shipping === 0 ? "Frei" : `€${shipping}`}</span></div>
            <div className="flex justify-between font-serif text-lg text-stone-900 pt-2 border-t border-stone-200"><span>Gesamt</span><span>€{total.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );

  const Account = () => (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-stone-900 mb-8">Mein Konto</h1>
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="space-y-2 text-sm">
          {["Profil","Bestellungen","Adressen","Wunschliste","Einstellungen","Abmelden"].map(i => (
            <button key={i} className="block w-full text-left px-4 py-3 hover:bg-stone-100 text-stone-700">{i}</button>
          ))}
        </aside>
        <div className="md:col-span-3 bg-stone-50 p-8">
          <h2 className="font-serif text-2xl text-stone-900 mb-6">Willkommen zurück, Anna</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[{l:"Bestellungen",v:"12"},{l:"Wunschliste",v:wishlist.length},{l:"Bonuspunkte",v:"340"}].map((s,i)=>(
              <div key={i} className="bg-white p-4 text-center">
                <p className="font-serif text-3xl text-stone-900">{s.v}</p>
                <p className="text-stone-500 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
          <h3 className="font-serif text-lg text-stone-900 mb-4">Letzte Bestellungen</h3>
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white p-4 flex justify-between items-center">
                <div>
                  <p className="text-stone-900">Bestellung #2026-{1000+i}</p>
                  <p className="text-stone-500 text-sm">02.05.2026 · €{(450*i).toLocaleString()}</p>
                </div>
                <span className="text-green-700 text-sm">Geliefert</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Wishlist = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-stone-900 mb-8">Wunschliste</h1>
      {wishlist.length === 0 ? (
        <p className="text-stone-500">Deine Wunschliste ist leer.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => wishlist.includes(p.id)).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );

  const Blog = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Journal</p>
      <h1 className="font-serif text-5xl text-stone-900 mb-12">Inspiration & Stories</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Den perfekten Garten gestalten", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800", date: "12. April 2026" },
          { title: "Nachhaltige Möbel — was bedeutet das wirklich?", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", date: "28. März 2026" },
          { title: "Teakholz pflegen wie ein Profi", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800", date: "15. März 2026" },
        ].map((b, i) => (
          <article key={i} className="group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden bg-stone-100 mb-4">
              <img src={b.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <p className="text-stone-500 text-sm mb-2">{b.date}</p>
            <h2 className="font-serif text-2xl text-stone-900 group-hover:text-amber-700 transition">{b.title}</h2>
          </article>
        ))}
      </div>
    </div>
  );

  const About = () => (
    <div>
      <section className="relative h-96 flex items-center">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-stone-900/50" />
        <div className="relative max-w-4xl mx-auto px-6 text-white text-center">
          <p className="text-sm tracking-[0.3em] uppercase mb-3">Über uns</p>
          <h1 className="font-serif text-5xl">Handwerk mit Herz seit 1987</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-20 text-stone-700 leading-relaxed space-y-6">
        <p className="text-xl font-serif text-stone-900">Wir glauben an zeitloses Design, nachhaltige Materialien und ehrliches Handwerk.</p>
        <p>Terra & Holz wurde aus der Liebe zur Natur und zum traditionellen Handwerk geboren. In unseren Werkstätten in Süddeutschland und Portugal entstehen Möbel, die Generationen überdauern.</p>
        <p>Jedes Stück wird sorgfältig aus FSC-zertifiziertem Holz, recycelten Stoffen und natürlichen Materialien gefertigt. Wir arbeiten mit kleinen Manufakturen zusammen, die unsere Werte teilen.</p>
      </section>
    </div>
  );

  const Contact = () => (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-stone-900 mb-8">Kontakt</h1>
      <p className="text-stone-600 mb-8">Wir freuen uns auf deine Nachricht.</p>
      <div className="space-y-4">
        <input placeholder="Name" className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
        <input placeholder="E-Mail" className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
        <textarea placeholder="Nachricht" rows="6" className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-stone-900" />
        <button className="bg-stone-900 text-white px-8 py-3 hover:bg-stone-800">Senden</button>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-stone-900 font-serif text-lg">T</div>
            <div className="font-serif text-xl text-white">Terra & Holz</div>
          </div>
          <p className="text-sm text-stone-400">Premium Garten- und Wohnmöbel aus nachhaltigen Materialien.</p>
        </div>
        <div>
          <h4 className="font-serif text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            {categories.map(c => <li key={c.id}><button onClick={() => navigate("category", c.id)} className="hover:text-amber-400">{c.name}</button></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-white mb-4">Service</h4>
          <ul className="space-y-2 text-sm">
            {["FAQ","Versand","Rückgabe","Garantie","Kontakt"].map(i => <li key={i}><button className="hover:text-amber-400">{i}</button></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-white mb-4">Rechtliches</h4>
          <ul className="space-y-2 text-sm">
            {["Impressum","Datenschutz","AGB","Cookie-Einstellungen"].map(i => <li key={i}><button className="hover:text-amber-400">{i}</button></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 py-6 text-center text-sm text-stone-500">
        © 2026 Terra & Holz. Alle Rechte vorbehalten. · realcore Group
      </div>
    </footer>
  );

  const renderRoute = () => {
    switch(route) {
      case "home": return <Home />;
      case "shop": return <Shop />;
      case "category": return <Shop />;
      case "product": return <ProductDetail />;
      case "checkout": return <Checkout />;
      case "account": return <Account />;
      case "wishlist": return <Wishlist />;
      case "blog": return <Blog />;
      case "about": return <About />;
      case "contact": return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        h1, h2, h3, h4, .font-serif { font-family: Georgia, 'Times New Roman', serif; }
      `}</style>
      <Header />
      <main className="pt-24">
        {renderRoute()}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
