"use client";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";

export function StoreHydration() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
  return null;
}