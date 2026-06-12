import { db } from "@/lib/db";
import Link from "next/link";

const categoryIcons: Record<string, string> = {
  handbags:    "👜",
  wallets:     "👛",
  backpacks:   "🎒",
  accessories: "💍",
};

const categoryColors: Record<string, string> = {
  handbags:    "#C4AB5A",
  wallets:     "#B8973A",
  backpacks:   "#8C8070",
  accessories: "#7A6E5F",
};

export default async function CategoriesSection() {
  const categories = await db.category.findMany({
    include: { _count: { select: { products: true } } },
  });

  if (categories.length === 0) return null;

  return (
    <section style={{ padding: "48px 20px", background: "var(--ivory)" }}>

      <div style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}>
       
        <Link href="/categories" style={{
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--gold)",
          textDecoration: "none",
        }}>
          الكل ←
        </Link>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
      }}>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/categories/${cat.slug}`} style={{ textDecoration: "none" }}>
            <div>
              <div style={{
                height: "110px",
                background: categoryColors[cat.slug] ?? "var(--gold-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
              }}>
                {categoryIcons[cat.slug] ?? "👜"}
              </div>
              <div style={{ paddingTop: "8px" }}>
                <div style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--charcoal)",
                  fontWeight: 400,
                }}>
                  {cat.name}
                </div>
                <div style={{
                  fontSize: "11px",
                  color: "var(--taupe)",
                  fontWeight: 300,
                  marginTop: "2px",
                }}>
                  {cat._count.products} منتجاً
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}