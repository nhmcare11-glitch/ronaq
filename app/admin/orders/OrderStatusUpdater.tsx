"use client";

import { useState } from "react";

type Status = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const statusLabels: Record<Status, string> = {
  PENDING:   "معلق",
  CONFIRMED: "مؤكد",
  SHIPPED:   "مشحون",
  DELIVERED: "مُسلَّم",
  CANCELLED: "ملغي",
};

const statusColors: Record<Status, string> = {
  PENDING:   "#E67E22",
  CONFIRMED: "#2980B9",
  SHIPPED:   "#8E44AD",
  DELIVERED: "#27AE60",
  CANCELLED: "#E74C3C",
};

export default function OrderStatusUpdater({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: Status;
}) {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: Status) {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) setStatus(newStatus);
    } catch (err) {
      alert("حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value as Status)}
      disabled={loading}
      style={{
        padding: "6px 10px",
        border: `1.5px solid ${statusColors[status]}`,
        background: "var(--ivory)",
        color: statusColors[status],
        fontSize: "11px",
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        cursor: "pointer",
        outline: "none",
      }}
    >
      {Object.entries(statusLabels).map(([value, label]) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
}