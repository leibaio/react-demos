import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi } from "@/api";
import type { UserInfo } from "@/types";

interface AuthStore {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  token: string | null;

  // Actions
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUserInfo: (userInfo: UserInfo) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userInfo: null,
      token: null,

      login: async (username: string, password: string) => {
        try {
          const res = await loginApi({ username, password });
          if (res.success) {
            set({
              isLoggedIn: true,
              userInfo: res.data.userInfo,
              token: res.data.token,
            });
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },

      logout: () => {
        set({
          isLoggedIn: false,
          userInfo: null,
          token: null,
        });
      },

      setUserInfo: (userInfo: UserInfo) => set({ userInfo }),

      setToken: (token: string) => set({ token }),
    }),
    {
      name: "auth-storage",
    }
  )
);
