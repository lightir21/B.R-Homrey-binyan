import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      isCategoriesOpen: false,

      setIsCategoriesOpen: () =>
        set((state) => ({
          isCategoriesOpen: !state.isCategoriesOpen,
        })),
    }),
    { name: "appStore" }
  )
);
