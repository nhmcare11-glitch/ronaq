"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  colors: { name: string; hex: string; image: string }[];
};

type FavCtx = {
  favorites: Product[];
  toggle: (p: Product) => void;
  isFav: (id: string) => boolean;
};

const FavoritesContext = createContext<FavCtx>({
  favorites: [],
  toggle: () => {},
  isFav: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // تحميل من localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ronaq_favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // حفظ في localStorage
  useEffect(() => {
    localStorage.setItem("ronaq_favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggle(product: Product) {
    setFavorites(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  }

  function isFav(id: string) {
    return favorites.some(p => p.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);