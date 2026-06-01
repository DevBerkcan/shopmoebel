"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Props = {
  totalItems: number;
  perPage: number;
  currentPage: number;
};

export default function Pagination({ totalItems, perPage, currentPage }: Props) {
  const totalPages = Math.ceil(totalItems / perPage);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 border border-stone-300 text-stone-700 hover:border-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        ←
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goTo(page)}
          className={`w-10 h-10 border text-sm transition ${
            page === currentPage
              ? "bg-stone-900 text-white border-stone-900"
              : "border-stone-300 text-stone-700 hover:border-stone-900"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 border border-stone-300 text-stone-700 hover:border-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        →
      </button>
    </div>
  );
}
