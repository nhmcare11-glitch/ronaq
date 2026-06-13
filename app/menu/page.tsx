"use client";

import { useRouter } from "next/navigation";

const CATEGORIES = [
  { label: "الرئيسية", href: "/" },
  { label: "الكل", href: "/products" },
  { label: "محافظ", href: "/categories/wallets" },
  { label: "حقائب يد", href: "/categories/handbags" },
  { label: "مفضلة", href: "/wishlist" },
  { label: "عروض", href: "/sale" },
];

export default function SearchPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 16 }}>
      <h1>البحث</h1>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.href}
            onClick={() => router.push(cat.href)}
            style={{
              padding: "8px 14px",
              borderRadius: 20,
              border: "1px solid #ccc",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}