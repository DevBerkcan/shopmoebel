import { NextRequest, NextResponse } from "next/server";
import { readProducts, createProduct, slugify } from "@/lib/admin/productStore";

export async function GET() {
  try {
    const products = readProducts();
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({ error: "Fehler beim Laden der Produkte" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, oldPrice, category, img, desc, badge, stock, lowStockThreshold } = body;

    if (!name || !price || !category || !img || !desc) {
      return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
    }

    const product = createProduct({
      slug: slugify(name),
      name: name.trim(),
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      category,
      img,
      desc: desc.trim(),
      badge: badge || undefined,
      stock: Number(stock ?? 10),
      lowStockThreshold: Number(lowStockThreshold ?? 3),
      variants: body.variants ?? [],
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Fehler beim Erstellen" }, { status: 500 });
  }
}
