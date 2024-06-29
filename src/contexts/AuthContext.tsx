import { loginApi } from "@/api";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: { name: string; email: string } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const login = async (email: string, password: string) => {
    const res: any = await loginApi({ email, password });
    if (res.code == 200) {
      setIsLoggedIn(true);
      localStorage.setItem("authToken", res.data.token);
      const user = {
        name: res.data.userInfo.name,
        email: res.data.userInfo.email,
      };
      setUserInfo(user);
      return user;
    }
    return null;
  };

  const logout = () => {
    // 实现登出逻辑
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
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
