import ProtectedRoute from "@/components/common/ProtectedRoute";
import CommonLayout from "@/components/layout/CommonLayout";
import { RouteConfig } from "@/types/route";
import { lazy } from "react";

// 懒加载主要页面
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));

// 主要页面路由
export const mainRoutes: RouteConfig[] = [
  {
    path: "/home",
    element: <ProtectedRoute element={CommonLayout} />,
    children: [{ path: "", element: <Home /> }],
    meta: {
      title: "首页",
      icon: "home",
      requireAuth: true,
    },
  },
  {
    path: "/about",
    element: <CommonLayout />,
    children: [{ path: "", element: <About /> }],
    meta: {
      title: "关于",
      icon: "info-circle",
      requireAuth: false,
    },
  },
];
