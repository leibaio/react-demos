import { RouteConfig } from "@/types/route";
import { lazy } from "react";

// 懒加载认证相关页面
const Login = lazy(() => import("@/pages/auth/login"));

// 认证相关路由
export const authRoutes: RouteConfig[] = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      title: "登录",
      requireAuth: false,
      hidden: true,
    },
  },
];
