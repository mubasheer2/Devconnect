import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "dark",
  setTheme: () => {
    // Force dark mode exclusively
    document.documentElement.classList.add("dark");
    set({ theme: "dark" });
  },
}));
