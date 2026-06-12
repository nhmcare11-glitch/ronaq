import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
};

type WishlistStore = {
  items: WishItem[];
  addItem: (item: WishItem) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (!get().hasItem(item.id)) {
          set((s) => ({ items: [...s.items, item] }));
        }
      },
      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      hasItem: (id) => get().items.some((i) => i.id === id),
    }),
    { name: "ronaq-wishlist" }
  )
);