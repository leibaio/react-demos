import ProtectedRoute from "@/components/common/ProtectedRoute";
import CommonLayout from "@/components/layout/CommonLayout";
import { RouteConfig } from "@/types/route";
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import React, { lazy } from "react";

// 懒加载主要页面
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));

// 主要页面路由
export const mainRoutes: RouteConfig[] = [
  {
    path: "/home",
    key: "home",
    element: <ProtectedRoute element={CommonLayout} />,
    children: [{ path: "", element: <Home /> }],
    meta: {
      title: "首页",
      icon: React.createElement(HomeOutlined),
      requireAuth: true,
    },
  },
  {
    path: "/about",
    key: "about",
    element: <CommonLayout />,
    children: [{ path: "", element: <About /> }],
    meta: {
      title: "关于",
      icon: React.createElement(InfoCircleOutlined),
      requireAuth: false,
    },
  },
];
