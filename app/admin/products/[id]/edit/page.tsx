"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const CATEGORIES = [
  
  { id: "wallets",     name: "محافظ" },
  { id: "backpacks",   name: "حقائب ظهر" },
  { id: "accessories", name: "إكسسوارات" },
];

type Variant = {
  color: string;
  colorHex: string;
  image: string;
  stock: number;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError]       = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  // جلب بيانات المنتج
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (res.ok) {
          setForm({
            name:         data.name,
            slug:         data.slug,
            description:  data.description,
            price:        data.price.toString(),
            badge:        data.badge || "",
            categorySlug: data.category.slug,
            isFeatured:   data.isFeatured,
          });
          setVariants(
            data.variants.map((v: any) => ({
              color:    v.color,
              colorHex: v.colorHex,
              image:    v.image,
              stock:    v.stock,
            }))
          );
        }
      } catch {
        setError("تعذر تحميل بيانات المنتج");
      } finally {
        setFetching(false);
      }
    }
    fetchProduct();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    if (variants.length === 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
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
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
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

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/products");
      } else {
        setError("تعذر حذف المنتج");
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

  if (fetching) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        fontFamily: "var(--font-display)",
        fontSize: "22px",
        color: "var(--taupe)",
        fontWeight: 300,
      }}>
        جاري التحميل...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "680px" }}>

      {/* الهيدر */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "28px",
      }}>
        <div>
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
            تعديل <em style={{ fontStyle: "italic", color: "var(--gold)" }}>المنتج</em>
          </h1>
        </div>

        {/* زر الحذف */}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          style={{
            padding: "10px 16px",
            background: "transparent",
            border: "0.5px solid #E74C3C",
            color: "#E74C3C",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            cursor: "pointer",
          }}
        >
          حذف المنتج
        </button>
      </div>

      {/* نافذة تأكيد الحذف */}
      {showDeleteConfirm && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(44,42,38,0.6)",
          zIndex: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}>
          <div style={{
            background: "var(--ivory)",
            padding: "32px 24px",
            maxWidth: "340px",
            width: "100%",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>⚠️</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 300,
              color: "var(--charcoal)",
              marginBottom: "10px",
            }}>
              هل أنتِ متأكدة؟
            </h2>
            <p style={{
              fontSize: "13px",
              color: "var(--taupe)",
              fontWeight: 300,
              lineHeight: 1.7,
              marginBottom: "24px",
            }}>
              سيتم حذف المنتج وجميع ألوانه نهائياً ولا يمكن التراجع.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "transparent",
                  border: "0.5px solid var(--border)",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  color: "var(--charcoal)",
                }}
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#E74C3C",
                  border: "none",
                  color: "#fff",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  fontFamily: "var(--font-body)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "جاري الحذف..." : "نعم، احذفي"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* المعلومات الأساسية */}
        <div style={{ border: "0.5px solid var(--border)", padding: "20px" }}>
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
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>الـ Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                style={{ ...inputStyle, direction: "ltr" }}
              />
            </div>

            <div>
              <label style={labelStyle}>الوصف</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}>
              <div>
                <label style={labelStyle}>السعر (دج)</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  style={{ ...inputStyle, direction: "ltr" }}
                />
              </div>
              <div>
                <label style={labelStyle}>البادج</label>
                <input
                  name="badge"
                  value={form.badge}
                  onChange={handleChange}
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
              <label htmlFor="featured" style={{
                fontSize: "12px",
                color: "var(--charcoal)",
              }}>
                عرضه في الصفحة الرئيسية
              </label>
            </div>
          </div>
        </div>

        {/* الألوان */}
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

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {variants.map((variant, i) => (
              <div key={i} style={{
                background: "var(--sand)",
                padding: "14px",
                position: "relative",
              }}>
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
                      onChange={(e) =>
                        handleVariantChange(i, "color", e.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>الكود</label>
                    <input
                      type="color"
                      value={variant.colorHex}
                      onChange={(e) =>
                        handleVariantChange(i, "colorHex", e.target.value)
                      }
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
                    <label style={labelStyle}>رابط الصورة</label>
                    <input
                      value={variant.image}
                      onChange={(e) =>
                        handleVariantChange(i, "image", e.target.value)
                      }
                      style={{ ...inputStyle, direction: "ltr" }}
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
                      color: "#E74C3C",
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

        {/* أزرار الحفظ والرجوع */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => router.push("/admin/products")}
            style={{
              padding: "14px 20px",
              background: "transparent",
              border: "0.5px solid var(--border)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              color: "var(--charcoal)",
            }}
          >
            رجوع
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              flex: 1,
              padding: "14px",
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
            {loading ? "جاري الحفظ..." : "✦ حفظ التعديلات"}
          </button>
        </div>
      </div>
    </div>
  );
}