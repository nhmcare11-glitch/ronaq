import Link from "next/link";
import { db } from "@/lib/db";
import ProductCard from "./ProductCard";
import AnimatedSection from "./AnimatedSection";

export default async function ProductsSection() {
  const products = await db.product.findMany({
    where: { isFeatured: true },
    include: { variants: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  if (products.length === 0) return null;

  return (
    <section style={{ padding: "0 20px 48px", background: "var(--ivory)" }}>
      <AnimatedSection>
        <div style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "20px",
          paddingTop: "32px",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 300,
            color: "var(--charcoal)",
          }}>
            الأكثر <em style={{ fontStyle: "italic", color: "var(--gold)" }}>رواجاً</em>
          </h2>
          <Link href="/products" style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
          }}>
            الكل ←
          </Link>
        </div>
      </AnimatedSection>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
      }}>
        {products.map((product, i) => (
          <AnimatedSection key={product.id} delay={i * 100}>
            <ProductCard
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                badge: product.badge ?? undefined,
                image: product.variants[0]?.image ?? "",
                colors: product.variants.map((v) => ({
                  name: v.color,
                  hex: v.colorHex,
                  image: v.image,
                })),
              }}
            />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}