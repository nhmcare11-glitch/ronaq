import { create } from "zustand";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  colorHex: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (newItem) => {
    const existing = get().items.find(
      (i) => i.id === newItem.id && i.color === newItem.color
    );
    if (existing) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === newItem.id && i.color === newItem.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, { ...newItem, quantity: 1 }] }));
    }
  },

  removeItem: (id, color) => {
    set((state) => ({
      items: state.items.filter((i) => !(i.id === id && i.color === color)),
    }));
  },

  updateQuantity: (id, color, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.color === color ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));