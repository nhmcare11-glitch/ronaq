import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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

export async function PUT(
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
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "فشل التعديل" }, { status: 500 });
  }
}