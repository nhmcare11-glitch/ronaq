import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "فشل الجلب" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.orderItem.deleteMany({ where: { productId: id } });
    await db.variant.deleteMany({ where: { productId: id } });
    await db.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "فشل الحذف" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const product = await db.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        badge: body.badge || null,
        isFeatured: body.isFeatured,
        category: {
          connect: { slug: body.categorySlug },
        },
      },
    });

    await db.variant.deleteMany({ where: { productId: id } });
    await db.variant.createMany({
      data: body.variants.map((v: any) => ({
        productId: id,
        color: v.color,
        colorHex: v.colorHex,
        image: v.image,
        stock: v.stock,
      })),
    });

    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "فشل التعديل" }, { status: 500 });
  }
}