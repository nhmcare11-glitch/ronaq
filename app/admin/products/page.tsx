export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, variants: true },
  });

  return (
    <div>
      {/* الهيدر */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "24px",
      }}>
        <div>
          <div style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "6px",
            fontWeight: 300,
          }}>
            ✦ إدارة
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "32px",
            fontWeight: 300,
            color: "var(--charcoal)",
          }}>
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>المنتجات</em>
          </h1>
        </div>
        <Link href="/admin/products/new" style={{
          background: "var(--charcoal)",
          color: "var(--ivory)",
          padding: "12px 20px",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
          fontFamily: "var(--font-body)",
        }}>
          + إضافة منتج
        </Link>
      </div>

      {/* الجدول */}
      {products.length === 0 ? (
        <div style={{
          border: "0.5px solid var(--border)",
          padding: "60px 40px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛍</div>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 300,
            color: "var(--charcoal)",
            marginBottom: "8px",
          }}>
            لا توجد منتجات بعد
          </div>
          <Link href="/admin/products/new" style={{
            fontSize: "12px",
            color: "var(--gold)",
            textDecoration: "none",
            letterSpacing: "0.1em",
          }}>
            أضيفي منتجك الأول ←
          </Link>
        </div>
      ) : (
        <div style={{ border: "0.5px solid var(--border)" }}>
          {/* رأس الجدول */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "60px 1fr 120px 80px 80px 100px",
            padding: "12px 16px",
            background: "var(--sand)",
            borderBottom: "0.5px solid var(--border)",
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--taupe)",
          }}>
            <span>صورة</span>
            <span>المنتج</span>
            <span>التصنيف</span>
            <span>السعر</span>
            <span>الألوان</span>
            <span>إجراءات</span>
          </div>

          {products.map((product) => (
            <div key={product.id} style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 120px 80px 80px 100px",
              padding: "14px 16px",
              borderBottom: "0.5px solid var(--border)",
              alignItems: "center",
              fontSize: "13px",
              color: "var(--charcoal)",
            }}>
              {/* الصورة */}
              <div style={{
                width: "48px",
                height: "48px",
                background: "var(--sand)",
                overflow: "hidden",
              }}>
                {product.variants[0]?.image && (
                  <img
                    src={product.variants[0].image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>

              {/* الاسم */}
              <div>
                <div style={{ fontWeight: 400 }}>{product.name}</div>
                <div style={{
                  fontSize: "10px",
                  color: "var(--taupe)",
                  fontWeight: 300,
                  marginTop: "2px",
                }}>
                  {product.slug}
                </div>
              </div>

              {/* التصنيف */}
              <div style={{
                fontSize: "11px",
                color: "var(--taupe)",
                fontWeight: 300,
              }}>
                {product.category.name}
              </div>

              {/* السعر */}
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                color: "var(--gold)",
              }}>
                {product.price.toLocaleString()}
              </div>

              {/* الألوان */}
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                {product.variants.map((v) => (
                  <span key={v.id} style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: v.colorHex,
                    border: "0.5px solid var(--border)",
                    display: "block",
                  }} />
                ))}
              </div>

              {/* الإجراءات */}
              <div style={{ display: "flex", gap: "8px" }}>
                <Link href={`/admin/products/${product.id}/edit`} style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "var(--charcoal)",
                  textDecoration: "none",
                  padding: "4px 10px",
                  border: "0.5px solid var(--border)",
                }}>
                  تعديل
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}