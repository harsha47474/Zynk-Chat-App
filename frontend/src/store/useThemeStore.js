import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("zynk-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("zynk-theme", theme);
    set({ theme });
  },
}));