import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,

      addItem: (product) => {
        const items = get().items;
        // Match by both id and selectedColor
        const found = items.find(
          (item) =>
            item.id === product.id &&
            item.selectedColor === product.selectedColor
        );

        if (found) {
          const updatedItems = items.map((item) => {
            if (
              item.id === product.id &&
              item.selectedColor === product.selectedColor
            ) {
              return {
                ...item,
                amount:
                  Number(item.amount) +
                  (product.amount > 1 ? Number(product.amount) : 1),
              };
            }
            return item;
          });
          set({ items: updatedItems });
        } else {
          const updatedProduct = {
            ...product,
            amount: product.amount > 0 ? Number(product.amount) : 1,
          };
          set((state) => ({ items: [...state.items, updatedProduct] }));
        }
      },

      updateItemAmount: (index, amount) => {
        const items = [...get().items];
        items[index] = { ...items[index], amount: Number(amount) };
        set({ items });
      },

      deleteItem: (productId, selectedColor) => {
        const items = get().items;
        const updatedItems = items.filter(
          (item) =>
            !(item.id === productId && item.selectedColor === selectedColor)
        );
        set({ items: updatedItems });
      },

      setTotalPrice: (payload) => {
        set({ totalPrice: payload });
      },
    }),
    { name: "cartStore" }
  )
);
