import Link from "next/link";

type Crumb = { label: string; href?: string };

type Props = { items: Crumb[] };

export default function Breadcrumb({ items }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://terra-holz.de${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        {items.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-stone-300">/</span>}
            {crumb.href && i < items.length - 1 ? (
              <Link href={crumb.href} className="hover:text-amber-700 transition">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-stone-900">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
