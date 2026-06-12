"use client";

import { useState, useEffect, useRef } from "react";

const WILAYAS = [
  "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار",
  "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر",
  "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة",
  "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة", "وهران", "البيض",
  "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي",
  "خنشلة", "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت",
  "غرداية", "غليزان", "تيميمون", "برج باجي مختار", "أولاد جلال", "بني عباس",
  "عين صالح", "عين قزام", "توقرت", "جانت", "المغير", "المنيعة",
];

export default function AccountPage() {
  const [userId, setUserId] = useState<string>("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    wilaya: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const savingRef = useRef(false);

  useEffect(() => {
    let id = localStorage.getItem("ronaq-user-id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("ronaq-user-id", id);
    }
    setUserId(id);

    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          const nameParts = (data.name ?? "").split(" ");
          setForm({
            firstName: nameParts[0] ?? "",
            lastName: nameParts.slice(1).join(" ") ?? "",
            phone: data.phone ?? "",
            wilaya: data.wilaya ?? "",
            address: data.address ?? "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function doSave() {
    if (savingRef.current) return;
    const id = userId || localStorage.getItem("ronaq-user-id");
    if (!id) return;

    savingRef.current = true;
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: id,
          name: `${form.firstName} ${form.lastName}`.trim(),
          phone: form.phone,
          wilaya: form.wilaya,
          address: form.address,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        const err = await res.text();
        alert("خطأ: " + err);
      }
    } catch (e) {
      alert("تعذر الاتصال");
    } finally {
      setSaving(false);
      savingRef.current = false;
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    border: "0.5px solid var(--border)",
    borderRadius: "10px",
    fontSize: "13px",
    background: "var(--ivory)",
    color: "var(--charcoal)",
    outline: "none",
    fontFamily: "inherit",
    direction: "rtl",
    boxSizing: "border-box",
    pointerEvents: "auto", // ✅ مهم
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "60px 0",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--taupe)" }}>
          جاري التحميل...
        </span>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        padding: "32px 20px",
        // ✅ عزل z-index
        isolation: "isolate",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h1
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--charcoal)",
          marginBottom: "24px",
          letterSpacing: "0.05em",
          textAlign: "right",
        }}
      >
        معلوماتي
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {[
          { label: "الاسم", key: "firstName", placeholder: "الاسم" },
          { label: "اللقب", key: "lastName", placeholder: "اللقب" },
        ].map(({ label, key, placeholder }) => (
          <div key={key}>
            <label
              style={{
                fontSize: "11px",
                color: "var(--taupe)",
                display: "block",
                marginBottom: "6px",
                textAlign: "right",
              }}
            >
              {label}
            </label>
            <input
              style={inputStyle}
              placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}

        <div>
          <label
            style={{
              fontSize: "11px",
              color: "var(--taupe)",
              display: "block",
              marginBottom: "6px",
              textAlign: "right",
            }}
          >
            رقم الهاتف
          </label>
          <input
            style={{ ...inputStyle, direction: "ltr", textAlign: "left" }}
            placeholder="05xxxxxxxx"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            type="tel"
          />
        </div>

        <div>
          <label
            style={{
              fontSize: "11px",
              color: "var(--taupe)",
              display: "block",
              marginBottom: "6px",
              textAlign: "right",
            }}
          >
            الولاية
          </label>
          <select
            style={{ ...inputStyle, cursor: "pointer" }}
            value={form.wilaya}
            onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
          >
            <option value="">اختر الولاية</option>
            {WILAYAS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              fontSize: "11px",
              color: "var(--taupe)",
              display: "block",
              marginBottom: "6px",
              textAlign: "right",
            }}
          >
            العنوان
          </label>
          <input
            style={inputStyle}
            placeholder="العنوان التفصيلي"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <button
          type="button"
          onClick={doSave}
          disabled={saving}
          style={{
            marginTop: "8px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: saved ? "var(--taupe)" : "var(--charcoal)",
            color: "var(--ivory)",
            fontSize: "13px",
            fontFamily: "inherit",
            cursor: saving ? "not-allowed" : "pointer",
            letterSpacing: "0.05em",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
            userSelect: "none",
            pointerEvents: "auto", // ✅ مهم
            // ✅ إضافة z-index للتأكد
            position: "relative",
            zIndex: 2,
          }}
        >
          {saved ? "✓ تم الحفظ" : saving ? "جاري الحفظ..." : "حفظ المعلومات"}
        </button>
      </div>
    </div>
  );
}