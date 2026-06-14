import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: { variants: true, category: true },
    });
    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const {
      name, slug, description, price,
      badge, categorySlug, isFeatured, variants,
    } = await req.json();

    let category = await db.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) {
      const categoryNames: Record<string, string> = {
        wallets:     "محافظ",
        backpacks:   "حقائب ظهر",
        accessories: "إكسسوارات",
      };
      category = await db.category.create({
        data: {
          slug: categorySlug,
          name: categoryNames[categorySlug] || categorySlug,
        },
      });
    }

    await db.variant.deleteMany({ where: { productId: id } });

    const product = await db.product.update({
      where: { id },
      data: {
        name, slug, description, price,
        badge: badge || null,
        isFeatured,
        categoryId: category.id,
        variants: {
          create: variants.map((v: any) => ({
            color:    v.color,
            colorHex: v.colorHex,
            image:    v.image,
            stock:    v.stock || 0,
          })),
        },
      },
    });

    return NextResponse.json({ message: "تم التعديل بنجاح", product });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "هذا الـ slug مستخدم مسبقاً" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await db.variant.deleteMany({ where: { productId: id } });
    await db.product.delete({ where: { id } });
    return NextResponse.json({ message: "تم حذف المنتج بنجاح" });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
