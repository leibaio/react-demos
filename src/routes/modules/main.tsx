import ProtectedRoute from "@/components/common/ProtectedRoute";
import CommonLayout from "@/components/layout/CommonLayout";
import { RouteConfig } from "@/types/route";
import {
  CommentOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import React, { lazy } from "react";

// 懒加载主要页面
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Chat = lazy(() => import("@/pages/chat"));

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
  {
    path: "/chat",
    key: "chat",
    element: <ProtectedRoute element={CommonLayout} />,
    children: [{ path: "", element: <Chat /> }],
    meta: {
      title: "AI 对话",
      icon: React.createElement(CommentOutlined),
      requireAuth: true,
    },
  },
];
