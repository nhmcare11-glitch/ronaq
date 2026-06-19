"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      onChange(data.publicUrl);
    } catch {
      alert("فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    width: "100%",
  }}
>
      {/* معاينة الصورة */}
      {value && (
        <div style={{
          width: "42px", height: "42px", flexShrink: 0,
          border: "0.5px solid var(--border)", overflow: "hidden",
        }}>
          <img src={value} alt="preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      {/* زر الرفع */}
      <label style={{
        display: "inline-block",
        padding: "10px 14px",
        border: "0.5px solid var(--border)",
        fontSize: "11px",
        letterSpacing: "0.1em",
        cursor: uploading ? "not-allowed" : "pointer",
        fontFamily: "var(--font-body)",
        color: uploading ? "var(--taupe)" : "var(--charcoal)",
        background: "transparent",
        whiteSpace: "nowrap",
      }}>
        {uploading ? "جاري الرفع..." : value ? "تغيير الصورة" : "📁 اختاري صورة"}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}