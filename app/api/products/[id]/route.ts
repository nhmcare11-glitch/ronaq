export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // تعديل المنتج
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

    // حذف الألوان القديمة وإعادة إنشائها
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