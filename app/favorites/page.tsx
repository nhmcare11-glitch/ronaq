"use client";

import { useFavorites } from "@/lib/FavoritesContext";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div style={{ padding: "32px 16px", minHeight: "60vh",paddingTop: "56px",

     }}>
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "28px",
        fontWeight: 300,
        color: "var(--charcoal)",
        marginBottom: "8px",
        textAlign: "center",
      }}>
        المفضلة
      </h1>
      <p style={{
        textAlign: "center",
        color: "var(--taupe)",
        fontSize: "13px",
        marginBottom: "32px",
      }}>
        {favorites.length} منتج
      </p>

      {favorites.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>♡</div>
          <p style={{ color: "var(--taupe)", marginBottom: "24px" }}>
            لم تضيفي أي منتج للمفضلة بعد
          </p>
          <Link href="/products" style={{
            background: "var(--charcoal)",
            color: "var(--ivory)",
            padding: "12px 28px",
            textDecoration: "none",
            fontSize: "13px",
            letterSpacing: "0.08em",
          }}>
            تصفحي المنتجات
          </Link>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}