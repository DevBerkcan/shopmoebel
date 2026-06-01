"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Category, SortOption } from "@/lib/data/types";

type Props = {
  categories: Category[];
  currentCategory?: string;
  currentSort: SortOption;
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Preis ↑" },
  { value: "price-desc", label: "Preis ↓" },
  { value: "newest", label: "Neueste" },
  { value: "top-rated", label: "Beste Bewertung" },
];

export default function ShopFilters({ categories, currentCategory, currentSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => update("category", null)}
          className={`px-5 py-2 text-sm border transition ${
            !currentCategory
              ? "bg-stone-900 text-white border-stone-900"
              : "border-stone-300 text-stone-700 hover:border-stone-900"
          }`}
        >
          Alle
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => update("category", c.id)}
            className={`px-5 py-2 text-sm border transition ${
              currentCategory === c.id
                ? "bg-stone-900 text-white border-stone-900"
                : "border-stone-300 text-stone-700 hover:border-stone-900"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <select
        value={currentSort}
        onChange={(e) => update("sort", e.target.value)}
        className="border border-stone-300 px-4 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-900 bg-white"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
