"use client";

import Link from "next/link";
import { useState } from "react";

type Color = {
  name: string;
  hex: string;
  image: string;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  colors: Color[];
};

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const currentImage = product.colors[activeColor]?.image || product.image;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s ease",
      }}
    >
      {/* الصورة */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Link href={`/products/${product.slug}`}>
          <div style={{
            width: "100%",
            aspectRatio: "3/4",
            background: "var(--sand)",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Skeleton loader */}
            {!imgLoaded && (
              <div className="skeleton" style={{
                position: "absolute",
                inset: 0,
              }} />
            )}

            {currentImage ? (
              <img
                src={currentImage}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                  transition: "transform 0.5s ease",
                  opacity: imgLoaded ? 1 : 0,
                }}
              />
            ) : (
              <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
              }}>
                👜
              </div>
            )}
          </div>
        </Link>

        {/* البادج */}
        {product.badge && (
          <div style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: product.badge === "جديد" ? "var(--gold)" : "var(--charcoal)",
            color: "var(--ivory)",
            fontSize: "9px",
            letterSpacing: "0.15em",
            padding: "3px 8px",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}>
            {product.badge}
          </div>
        )}

        {/* زر المفضلة */}
        <button
          onClick={() => setWished(!wished)}
          aria-label="أضف للمفضلة"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "34px",
            height: "34px",
            background: "rgba(250,247,242,0.9)",
            backdropFilter: "blur(4px)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            color: wished ? "var(--gold)" : "var(--charcoal)",
            transform: wished ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.2s ease, color 0.2s ease",
          }}
        >
          {wished ? "♥" : "♡"}
        </button>
      </div>

      {/* المعلومات */}
      <div style={{ padding: "10px 0 4px" }}>
        <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
          <div style={{
            fontSize: "13px",
            color: "var(--charcoal)",
            fontWeight: 400,
            letterSpacing: "0.02em",
            marginBottom: "4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {product.name}
          </div>
        </Link>

        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "16px",
          color: "var(--gold)",
          marginBottom: "7px",
        }}>
          {product.price.toLocaleString()} دج
        </div>

        {/* الألوان */}
        <div style={{ display: "flex", gap: "5px" }}>
          {product.colors.map((color, i) => (
            <button
              key={i}
              onClick={() => setActiveColor(i)}
              aria-label={color.name}
              title={color.name}
              style={{
                width: i === activeColor ? "14px" : "12px",
                height: i === activeColor ? "14px" : "12px",
                borderRadius: "50%",
                background: color.hex,
                border: i === activeColor
                  ? "2px solid var(--gold)"
                  : "1px solid var(--border)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}