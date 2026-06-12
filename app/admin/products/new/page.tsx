"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

const CATEGORIES = [
 
  { id: "wallets",      name: "محافظ" },
 
];

type Variant = {
  color: string;
  colorHex: string;
  image: string;
  stock: number;
};

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    badge: "",
    categorySlug: "",
    isFeatured: false,
  });

  const [variants, setVariants] = useState<Variant[]>([
    { color: "", colorHex: "#000000", image: "", stock: 0 },
  ]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // توليد الـ slug تلقائياً من الاسم
    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }));
    }
  }

  function handleVariantChange(
    index: number,
    field: keyof Variant,
    value: string | number
  ) {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  }

  function addVariant() {
    setVariants((prev) => [
      ...prev,
      { color: "", colorHex: "#000000", image: "", stock: 0 },
    ]);
  }

  function removeVariant(index: number) {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    if (!form.name || !form.price || !form.categorySlug || !form.description) {
      setError("يرجى ملء جميع الحقول الأساسية");
      return;
    }
    if (variants.some((v) => !v.color || !v.image)) {
      setError("يرجى ملء جميع بيانات الألوان");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          variants,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/products");
      } else {
        setError(data.error || "حدث خطأ");
      }
    } catch {
      setError("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    border: "0.5px solid var(--border)",
    background: "transparent",
    fontSize: "13px",
    fontFamily: "var(--font-body)",
    color: "var(--charcoal)",
    outline: "none",
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--taupe)",
    marginBottom: "6px",
    fontWeight: 300,
  };

  return (
    <div style={{ maxWidth: "680px" }}>

      {/* الهيدر */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "6px",
          fontWeight: 300,
        }}>
          ✦ إدارة المنتجات
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "30px",
          fontWeight: 300,
          color: "var(--charcoal)",
        }}>
          إضافة <em style={{ fontStyle: "italic", color: "var(--gold)" }}>منتج جديد</em>
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* المعلومات الأساسية */}
        <div style={{
          border: "0.5px solid var(--border)",
          padding: "20px",
        }}>
          <div style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--charcoal)",
            marginBottom: "16px",
            fontWeight: 500,
          }}>
            المعلومات الأساسية
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={labelStyle}>اسم المنتج</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="حقيبة Irmas الكلاسيكية"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>الـ Slug (يُولَّد تلقائياً)</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="irmas-classic"
                style={{ ...inputStyle, direction: "ltr", color: "var(--taupe)" }}
              />
            </div>

            <div>
              <label style={labelStyle}>الوصف</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="وصف تفصيلي للمنتج..."
                rows={3}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={labelStyle}>السعر (دج)</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="3000"
                  style={{ ...inputStyle, direction: "ltr" }}
                />
              </div>
              <div>
                <label style={labelStyle}>البادج (اختياري)</label>
                <input
                  name="badge"
                  value={form.badge}
                  onChange={handleChange}
                  placeholder="جديد / الأكثر مبيعاً"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>التصنيف</label>
              <select
                name="categorySlug"
                value={form.categorySlug}
                onChange={handleChange}
                style={{ ...inputStyle, background: "var(--ivory)" }}
              >
                <option value="">اختاري التصنيف</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                id="featured"
                checked={form.isFeatured}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))
                }
                style={{ width: "16px", height: "16px", accentColor: "var(--gold)" }}
              />
              <label htmlFor="featured" style={{ fontSize: "12px", color: "var(--charcoal)" }}>
                عرضه في الصفحة الرئيسية
              </label>
            </div>
          </div>
        </div>

        {/* الألوان والصور */}
        <div style={{ border: "0.5px solid var(--border)", padding: "20px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}>
            <div style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--charcoal)",
              fontWeight: 500,
            }}>
              الألوان والصور
            </div>
            <button
              onClick={addVariant}
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "var(--gold)",
                background: "transparent",
                border: "0.5px solid var(--gold)",
                padding: "6px 12px",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              + إضافة لون
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {variants.map((variant, i) => (
              <div key={i} style={{
                background: "var(--sand)",
                padding: "14px",
                position: "relative",
              }}>
                <div style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "var(--taupe)",
                  marginBottom: "10px",
                }}>
                  اللون {i + 1}
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 1fr 80px",
                  gap: "10px",
                  alignItems: "end",
                }}>
                  <div>
                    <label style={labelStyle}>اسم اللون</label>
                    <input
                      value={variant.color}
                      onChange={(e) => handleVariantChange(i, "color", e.target.value)}
                      placeholder="أسود"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>الكود</label>
                    <input
                      type="color"
                      value={variant.colorHex}
                      onChange={(e) => handleVariantChange(i, "colorHex", e.target.value)}
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "0.5px solid var(--border)",
                        cursor: "pointer",
                        padding: "2px",
                      }}
                    />
                  </div>
                 <div>
  <label style={labelStyle}>الصورة</label>
  <ImageUpload
    value={variant.image}
    onChange={(url) => handleVariantChange(i, "image", url)}
  />
</div>
                  <div>
                    <label style={labelStyle}>المخزون</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantChange(i, "stock", parseInt(e.target.value) || 0)
                      }
                      style={{ ...inputStyle, direction: "ltr" }}
                    />
                  </div>
                </div>

                {variants.length > 1 && (
                  <button
                    onClick={() => removeVariant(i)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--taupe)",
                      fontSize: "16px",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* الخطأ */}
        {error && (
          <div style={{
            fontSize: "12px",
            color: "#C0392B",
            background: "#FDF0EF",
            padding: "12px 16px",
            border: "0.5px solid #E8C4C0",
          }}>
            {error}
          </div>
        )}

        {/* زر الحفظ */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "15px",
            background: loading ? "var(--taupe)" : "var(--charcoal)",
            color: "var(--ivory)",
            border: "none",
            fontSize: "12px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "جاري الحفظ..." : "✦ حفظ المنتج"}
        </button>
      </div>
    </div>
  );
}