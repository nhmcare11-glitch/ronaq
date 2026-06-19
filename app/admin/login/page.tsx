"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function login() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      if (!res.ok) {
        alert("كلمة المرور غير صحيحة");
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "var(--ivory)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          رونق — الأدمن
        </h1>

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            height: "48px",
            padding: "0 12px",
            marginBottom: "12px",
            border: "1px solid var(--border)",
          }}
        />

        <button
          onClick={login}
          disabled={loading}
          style={{
            width: "100%",
            height: "48px",
            border: "none",
            background: "var(--charcoal)",
            color: "white",
            cursor: "pointer",
            touchAction: "manipulation",
          }}
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </div>
    </div>
  );
}