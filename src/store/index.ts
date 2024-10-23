import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  name: string;
  setName: (name: string) => void;
  display: string;
  result: string;
  setDisplay: (value: string) => void;
  setResult: (value: string) => void;
  clear: () => void;
  calculate: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      name: "",
      setName: (name) => set({ name }),
      display: "",
      result: "",
      setDisplay: (value) => set({ display: value }),
      setResult: (value) => set({ result: value }),
      clear: () => set({ display: "", result: "" }),
      calculate: () =>
        set((state) => {
          try {
            const result = eval(state.display).toString();
            return { result };
          } catch (error) {
            return { result: "Error: " + error };
          }
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ name: state.name }),
    }
  )
);