import { db } from "@/lib/db";
import ProductPageClient from "./ProductPageClient";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: { variants: true },
  });

  if (!product) notFound();

  return (
    <ProductPageClient
      product={{
        id: product!.id,
        slug: product!.slug,
        name: product!.name,
        description: product!.description,
        price: product!.price,
        badge: product!.badge,
        stock: product!.variants.reduce((sum, v) => sum + v.stock, 0),
        features: [],
        colors: product!.variants.map((v) => ({
          name: v.color,
          hex: v.colorHex,
          image: v.image,
        })),
      }}
    />
  );
}