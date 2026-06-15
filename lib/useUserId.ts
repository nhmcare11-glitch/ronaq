"use client";

import { useEffect, useState } from "react";

function generateId(): string {
  // بديل لـ crypto.randomUUID() يعمل على جميع المتصفحات
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getOrCreateUserId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("ronaq-user-id");
  if (!id) {
    id = generateId();
    localStorage.setItem("ronaq-user-id", id);
  }
  return id;
}

export function useUserId(): string {
  const [userId, setUserId] = useState<string>(() => getOrCreateUserId());

  useEffect(() => {
    if (!userId) {
      setUserId(getOrCreateUserId());
    }
  }, []);

  return userId;
}