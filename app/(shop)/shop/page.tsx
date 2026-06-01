import type { Metadata } from "next";
import { getAllProducts, categories } from "@/lib/data/getProducts";
import { getCategoryName } from "@/lib/data/products";
import type { SortOption } from "@/lib/data/types";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import ShopFilters from "./ShopFilters";

const PER_PAGE = 12;

type SearchParams = {
  category?: string;
  sort?: SortOption;
  page?: string;
  maxPrice?: string;
};

type Props = { searchParams: Promise<SearchParams> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const catName = params.category ? getCategoryName(params.category) : "Alle Produkte";
  return {
    title: `${catName} | Terra & Holz Shop`,
    description: `Entdecke unsere ${catName} — handgefertigte Premium-Möbel aus nachhaltigen Materialien.`,
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const { category, sort = "featured", page, maxPrice } = params;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10));
  const maxPriceNum = maxPrice ? parseInt(maxPrice, 10) : Infinity;

  const products = getAllProducts();
  let filtered = products.filter(
    (p) => (!category || p.category === category) && p.price <= maxPriceNum
  );

  switch (sort) {
    case "price-asc":
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case "top-rated":
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered = [...filtered].sort((a, b) => b.id - a.id);
      break;
  }

  const totalItems = filtered.length;
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const catName = category ? getCategoryName(category) : "Alle Produkte";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-3">Shop</p>
        <h1 className="font-serif text-5xl text-stone-900">{catName}</h1>
        <p className="text-stone-500 mt-2">{totalItems} Produkte</p>
      </div>

      <ShopFilters categories={categories} currentCategory={category} currentSort={sort} />

      {paginated.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-stone-500 text-lg">Keine Produkte gefunden.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Pagination totalItems={totalItems} perPage={PER_PAGE} currentPage={currentPage} />
    </div>
  );
}
