import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,

      addItem: (product) => {
        const items = get().items;

        const found = items.find((item) => item.id === product.id);
        if (found && product.amount > 1) {
          const updatedItems = items.map((item) => {
            if (item.id === product.id) {
              item.amount = Number(item.amount) + Number(product.amount);
            }
            return item;
          });
          set({ items: updatedItems });
        } else if (found) {
          const updatedItems = items.map((item) => {
            if (item.id === product.id) {
              item.amount++;
            }
            return item;
          });
          set({ items: updatedItems });
        } else if (product.amount > 0) {
          set((state) => ({ items: [...state.items, product] }));
        } else {
          const updatedProduct = { ...product, amount: 1 };
          set((state) => ({ items: [...state.items, updatedProduct] }));
        }
      },

      updateItemAmount: (index, amount) => {
        const items = get().items;

        items[index].amount = amount;
        set({ items });
      },

      deleteItem: (productId) => {
        const items = get().items;
        const updatedItems = items.filter((item) => item.id !== productId);
        set({ items: updatedItems });
      },

      setTotalPrice: (payload) => {
        set({ totalPrice: payload });
      },
    }),
    { name: "cartStore" }
  )
);
