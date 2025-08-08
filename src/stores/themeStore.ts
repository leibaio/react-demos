import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LayoutType = "sidebar" | "top" | "mix";
export type ThemeMode = "light" | "dark";

interface ThemeConfig {
  primaryColor: string;
  mode: ThemeMode;
  layoutType: LayoutType;
  sidebarCollapsed: boolean;
}

interface ThemeStore extends ThemeConfig {
  // Actions
  setPrimaryColor: (color: string) => void;
  setMode: (mode: ThemeMode) => void;
  setLayoutType: (layout: LayoutType) => void;
  toggleSidebar: () => void;
  updateConfig: (config: Partial<ThemeConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: ThemeConfig = {
  primaryColor: "#1890ff",
  mode: "light",
  layoutType: "sidebar",
  sidebarCollapsed: false,
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      ...defaultConfig,
      setPrimaryColor: (color: string) => set({ primaryColor: color }),
      setMode: (mode: ThemeMode) => set({ mode }),
      setLayoutType: (layout: LayoutType) => set({ layoutType: layout }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      updateConfig: (config: Partial<ThemeConfig>) => set(config),
      resetConfig: () => set(defaultConfig),
    }),
    {
      name: "theme-config",
    }
  )
);
