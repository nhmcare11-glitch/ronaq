"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import { useUserId } from "@/lib/useUserId";

const WILAYAS = [
  "أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار",
  "البليدة","البويرة","تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر",
  "الجلفة","جيجل","سطيف","سعيدة","سكيكدة","سيدي بلعباس","عنابة","قالمة",
  "قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة","وهران","البيض",
  "إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي",
  "خنشلة","سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت",
  "غرداية","غليزان","تيميمون","برج باجي مختار","أولاد جلال","بني عباس",
  "عين صالح","عين قزام","توقرت","جانت","المغير","المنيعة",
];

const s: Record<string, React.CSSProperties> = {
  page: {
    background: "var(--ivory)",
    maxWidth: 480,
    margin: "0 auto",
    direction: "rtl",
    fontFamily: "inherit",
  },
  header: {
    padding: "20px 20px 16px",
    borderBottom: "0.5px solid var(--border)",
  },
  headerSub: {
    fontSize: 10,
    letterSpacing: "0.18em",
    color: "var(--gold)",
    fontWeight: 300,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 300,
    color: "var(--charcoal)",
  },
  section: {
    padding: "20px 20px 0",
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: "0.15em",
    color: "var(--taupe)",
    marginBottom: 14,
    textTransform: "uppercase" as const,
  },
  field: { marginBottom: 14 },
  label: {
    display: "block", fontSize: 11,
    color: "var(--taupe)", marginBottom: 6, fontWeight: 300,
  },
  input: {
    width: "100%", padding: "12px 14px",
    border: "0.5px solid var(--border)",
    background: "var(--ivory)", color: "var(--charcoal)",
    fontSize: 13, fontFamily: "inherit", outline: "none",
    borderRadius: 0, boxSizing: "border-box" as const,
    WebkitAppearance: "none" as const,
    transition: "border-color 0.2s ease",
  },
  fieldRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  divider: { height: "0.5px", background: "var(--border)", margin: "20px 20px 0" },
  cashBadge: {
    margin: "20px 20px 0", padding: "12px 14px",
    border: "0.5px solid var(--border)", background: "var(--sand)",
    display: "flex", alignItems: "center", gap: 10,
  },
  cashDot: { width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 },
  cashText: { fontSize: 12, color: "var(--charcoal)", fontWeight: 300 },
  summary: { margin: "20px 20px 0", padding: 16, background: "var(--sand)" },
  summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  summaryTotalRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    paddingTop: 10, borderTop: "0.5px solid var(--border)", marginBottom: 0,
  },
  submitWrap: { padding: 20 },
  note: {
    padding: "0 20px 24px", fontSize: 11, color: "var(--taupe)",
    textAlign: "center" as const, fontWeight: 300, lineHeight: 1.6,
  },
};

export default function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const userId = useUserId();

  const [loading, setLoading] = useState(false);
  const [prefillLoading, setPrefillLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "",
    wilaya: "", address: "", notes: "",
  });

  useEffect(() => {
    const currentUserId = userId || localStorage.getItem("ronaq-user-id");
    if (!currentUserId) return;

    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUserId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          const nameParts = (data.name ?? "").split(" ");
          setForm((prev) => ({
            ...prev,
            firstName: nameParts[0] ?? "",
            lastName: nameParts.slice(1).join(" ") ?? "",
            phone: data.phone ?? "",
            wilaya: data.wilaya ?? "",
            address: data.address ?? "",
          }));
        }
      })
      .catch(() => {})
      .finally(() => setPrefillLoading(false));
  }, [userId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (items.length === 0) { alert("السلة فارغة"); return; }
    if (!form.firstName || !form.lastName || !form.phone || !form.wilaya || !form.address) {
      alert("يرجى ملء جميع الحقول"); return;
    }

    setLoading(true);
    try {
      const currentUserId = userId || localStorage.getItem("ronaq-user-id");
      if (currentUserId) {
        await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUserId,
            name: `${form.firstName} ${form.lastName}`,
            phone: form.phone, wilaya: form.wilaya, address: form.address,
          }),
        });
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          phone: form.phone, wilaya: form.wilaya,
          address: form.address, notes: form.notes,
          total: totalPrice(),
          userId: userId || localStorage.getItem("ronaq-user-id") || null,
          items: items.map((item) => ({
            productId: item.id, quantity: item.quantity,
            price: item.price, color: item.color, image: item.image,
          })),
        }),
      });

      if (res.ok) { clearCart(); setDone(true); }
      else alert("حدث خطأ، حاولي مرة أخرى");
    } catch {
      alert("تعذر الاتصال");
    } finally {
      setLoading(false);
    }
  }

  // ✅ صفحة تم الطلب
  if (done) {
    return (
      <div style={{
        minHeight: "80vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 20px", background: "var(--ivory)",
        textAlign: "center", direction: "rtl",
      }}>
        <style>{`
          @keyframes scaleIn {
            from { transform: scale(0) rotate(-180deg); opacity: 0; }
            to   { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(184,151,58,0.3); }
            50%       { transform: scale(1.03); box-shadow: 0 0 0 8px rgba(184,151,58,0); }
          }
        `}</style>

        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "var(--gold)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "32px", color: "var(--ivory)",
          marginBottom: "24px",
          animation: "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}>
          ✓
        </div>

        <div style={{ animation: "fadeUp 0.6s ease 0.3s both" }}>
          <div style={{
            fontSize: "10px", letterSpacing: "0.25em",
            color: "var(--gold)", marginBottom: "12px", textTransform: "uppercase",
          }}>
            ✦ شكراً لكِ
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "32px",
            fontWeight: 300, color: "var(--charcoal)",
            marginBottom: "12px", lineHeight: 1.2,
          }}>
            تم استلام <em style={{ color: "var(--gold)" }}>طلبكِ</em>
          </h2>
          <p style={{
            fontSize: "13px", color: "var(--taupe)", fontWeight: 300,
            lineHeight: 1.8, marginBottom: "32px", maxWidth: "280px",
          }}>
            سيتم التواصل معكِ لتأكيد الطلب خلال ٢٤ ساعة
          </p>
        </div>

        <div style={{ animation: "fadeUp 0.6s ease 0.5s both" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "14px 40px",
              background: "transparent",
              color: "var(--charcoal)",
              border: "0.5px solid var(--charcoal)",
              fontSize: "11px", fontFamily: "inherit",
              letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
              animation: "pulse 2s ease 1.5s infinite",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--charcoal)";
              e.currentTarget.style.color = "var(--ivory)";
              e.currentTarget.style.animation = "none";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--charcoal)";
              e.currentTarget.style.animation = "pulse 2s ease infinite";
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.background = "var(--charcoal)";
              e.currentTarget.style.color = "var(--ivory)";
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--charcoal)";
            }}
          >
            ✦ العودة للمتجر
          </button>
        </div>
      </div>
    );
  }

  if (prefillLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
        <span style={{ fontSize: 13, color: "var(--taupe)", fontWeight: 300 }}>
          جاري التحميل...
        </span>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.headerSub}>✦ إتمام الشراء</div>
        <h1 style={s.headerTitle}>
          بيانات <em style={{ fontStyle: "italic", color: "var(--gold)" }}>التوصيل</em>
        </h1>
      </div>

      <div style={s.section}>
        <div style={s.sectionLabel}>المعلومات الشخصية</div>
        <div style={s.fieldRow}>
          <div style={s.field}>
            <label style={s.label}>الاسم</label>
            <input style={s.input} name="firstName" placeholder="مريم"
              value={form.firstName} onChange={handleChange}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>اللقب</label>
            <input style={s.input} name="lastName" placeholder="بن علي"
              value={form.lastName} onChange={handleChange}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            />
          </div>
        </div>
        <div style={s.field}>
          <label style={s.label}>رقم الهاتف</label>
          <input
            style={{ ...s.input, direction: "ltr", textAlign: "right" }}
            name="phone" placeholder="05xxxxxxxx" type="tel"
            value={form.phone} onChange={handleChange}
            onFocus={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          />
        </div>
      </div>

      <div style={s.divider} />

      <div style={{ ...s.section, paddingTop: 20 }}>
        <div style={s.sectionLabel}>عنوان التوصيل</div>
        <div style={s.field}>
          <label style={s.label}>الولاية</label>
          <select style={s.input} name="wilaya" value={form.wilaya} onChange={handleChange}
            onFocus={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <option value="">اختر الولاية</option>
            {WILAYAS.map((w) => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div style={s.field}>
          <label style={s.label}>العنوان التفصيلي</label>
          <input style={s.input} name="address"
            placeholder="الحي، الشارع، رقم البناية..."
            value={form.address} onChange={handleChange}
            onFocus={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>ملاحظات (اختياري)</label>
          <textarea
            style={{ ...s.input, resize: "none", height: 72 }}
            name="notes" placeholder="أي تعليمات خاصة للتوصيل..."
            value={form.notes} onChange={handleChange}
            onFocus={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          />
        </div>
      </div>

      <div style={s.cashBadge}>
        <div style={s.cashDot} />
        <span style={s.cashText}>الدفع عند الاستلام</span>
      </div>

      <div style={s.summary}>
        <div style={s.summaryRow}>
          <span style={{ fontSize: 12, color: "var(--taupe)", fontWeight: 300 }}>عدد المنتجات</span>
          <span style={{ fontSize: 12, color: "var(--charcoal)" }}>
            {items.reduce((a, i) => a + i.quantity, 0)} قطعة
          </span>
        </div>
        <div style={s.summaryTotalRow}>
          <span style={{ fontSize: 13, color: "var(--charcoal)" }}>المجموع</span>
          <span style={{ fontSize: 18, color: "var(--gold)", fontWeight: 300 }}>
            {totalPrice().toLocaleString("ar-DZ")} دج
          </span>
        </div>
      </div>

      <div style={s.submitWrap}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", padding: 16,
            background: loading ? "var(--taupe)" : "var(--charcoal)",
            color: "var(--ivory)", border: "none",
            fontSize: 13, fontFamily: "inherit",
            letterSpacing: "0.1em", cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 300, transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => { if (!loading) e.currentTarget.style.background = "var(--gold)"; }}
          onMouseOut={(e) => { if (!loading) e.currentTarget.style.background = "var(--charcoal)"; }}
          onTouchStart={(e) => { if (!loading) e.currentTarget.style.background = "var(--gold)"; }}
          onTouchEnd={(e) => { if (!loading) e.currentTarget.style.background = "var(--charcoal)"; }}
        >
          {loading ? "⏳ جاري الإرسال..." : "✦ تأكيد الطلب"}
        </button>
      </div>

      <div style={s.note}>
        سيتم التواصل معكِ لتأكيد الطلب خلال ٢٤ ساعة
      </div>
    </div>
  );
}