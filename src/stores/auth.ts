import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi } from "@/api";
import type { UserInfo } from "@/types";
import request from "@/utils/request";

interface AuthStore {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  token: string | null;
  rememberMe: boolean;

  // Actions
  login: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => Promise<UserInfo | null>;
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
      rememberMe: false,

      login: async (username: string, password: string, rememberMe = true) => {
        try {
          const res = await loginApi({ username, password });
          if (res.code === 200 && res.data) {
            const user: UserInfo = {
              username: res.data.username,
              role: res.data.role,
            };
            set({
              isLoggedIn: true,
              userInfo: user,
              token: res.data.token,
            });
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("userInfo", JSON.stringify(user));

            // axios 默认带上 token
            request.defaults.headers.common["Authorization"] =
              `Bearer ${res.data.token}`;

            // 如果不勾选记住我，删除 localStorage，内存存储即可
            if (!rememberMe) {
              localStorage.removeItem("auth-storage");
            }

            return user;
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
        return null;
      },

      logout: () => {
        set({
          isLoggedIn: false,
          userInfo: null,
          token: null,
        });
        localStorage.removeItem("authToken");
        localStorage.removeItem("userInfo");
        delete request.defaults.headers.common["Authorization"];
      },

      setUserInfo: (userInfo: UserInfo) => set({ userInfo }),

      setToken: (token: string) => {
        set({ token });
        request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
