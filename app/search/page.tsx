"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  badge: string | null;
  variants: { image: string; color: string }[];
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.products ?? data ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={{ background: "var(--ivory)", minHeight: "100vh", padding: "24px 20px",paddingTop: "56px",

     }}>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "26px",
        fontWeight: 400, color: "var(--charcoal)", marginBottom: "20px",
      }}>
        البحث
      </h1>

      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحثي عن منتج..."
        style={{
          width: "100%", padding: "12px 16px",
          border: "0.5px solid var(--border)",
          background: "var(--sand)", color: "var(--charcoal)",
          fontSize: "14px", fontFamily: "inherit",
          outline: "none", direction: "rtl",
          boxSizing: "border-box",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        {loading && (
          <div style={{ textAlign: "center", color: "var(--taupe)", fontSize: "13px" }}>
            جاري البحث...
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--taupe)", fontSize: "13px" }}>
            لا توجد نتائج لـ "{query}"
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {results.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}
              style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", gap: "14px", padding: "12px",
                border: "0.5px solid var(--border)", background: "white",
              }}>
                <div style={{
                  width: "70px", height: "70px", flexShrink: 0,
                  background: "var(--sand)", overflow: "hidden",
                }}>
                  {product.variants[0]?.image ? (
                    <img src={product.variants[0].image} alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{
                      width: "100%", height: "100%", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: "28px",
                    }}>👜</div>
                  )}
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  {product.badge && (
                    <div style={{
                      fontSize: "9px", letterSpacing: "0.15em",
                      color: "var(--gold)", marginBottom: "4px",
                    }}>
                      {product.badge}
                    </div>
                  )}
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "16px",
                    color: "var(--charcoal)", fontWeight: 400,
                  }}>
                    {product.name}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--gold)", marginTop: "4px" }}>
                    {product.price.toLocaleString()} دج
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}