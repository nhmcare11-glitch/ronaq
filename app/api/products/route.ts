import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";

    const products = await db.product.findMany({
      where: search ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      } : undefined,
      include: { variants: true, category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function POST(req: Request) {
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

    const product = await db.product.create({
      data: {
        name,
        slug,
        description,
        price,
        badge: badge || null,
        isFeatured: isFeatured || false,
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

    return NextResponse.json(
      { message: "تم إضافة المنتج بنجاح", productId: product.id },
      { status: 201 }
    );
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