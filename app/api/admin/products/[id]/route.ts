import { NextRequest, NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct, slugify } from "@/lib/admin/productStore";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const product = getProductById(Number(params.id));
  if (!product) return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json();
    const id = Number(params.id);

    const updates: Record<string, any> = {};
    if (body.name) { updates.name = body.name.trim(); updates.slug = slugify(body.name); }
    if (body.price !== undefined) updates.price = Number(body.price);
    if ("oldPrice" in body) updates.oldPrice = body.oldPrice ? Number(body.oldPrice) : undefined;
    if (body.category) updates.category = body.category;
    if (body.img) updates.img = body.img;
    if (body.desc) updates.desc = body.desc.trim();
    if ("badge" in body) updates.badge = body.badge || undefined;
    if (body.stock !== undefined) updates.stock = Number(body.stock);
    if (body.lowStockThreshold !== undefined) updates.lowStockThreshold = Number(body.lowStockThreshold);
    if (body.variants) updates.variants = body.variants;

    const updated = updateProduct(id, updates);
    if (!updated) return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: "Fehler beim Aktualisieren" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const ok = deleteProduct(Number(params.id));
  if (!ok) return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  return NextResponse.json({ success: true });
}
