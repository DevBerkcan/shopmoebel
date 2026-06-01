import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
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
        <h1 className="font-serif text-3xl text-white">Neues Produkt</h1>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
