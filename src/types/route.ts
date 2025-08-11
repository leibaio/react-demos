import { ReactNode } from "react";

// 路由配置类型
export interface RouteConfig {
  path: string;
  element?: ReactNode;
  children?: RouteConfig[];
  meta?: RouteMeta;
  key?: string;
}

// 路由元信息
export interface RouteMeta {
  title?: string;
  icon?: ReactNode;
  requireAuth?: boolean;
  roles?: string[];
  hidden?: boolean;
  keepAlive?: boolean;
  breadcrumb?: boolean;
  affix?: boolean;
}

// 菜单项类型
export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: MenuItem[];
  disabled?: boolean;
  hidden?: boolean;
  roles?: string[];
  badge?: string | number;
  target?: "_blank" | "_self";
  divider?: boolean;
}

// 面包屑项类型
export interface BreadcrumbItem {
  title: string;
  path?: string;
  icon?: ReactNode;
}

// 菜单权限配置
export interface MenuPermission {
  menuKey: string;
  roles: string[];
  permissions: string[];
}
