"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError(true);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "var(--ivory)",
    }}>
      <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "28px",
          textAlign: "center", color: "var(--charcoal)", marginBottom: "8px",
        }}>
          رونق — الأدمن
        </div>

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{
            padding: "12px 16px", border: error ? "1px solid #c0392b" : "0.5px solid var(--border)",
            background: "white", fontFamily: "var(--font-body)", fontSize: "13px",
            outline: "none", textAlign: "right",
          }}
        />

        {error && (
          <div style={{ fontSize: "11px", color: "#c0392b", textAlign: "center" }}>
            كلمة المرور غير صحيحة
          </div>
        )}

        <button onClick={handleLogin} style={{
          padding: "13px", background: "var(--charcoal)", color: "var(--ivory)",
          border: "none", fontSize: "11px", letterSpacing: "0.2em",
          textTransform: "uppercase", fontFamily: "var(--font-body)", cursor: "pointer",
        }}>
          دخول
        </button>
      </div>
    </div>
  );
}