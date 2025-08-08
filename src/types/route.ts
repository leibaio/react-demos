import { ReactNode } from "react";

// 路由配置类型
export interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
  meta?: RouteMeta;
}

// 路由元信息
export interface RouteMeta {
  title?: string;
  icon?: string;
  requireAuth?: boolean;
  roles?: string[];
  hidden?: boolean;
  keepAlive?: boolean;
}

// 菜单项类型
export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: MenuItem[];
  disabled?: boolean;
}

// 面包屑项类型
export interface BreadcrumbItem {
  title: string;
  path?: string;
}
