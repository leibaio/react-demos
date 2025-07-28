import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

/**
 * 认证相关的自定义 Hook
 * @returns 认证状态和相关方法
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
