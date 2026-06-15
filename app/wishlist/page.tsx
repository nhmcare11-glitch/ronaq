"use client";

import { useWishlistStore } from "@/lib/store/wishlistStore";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  if (items.length === 0) {
    return (
      <div style={{
        minHeight: "70vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "16px",
        fontFamily: "var(--font-display)",
      }}>
        <div style={{ fontSize: "48px" }}>♡</div>
        <div style={{ fontSize: "20px", color: "var(--taupe)", fontWeight: 300 }}>
          قائمة المفضلة فارغة
        </div>
        <Link href="/products" style={{
          fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
          color: "var(--gold)", textDecoration: "none",
        }}>
          تصفحي المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--ivory)", minHeight: "100vh", padding: "24px 20px" }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 400,
        color: "var(--charcoal)", marginBottom: "6px",
      }}>
        المفضلة
      </h1>
      <p style={{ fontSize: "11px", color: "var(--taupe)", letterSpacing: "0.1em", marginBottom: "24px" }}>
        {items.length} منتج
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {items.map((item) => (
          <div key={item.id} style={{
            display: "flex", gap: "14px", padding: "14px",
            border: "0.5px solid var(--border)", background: "white",
          }}>
            {/* الصورة */}
            <div style={{ width: "90px", height: "90px", flexShrink: 0, background: "var(--sand)", overflow: "hidden" }}>
              {item.image ? (
                <img src={item.image} alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>👜</div>
              )}
            </div>

            {/* المعلومات */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <Link href={`/products/${item.slug}`} style={{
                  fontFamily: "var(--font-display)", fontSize: "16px",
                  color: "var(--charcoal)", textDecoration: "none", fontWeight: 400,
                }}>
                  {item.name}
                </Link>
                <div style={{ fontSize: "13px", color: "var(--gold)", marginTop: "4px" }}>
                  {item.price.toLocaleString()} دج
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => {
                addToCart({ 
  ...item, 
  quantity: 1,
  color: "",
  colorHex: "",
});
                }} style={{
                  flex: 1, padding: "8px", background: "var(--charcoal)",
                  color: "var(--ivory)", border: "none", fontSize: "10px",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  fontFamily: "var(--font-body)", cursor: "pointer",
                }}>
                  أضف للسلة
                </button>
                <button onClick={() => removeItem(item.id)} style={{
                  width: "36px", height: "36px", border: "0.5px solid var(--border)",
                  background: "transparent", cursor: "pointer", fontSize: "16px",
                  color: "var(--taupe)", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}