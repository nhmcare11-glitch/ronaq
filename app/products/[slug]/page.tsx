"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useParams } from "next/navigation";

type Color = { name: string; hex: string; image: string };
type Product = {
  id: string; slug: string; name: string; description: string;
  price: number; badge: string | null; stock: number;
  features: string[]; colors: Color[];
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeColor, setActiveColor] = useState(0);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const wished = product ? wishlistItems.some((i) => i.id === product.id) : false;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  function handleAddToCart() {
    if (!product) return;
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.colors[activeColor]?.image,
      color: product.colors[activeColor]?.name,
      colorHex: product.colors[activeColor]?.hex,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  // ✅ دالة القلب الصحيحة
  function handleWishlist() {
    if (!product) return;
    if (wished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.colors[activeColor]?.image ?? "",
      });
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "60vh", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "var(--font-display)",
        fontSize: "22px", color: "var(--taupe)", fontWeight: 300,
      }}>
        جاري التحميل...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{
        minHeight: "60vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "16px",
      }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--taupe)" }}>
          المنتج غير موجود
        </div>
        <Link href="/products" style={{ color: "var(--gold)", textDecoration: "none", fontSize: "13px" }}>
          العودة للمنتجات
        </Link>
      </div>
    );
  }

  const currentImage = product.colors[activeColor]?.image || "";

  return (
    <div style={{ background: "var(--ivory)", minHeight: "100vh", paddingBottom: "140px" }}>
      <div style={{ padding: "14px 20px", borderBottom: "0.5px solid var(--border)" }}>
        <Link href="/products" style={{
          fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--taupe)", textDecoration: "none",
        }}>
          → المنتجات / <span style={{ color: "var(--charcoal)" }}>{product.name}</span>
        </Link>
      </div>

      <div style={{ width: "100%", height: "360px", background: "var(--sand)", overflow: "hidden", position: "relative" }}>
        {currentImage ? (
          <img src={currentImage} alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px" }}>👜</div>
        )}
        {product.badge && (
          <div style={{
            position: "absolute", top: "16px", right: "16px",
            background: "var(--gold)", color: "var(--ivory)",
            fontSize: "9px", letterSpacing: "0.15em", padding: "4px 10px", textTransform: "uppercase",
          }}>
            {product.badge}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", padding: "12px 20px", borderBottom: "0.5px solid var(--border)", overflowX: "auto" }}>
        {product.colors.map((color, i) => (
          <button key={i} onClick={() => setActiveColor(i)} style={{
            width: "64px", height: "64px", padding: 0, flexShrink: 0,
            border: i === activeColor ? "2px solid var(--gold)" : "1px solid var(--border)",
            cursor: "pointer", overflow: "hidden", background: "var(--sand)",
          }}>
            {color.image ? (
              <img src={color.image} alt={color.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: color.hex }} />
            )}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "5px", fontWeight: 300 }}>
              رونق — مجموعة ٢٠٢٥
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 400, color: "var(--charcoal)", lineHeight: 1.2 }}>
              {product.name}
            </h1>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--gold)", flexShrink: 0 }}>
            {product.price.toLocaleString()} دج
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <div style={{ color: "var(--gold)", fontSize: "13px", letterSpacing: "2px" }}>★★★★★</div>
          <span style={{ fontSize: "11px", color: "var(--taupe)" }}>(48 تقييم)</span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--taupe)", marginBottom: "10px" }}>
            اللون — <span style={{ color: "var(--charcoal)", fontWeight: 500 }}>{product.colors[activeColor]?.name}</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {product.colors.map((color, i) => (
              <button key={i} onClick={() => setActiveColor(i)} title={color.name} style={{
                width: "28px", height: "28px", borderRadius: "50%", background: color.hex, padding: 0,
                border: i === activeColor ? "2.5px solid var(--gold)" : "1px solid var(--border)",
                cursor: "pointer", transition: "border 0.2s ease",
              }} />
            ))}
          </div>
        </div>

        <div style={{ fontSize: "13px", color: "var(--taupe)", lineHeight: 1.9, fontWeight: 300, borderTop: "0.5px solid var(--border)", paddingTop: "16px", marginBottom: "16px" }}>
          {product.description}
        </div>
      </div>

      {/* ✅ زر القلب يستخدم handleWishlist */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "12px 20px", background: "var(--ivory)",
        borderTop: "0.5px solid var(--border)", display: "flex", gap: "12px", zIndex: 999,
      }}>
        <button onClick={handleWishlist} style={{
          width: "50px", height: "50px", border: "0.5px solid var(--charcoal)",
          background: "transparent", fontSize: "20px", cursor: "pointer",
          color: wished ? "var(--gold)" : "var(--charcoal)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {wished ? "♥" : "♡"}
        </button>
        <button onClick={handleAddToCart} style={{
          flex: 1, height: "50px", background: added ? "var(--gold)" : "var(--charcoal)",
          color: "var(--ivory)", border: "none", fontSize: "12px",
          letterSpacing: "0.2em", textTransform: "uppercase",
          fontFamily: "var(--font-body)", cursor: "pointer", transition: "background 0.3s ease",
        }}>
          {added ? "✓ تمت الإضافة" : "أضف للسلة"}
        </button>
      </div>
    </div>
  );
}