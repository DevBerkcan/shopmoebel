import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts, categories } from "@/lib/data/getProducts";
import ProductCard from "@/components/ui/ProductCard";
import NewsletterForm from "@/components/ui/NewsletterForm";
import MarqueeTestimonials from "@/components/ui/MarqueeTestimonials";
import AnimatedCounters from "@/components/ui/AnimatedCounter";
import BentoFeatures from "@/components/ui/BentoFeatures";
import BlurFadeText from "@/components/ui/BlurFadeText";
import ShimmerButton from "@/components/ui/ShimmerButton";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Terra & Holz — Premium Garten & Möbel",
  description:
    "Handgefertigte Premium Garten- und Wohnmöbel aus nachhaltigen, FSC-zertifizierten Materialien. Zeitloses Design für dein Zuhause.",
  openGraph: {
    title: "Terra & Holz — Premium Garten & Möbel",
    description: "Handgefertigte Premium Möbel aus nachhaltigen Materialien.",
    images: [{ url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Terra & Holz",
  description: "Premium Garten- und Wohnmöbel aus nachhaltigen Materialien",
  url: "https://terra-holz.de",
};

export default function HomePage() {
  const bestsellers = getAllProducts().slice(0, 4);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920"
          alt="Terra & Holz Kollektion"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <BlurFadeText
            text="Frühjahrskollektion 2026"
            className="text-sm tracking-[0.3em] uppercase mb-4 opacity-90"
            delay={0}
          />
          <BlurFadeText
            text="Natürlich schön. Handgefertigt mit Liebe."
            as="h1"
            className="font-serif text-5xl md:text-7xl leading-tight mb-6 max-w-2xl"
            byWord
            delay={200}
          />
          <BlurFadeText
            text="Premium Garten- und Wohnmöbel aus nachhaltigen Materialien. Zeitloses Design für dein Zuhause."
            className="text-lg max-w-lg mb-10 opacity-90"
            delay={600}
          />
          <div className="flex flex-wrap gap-4" style={{ opacity: 1 }}>
            <MagneticButton>
              <Link href="/shop">
                <ShimmerButton background="#1c1917" shimmerColor="rgba(255,255,255,0.25)">
                  Kollektion entdecken
                </ShimmerButton>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/about"
                className="inline-flex items-center border border-white/70 text-white px-8 py-4 hover:bg-white/10 transition tracking-wide text-sm backdrop-blur-sm"
              >
                Unsere Geschichte
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-float flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase">Entdecken</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ── Kategorien ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Kategorien</p>
          <BlurFadeText
            text="Für jeden Raum das Richtige"
            as="h2"
            className="font-serif text-4xl text-stone-900"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.id}`}
              className="group relative overflow-hidden aspect-[3/4] rounded-xl"
            >
              <Image
                src={c.img}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-serif text-xl text-white mb-1">{c.name}</h3>
                <span className="text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Jetzt entdecken →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Bestseller ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Bestseller</p>
              <h2 className="font-serif text-4xl text-stone-900">Unsere Lieblinge</h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-stone-700 hover:text-amber-700 transition text-sm group"
            >
              Alle ansehen
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Animated Stats ── */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedCounters />
        </div>
      </section>

      {/* ── Bento Features ── */}
      <BentoFeatures />

      {/* ── Marquee Testimonials ── */}
      <MarqueeTestimonials />

      {/* ── Newsletter ── */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-3">Newsletter</p>
          <BlurFadeText
            text="Bleib inspiriert"
            as="h2"
            className="font-serif text-4xl mb-4"
          />
          <p className="text-stone-300 mb-8">
            Erhalte 10% Rabatt auf deine erste Bestellung und exklusive Einblicke in neue Kollektionen.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
