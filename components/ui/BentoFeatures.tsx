import Image from "next/image";
import Link from "next/link";

type BentoItem = {
  title: string;
  description: string;
  icon?: string;
  img?: string;
  span?: "col" | "row" | "both";
  href?: string;
  badge?: string;
  dark?: boolean;
};

const items: BentoItem[] = [
  {
    title: "FSC-zertifiziertes Teakholz",
    description: "Jedes Möbelstück entsteht aus nachhaltig gewonnenem Holz mit vollständiger Herkunftsdokumentation.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    span: "both",
    badge: "Nachhaltigkeit",
    href: "/about",
  },
  {
    title: "5 Jahre Garantie",
    description: "Wir stehen hinter unserer Qualität — auf jedes Möbelstück.",
    icon: "🛡️",
    dark: true,
  },
  {
    title: "Kostenloser Versand",
    description: "Ab 500€ Bestellwert liefern wir kostenfrei nach Deutschland.",
    icon: "🚚",
  },
  {
    title: "Handgefertigt seit 1987",
    description: "Über 37 Jahre Expertise in der Verarbeitung edler Naturmaterialien — in unseren eigenen Werkstätten.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    span: "col",
    href: "/about",
  },
  {
    title: "30 Tage Rückgabe",
    description: "Nicht zufrieden? Kein Problem. Kostenlose Rückgabe ohne Fragen.",
    icon: "↩️",
  },
  {
    title: "Über 12.000 Kunden",
    description: "Deutschlandweit vertrauen Tausende auf unsere Möbel.",
    icon: "❤️",
    dark: true,
  },
];

function BentoCard({ item }: { item: BentoItem }) {
  const colSpan =
    item.span === "both" || item.span === "col"
      ? "md:col-span-2"
      : "md:col-span-1";

  const content = (
    <div
      className={`relative overflow-hidden rounded-2xl border border-stone-100 h-full min-h-[200px] group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        item.dark ? "bg-stone-900 text-white" : "bg-white text-stone-900"
      } ${colSpan}`}
    >
      {item.img && (
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      {item.img && (
        <div
          className={`absolute inset-0 ${
            item.span === "both"
              ? "bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent"
              : "bg-gradient-to-t from-stone-900/80 to-transparent"
          }`}
        />
      )}

      <div className="relative z-10 p-7 h-full flex flex-col justify-end">
        {item.badge && (
          <span className="inline-block bg-amber-700 text-white text-xs px-3 py-1 rounded-full mb-3 self-start tracking-wide uppercase">
            {item.badge}
          </span>
        )}
        {item.icon && (
          <div className="text-4xl mb-4">{item.icon}</div>
        )}
        <h3
          className={`font-serif text-xl mb-2 ${
            item.img || item.dark ? "text-white" : "text-stone-900"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`text-sm leading-relaxed ${
            item.img ? "text-stone-200" : item.dark ? "text-stone-400" : "text-stone-500"
          }`}
        >
          {item.description}
        </p>
        {item.href && (
          <span
            className={`mt-4 text-xs uppercase tracking-wide flex items-center gap-1 transition-all group-hover:gap-2 ${
              item.img || item.dark ? "text-amber-400" : "text-amber-700"
            }`}
          >
            Mehr erfahren →
          </span>
        )}
      </div>
    </div>
  );

  return item.href ? <Link href={item.href}>{content}</Link> : content;
}

export default function BentoFeatures() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Warum Terra & Holz</p>
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900">
          Qualität, die man spürt
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
        {items.map((item, i) => (
          <BentoCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
