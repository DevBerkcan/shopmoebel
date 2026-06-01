import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/admin/productStore";
import ProductForm from "@/components/admin/ProductForm";

type Props = { params: { id: string } };

export default function EditProductPage({ params }: Props) {
  const product = getProductById(Number(params.id));
  if (!product) return notFound();

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/products"
          className="text-stone-500 hover:text-stone-300 transition text-sm"
        >
          ← Produkte
        </Link>
        <span className="text-stone-700">/</span>
        <h1 className="font-serif text-3xl text-white">
          Bearbeiten: <span className="text-amber-500">{product.name}</span>
        </h1>
      </div>

      {/* Live preview link */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href={`/shop/${product.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-amber-400 transition border border-stone-700 px-3 py-1.5 rounded-lg"
        >
          <span>Im Shop ansehen</span>
          <span>↗</span>
        </Link>
        <span className="text-stone-600 text-xs">ID: #{product.id}</span>
      </div>

      <ProductForm product={product} mode="edit" />
    </div>
  );
}
