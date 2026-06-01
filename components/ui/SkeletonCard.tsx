export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-stone-200 aspect-[4/5] mb-4" />
      <div className="space-y-2">
        <div className="h-5 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-200 rounded w-1/3" />
        <div className="h-4 bg-stone-200 rounded w-1/4" />
      </div>
    </div>
  );
}
