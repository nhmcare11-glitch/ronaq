"use client";

import { useEffect, useState } from "react";

export function useUserId(): string {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let id = localStorage.getItem("ronaq-user-id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("ronaq-user-id", id);
    }
    setUserId(id);
  }, []);

  return userId;
}