"use client";

import Image from "next/image";

type Testimonial = {
  name: string;
  handle: string;
  text: string;
  avatar: string;
  rating?: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Anna Müller",
    handle: "@anna_interior",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
    text: "Das Teak Loungeset hat unsere Terrasse komplett verwandelt. Außergewöhnliche Qualität, die man sofort spürt.",
    rating: 5,
  },
  {
    name: "Thomas Keller",
    handle: "@tkeller_home",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
    text: "Schnelle Lieferung, perfekte Verpackung und das Loungeset übersteigt alle Erwartungen. Traumhaft!",
    rating: 5,
  },
  {
    name: "Lisa Schmidt",
    handle: "@lisa_wohnt",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
    text: "Endlich nachhaltige Möbel mit echtem Stil. Der Esstisch aus Eiche ist ein Meisterstück.",
    rating: 5,
  },
  {
    name: "Markus Weber",
    handle: "@mweber_design",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80",
    text: "Service und Produktqualität auf Weltklasse-Niveau. Das Sofa Nord ist seit 6 Monaten täglich in Gebrauch — perfekt.",
    rating: 5,
  },
  {
    name: "Sarah Braun",
    handle: "@sarah_garten",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80",
    text: "Der Olivenbaum ist wunderschön und winterhart wie versprochen. Terra & Holz hat mein Vertrauen gewonnen.",
    rating: 5,
  },
  {
    name: "Felix Hoffmann",
    handle: "@felix_arch",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80",
    text: "Als Architekt kenne ich hochwertige Materialien. Terra & Holz liefert genau das — mit Stil und Seele.",
    rating: 5,
  },
  {
    name: "Julia Bauer",
    handle: "@julia_b",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80",
    text: "Die Gartenliege Sol macht jeden Morgen zum Genuss. Beste Investition des Jahres ohne Zweifel.",
    rating: 5,
  },
  {
    name: "David Fischer",
    handle: "@dfischer",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80",
    text: "Bereits die zweite Bestellung. Qualität, Design und Service überzeugen jedes Mal aufs Neue.",
    rating: 5,
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white border border-stone-100 rounded-2xl p-6 mx-3 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
        </div>
        <div>
          <p className="font-medium text-stone-900 text-sm">{t.name}</p>
          <p className="text-stone-400 text-xs">{t.handle}</p>
        </div>
        <div className="ml-auto text-amber-500 text-xs tracking-tight">★★★★★</div>
      </div>
      <p className="text-stone-600 text-sm leading-relaxed">"{t.text}"</p>
    </div>
  );
}

type Props = {
  title?: string;
  subtitle?: string;
};

export default function MarqueeTestimonials({
  title = "Geliebt von tausenden Kunden",
  subtitle = "Was unsere Kunden über ihre Terra & Holz Erfahrung sagen",
}: Props) {
  // Duplicate 4× for seamless loop
  const doubled = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Kundenstimmen</p>
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">{title}</h2>
        <p className="text-stone-500 max-w-xl mx-auto">{subtitle}</p>
      </div>

      {/* Row 1 — left to right */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none" />
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {doubled.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none" />
        <div
          className="flex animate-marquee"
          style={{
            width: "max-content",
            animationDirection: "reverse",
            animationDuration: "50s",
          }}
        >
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={`row2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
