import SkeletonCard from "@/components/ui/SkeletonCard";

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="h-4 bg-stone-200 animate-pulse rounded w-16 mb-3" />
        <div className="h-12 bg-stone-200 animate-pulse rounded w-64" />
      </div>
      <div className="flex gap-3 mb-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-24 bg-stone-200 animate-pulse rounded" />
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
