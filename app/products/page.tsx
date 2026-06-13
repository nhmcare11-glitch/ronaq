import { db } from "@/lib/db";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;

  const categories = await db.category.findMany();

  const products = await db.product.findMany({
    where: category
      ? { category: { slug: category } }
      : undefined,
    include: { variants: true, category: true },
    orderBy:
      sort === "price-asc"
        ? { price: "asc" }
        : sort === "price-desc"
        ? { price: "desc" }
        : { createdAt: "desc" },
  });

  return (
    <div style={{ background: "var(--ivory)", minHeight: "100vh", paddingBottom: "80px" }}>

      {/* الهيدر */}
      <div style={{
        padding: "28px 20px 0",
        borderBottom: "0.5px solid var(--border)",
        marginBottom: "0",
      }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "6px",
          fontWeight: 300,
        }}>
          ✦ رونق
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "32px",
          fontWeight: 300,
          color: "var(--charcoal)",
          marginBottom: "16px",
        }}>
          جميع <em style={{ fontStyle: "italic", color: "var(--gold)" }}>المنتجات</em>
        </h1>

        {/* فلاتر التصنيف */}
        <div style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "16px",
        }}>
          <Link
            href="/products"
            style={{
              whiteSpace: "nowrap",
              padding: "7px 16px",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              flexShrink: 0,
              background: !category ? "var(--charcoal)" : "transparent",
              color: !category ? "var(--ivory)" : "var(--charcoal)",
              border: "0.5px solid var(--border)",
            }}
          >
            الكل
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              style={{
                whiteSpace: "nowrap",
                padding: "7px 16px",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                flexShrink: 0,
                background: category === cat.slug ? "var(--charcoal)" : "transparent",
                color: category === cat.slug ? "var(--ivory)" : "var(--charcoal)",
                border: "0.5px solid var(--border)",
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* شريط الترتيب */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        borderBottom: "0.5px solid var(--border)",
      }}>
        <span style={{ fontSize: "12px", color: "var(--taupe)", fontWeight: 300 }}>
          {products.length} منتج
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { label: "الأحدث",    value: "newest" },
            { label: "الأرخص",    value: "price-asc" },
            { label: "الأغلى",    value: "price-desc" },
          ].map((s) => (
            <Link
              key={s.value}
              href={`/products?${category ? `category=${category}&` : ""}sort=${s.value}`}
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "5px 10px",
                fontFamily: "var(--font-body)",
                background:
                  (sort === s.value || (!sort && s.value === "newest"))
                    ? "var(--charcoal)"
                    : "transparent",
                color:
                  (sort === s.value || (!sort && s.value === "newest"))
                    ? "var(--ivory)"
                    : "var(--taupe)",
                border: "0.5px solid var(--border)",
              }}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      {/* المنتجات */}
      <div style={{ padding: "20px" }}>
        {products.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 300,
            color: "var(--taupe)",
          }}>
            لا توجد منتجات في هذا التصنيف
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}