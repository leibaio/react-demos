import { createContext, ReactNode, useContext, useState } from "react";
import { loginApi } from "@/api";
import { message } from "antd";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );

  const login = async (email: string, password: string) => {
    const res = await loginApi({ email, password });
    if (res.data.code == 200) {
      setIsLoggedIn(true);
      localStorage.setItem("authToken", res.data.data.token);
    }
    message.success(res.data.msg);
  };

  const logout = () => {
    // 实现登出逻辑
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
