import CommonLayout from "@/components/layout/CommonLayout";
import { RouteConfig } from "@/types/route";
import { lazy } from "react";

// 懒加载演示页面
const Demo = lazy(() => import("@/pages/demos"));

// 演示页面路由
export const demoRoutes: RouteConfig[] = [
  {
    path: "/demo",
    element: <CommonLayout />,
    children: [{ path: "", element: <Demo /> }],
    meta: {
      title: "演示",
      icon: "experiment",
      requireAuth: false,
    },
  },
];
