import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const product = await db.product.findUnique({
      where: { slug },
      include: { variants: true, category: true },
    });

    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    return NextResponse.json({
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.price,
      badge: product.badge,
      stock: product.variants.reduce((sum, v) => sum + v.stock, 0),
      features: [],
      colors: product.variants.map((v) => ({
        name: v.color,
        hex: v.colorHex,
        image: v.image,
      })),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}