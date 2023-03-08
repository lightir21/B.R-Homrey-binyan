import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;

        const found = items.find(
          (item) => item.productName === product.productName
        );
        if (found) {
          const updatedItems = items.map((item) => {
            if (item.productName === product.productName) {
              item.amount += 1;
            }
            return item;
          });
          set({ items: updatedItems });
        } else {
          set((state) => ({ items: [...state.items, product] }));
        }
      },

      updateItemAmount: (product) => {},
    }),
    { name: "cartStore" }
  )
);
