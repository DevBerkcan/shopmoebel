import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Journal | Terra & Holz",
  description: "Inspiration, Pflegetipps und Designideen rund um nachhaltige Möbel und Garten.",
};

const posts = [
  {
    slug: "perfekten-garten-gestalten",
    title: "Den perfekten Garten gestalten",
    excerpt: "Wie du deinen Außenbereich mit nachhaltigen Möbeln und Pflanzen in eine Oase verwandelst.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    date: "12. April 2026",
    category: "Garten",
    readTime: "5 min",
  },
  {
    slug: "nachhaltige-moebel",
    title: "Nachhaltige Möbel — was bedeutet das wirklich?",
    excerpt: "Was steckt hinter Begriffen wie FSC-Zertifizierung, recycelten Materialien und fairer Produktion?",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    date: "28. März 2026",
    category: "Nachhaltigkeit",
    readTime: "7 min",
  },
  {
    slug: "teakholz-pflegen",
    title: "Teakholz pflegen wie ein Profi",
    excerpt: "Schritt-für-Schritt Anleitung für die richtige Pflege deiner Teakmöbel — saisonal und langfristig.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    date: "15. März 2026",
    category: "Pflege",
    readTime: "4 min",
  },
];

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Journal" }];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Breadcrumb items={breadcrumbs} />
      <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Journal</p>
      <h1 className="font-serif text-5xl text-stone-900 mb-12">Inspiration & Stories</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="group cursor-pointer">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-4">
              <Image
                src={post.img}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-white text-stone-900 text-xs px-3 py-1">
                {post.category}
              </span>
            </div>
            <div className="flex items-center gap-3 text-stone-500 text-sm mb-2">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} Lesezeit</span>
            </div>
            <h2 className="font-serif text-2xl text-stone-900 group-hover:text-amber-700 transition mb-2">
              {post.title}
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
