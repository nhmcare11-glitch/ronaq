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
  field: {
    marginBottom: 14,
  },
  label: {
    display: "block",
    fontSize: 11,
    color: "var(--taupe)",
    marginBottom: 6,
    fontWeight: 300,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "0.5px solid var(--border)",
    background: "var(--ivory)",
    color: "var(--charcoal)",
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
    borderRadius: 0,
    boxSizing: "border-box" as const,
    WebkitAppearance: "none" as const,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  divider: {
    height: "0.5px",
    background: "var(--border)",
    margin: "20px 20px 0",
  },
  cashBadge: {
    margin: "20px 20px 0",
    padding: "12px 14px",
    border: "0.5px solid var(--border)",
    background: "var(--sand)",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  cashDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "var(--gold)",
    flexShrink: 0,
  },
  cashText: {
    fontSize: 12,
    color: "var(--charcoal)",
    fontWeight: 300,
  },
  summary: {
    margin: "20px 20px 0",
    padding: 16,
    background: "var(--sand)",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTop: "0.5px solid var(--border)",
    marginBottom: 0,
  },
  submitWrap: {
    padding: 20,
  },
  submitBtn: {
    width: "100%",
    padding: 16,
    background: "var(--charcoal)",
    color: "var(--ivory)",
    border: "none",
    fontSize: 13,
    fontFamily: "inherit",
    letterSpacing: "0.1em",
    cursor: "pointer",
    fontWeight: 300,
  },
  note: {
    padding: "0 20px 24px",
    fontSize: 11,
    color: "var(--taupe)",
    textAlign: "center" as const,
    fontWeight: 300,
    lineHeight: 1.6,
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
    firstName: "",
    lastName: "",
    phone: "",
    wilaya: "",
    address: "",
    notes: "",
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
    if (items.length === 0) {
      alert("السلة فارغة");
      return;
    }
    if (!form.firstName || !form.lastName || !form.phone || !form.wilaya || !form.address) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      const currentUserId =
  userId || localStorage.getItem("ronaq-user-id");

if (currentUserId) {
  await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: currentUserId,
      name: `${form.firstName} ${form.lastName}`,
      phone: form.phone,
      wilaya: form.wilaya,
      address: form.address,
    }),
  });
}

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          wilaya: form.wilaya,
          address: form.address,
          notes: form.notes,
          total: totalPrice(),
         userId:
  userId ||
  localStorage.getItem("ronaq-user-id") ||
  null,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
            image: item.image,
          })),
        }),
      });

      if (res.ok) {
        clearCart();
        setDone(true);
      } else {
        alert("حدث خطأ، حاولي مرة أخرى");
      }
    } catch {
      alert("تعذر الاتصال");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div style={{ padding: 40, textAlign: "center", direction: "rtl" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
        <h2 style={{ fontSize: 20, fontWeight: 300, color: "var(--charcoal)", marginBottom: 8 }}>
          تم استلام طلبكِ
        </h2>
        <p style={{ fontSize: 13, color: "var(--taupe)", fontWeight: 300, marginBottom: 24 }}>
          سيتم التواصل معكِ لتأكيد الطلب خلال ٢٤ ساعة
        </p>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "12px 32px",
            background: "var(--charcoal)",
            color: "var(--ivory)",
            border: "none",
            fontSize: 13,
            fontFamily: "inherit",
            letterSpacing: "0.08em",
            cursor: "pointer",
          }}
        >
          العودة للمتجر
        </button>
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
              value={form.firstName} onChange={handleChange} />
          </div>
          <div style={s.field}>
            <label style={s.label}>اللقب</label>
            <input style={s.input} name="lastName" placeholder="بن علي"
              value={form.lastName} onChange={handleChange} />
          </div>
        </div>
        <div style={s.field}>
          <label style={s.label}>رقم الهاتف</label>
          <input
            style={{ ...s.input, direction: "ltr", textAlign: "right" }}
            name="phone" placeholder="05xxxxxxxx" type="tel"
            value={form.phone} onChange={handleChange}
          />
        </div>
      </div>

      <div style={s.divider} />

      <div style={{ ...s.section, paddingTop: 20 }}>
        <div style={s.sectionLabel}>عنوان التوصيل</div>
        <div style={s.field}>
          <label style={s.label}>الولاية</label>
          <select style={s.input} name="wilaya" value={form.wilaya} onChange={handleChange}>
            <option value="">اختر الولاية</option>
            {WILAYAS.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
        <div style={s.field}>
          <label style={s.label}>العنوان التفصيلي</label>
          <input style={s.input} name="address" placeholder="الحي، الشارع، رقم البناية..."
            value={form.address} onChange={handleChange} />
        </div>
        <div style={s.field}>
          <label style={s.label}>ملاحظات (اختياري)</label>
          <textarea
            style={{ ...s.input, resize: "none", height: 72 }}
            name="notes" placeholder="أي تعليمات خاصة للتوصيل..."
            value={form.notes} onChange={handleChange}
          />
        </div>
      </div>

      <div style={s.cashBadge}>
        <div style={s.cashDot} />
        <span style={s.cashText}>الدفع عند الاستلام</span>
      </div>

      <div style={s.summary}>
        <div style={s.summaryRow}>
          <span style={{ fontSize: 12, color: "var(--taupe)", fontWeight: 300 }}>
            عدد المنتجات
          </span>
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
          style={{
            ...s.submitBtn,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
        </button>
      </div>

      <div style={s.note}>
        سيتم التواصل معكِ لتأكيد الطلب خلال ٢٤ ساعة
      </div>
    </div>
  );
}