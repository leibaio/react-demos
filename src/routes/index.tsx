import { RouteConfig } from "@/types/route";
import { Navigate } from "react-router-dom";
import { authRoutes } from "./modules/auth";
import { demoRoutes } from "./modules/demo";
import { mainRoutes } from "./modules/main";

// 合并所有路由配置
const routes: RouteConfig[] = [
  { path: "/", element: <Navigate to="/home" replace /> },
  ...mainRoutes,
  ...authRoutes,
  ...demoRoutes,
];

export default routes;
