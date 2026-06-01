export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
      <div className="h-4 bg-stone-200 rounded w-48 mb-8" />
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square bg-stone-200 mb-4" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-stone-200" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-stone-200 rounded w-3/4" />
          <div className="h-4 bg-stone-200 rounded w-1/3" />
          <div className="h-10 bg-stone-200 rounded w-1/4" />
          <div className="h-20 bg-stone-200 rounded" />
          <div className="h-12 bg-stone-200 rounded" />
        </div>
      </div>
    </div>
  );
}
