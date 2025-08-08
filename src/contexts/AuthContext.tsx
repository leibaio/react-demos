import { loginApi } from "@/api";
import type { UserInfo } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  login: (username: string, password: string) => Promise<UserInfo | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<UserInfo | null> => {
    try {
      const res = await loginApi({ username, password });
      if (res.success) {
        setIsLoggedIn(true);
        localStorage.setItem("authToken", res.data.token);
        const user = res.data.userInfo;
        setUserInfo(user);
        localStorage.setItem("userInfo", JSON.stringify(user));
        return user;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    return null;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
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
