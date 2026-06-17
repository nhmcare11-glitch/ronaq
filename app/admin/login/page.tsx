"use client";

import Link from "next/link";

export default function AdminLogin() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ivory)",
      }}
    >
      <div style={{ width: "300px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            textAlign: "center",
            color: "var(--charcoal)",
            marginBottom: "20px",
          }}
        >
          رونق — الأدمن
        </div>

        <Link
          href="/admin"
          style={{
            display: "block",
            padding: "13px",
            background: "var(--charcoal)",
            color: "var(--ivory)",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          دخول
        </Link>
      </div>
    </div>
  );
}