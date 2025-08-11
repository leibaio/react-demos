import CommonLayout from "@/components/layout/CommonLayout";
import { RouteConfig } from "@/types/route";
import { CoffeeOutlined } from "@ant-design/icons";
import React, { lazy } from "react";

// 懒加载演示页面
const Demo = lazy(() => import("@/pages/demos"));
const Example = lazy(() => import("@/pages/example"));

// 演示页面路由
export const demoRoutes: RouteConfig[] = [
  {
    path: "/demo",
    key: "demo",
    element: <CommonLayout />,
    children: [
      { path: "", element: <Demo /> },
      {
        key: "example",
        path: "example",
        element: <Example />,
        meta: { title: "演示" },
      },
      {
        path: "more",
        key: "more",
        meta: { title: "更多演示" },
        children: [
          {
            path: "child1",
            key: "child1",
            element: <div>子菜单1</div>,
            meta: { title: "子菜单1" },
          },
          {
            path: "child2",
            key: "child2",
            element: <div>子菜单2</div>,
            meta: { title: "子菜单2" },
          },
        ],
      },
    ],
    meta: {
      title: "演示",
      icon: React.createElement(CoffeeOutlined),
      requireAuth: false,
    },
  },
];
