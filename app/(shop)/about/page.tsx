import Image from "next/image";
import type { Metadata } from "next";
import AnimatedCounters from "@/components/ui/AnimatedCounter";
import BlurFadeText from "@/components/ui/BlurFadeText";
import BentoFeatures from "@/components/ui/BentoFeatures";

export const metadata: Metadata = {
  title: "Über uns | Terra & Holz",
  description: "Seit 1987 fertigen wir handgefertigte Premium-Möbel aus nachhaltigen Materialien — mit Liebe zum Handwerk und Respekt für die Natur.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920"
          alt="Terra & Holz Werkstatt"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-stone-900/55" />
        <div className="relative max-w-4xl mx-auto px-6 text-white text-center">
          <BlurFadeText text="Über uns" className="text-sm tracking-[0.3em] uppercase mb-4 opacity-80" />
          <BlurFadeText
            text="Handwerk mit Herz seit 1987"
            as="h1"
            className="font-serif text-5xl md:text-6xl"
            byWord
            delay={200}
          />
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-stone-700 leading-relaxed space-y-6">
        <BlurFadeText
          text="Wir glauben an zeitloses Design, nachhaltige Materialien und ehrliches Handwerk."
          as="p"
          className="text-xl font-serif text-stone-900"
        />
        <p>
          Terra & Holz wurde aus der Liebe zur Natur und zum traditionellen Handwerk geboren. In unseren
          Werkstätten in Süddeutschland und Portugal entstehen Möbel, die Generationen überdauern.
        </p>
        <p>
          Jedes Stück wird sorgfältig aus FSC-zertifiziertem Holz, recycelten Stoffen und natürlichen
          Materialien gefertigt. Wir arbeiten mit kleinen Manufakturen zusammen, die unsere Werte teilen —
          faire Löhne, minimaler CO₂-Fußabdruck, maximale Qualität.
        </p>
        <p>
          Was 1987 als kleine Schreinerei in München begann, ist heute eine der angesehensten Adressen
          für nachhaltige Premium-Möbel im deutschsprachigen Raum. Über 12.000 Kunden vertrauen uns —
          und das macht uns jeden Tag aufs Neue stolz.
        </p>
      </section>

      {/* Stats */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedCounters />
        </div>
      </section>

      {/* Bento */}
      <BentoFeatures />

      {/* Values */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Unsere Werte</p>
            <h2 className="font-serif text-4xl text-stone-900">Was uns antreibt</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Nachhaltigkeit",
                icon: "🌱",
                text: "FSC-Zertifizierung ist für uns nicht nur ein Siegel, sondern eine Verpflichtung gegenüber kommenden Generationen.",
              },
              {
                title: "Handwerkskunst",
                icon: "🪵",
                text: "Jedes Möbelstück trägt die Handschrift unserer Handwerker — Perfektion im Detail, Wärme im Ganzen.",
              },
              {
                title: "Langlebigkeit",
                icon: "♾️",
                text: "Wir bauen keine Möbel für Trends, sondern für das Leben. 5 Jahre Garantie sind unser Versprechen.",
              },
            ].map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl text-center">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="font-serif text-xl text-stone-900 mb-3">{v.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
