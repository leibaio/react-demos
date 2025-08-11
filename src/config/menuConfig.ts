import { MenuItem } from "@/types/route";
import {
  BarChartOutlined,
  CoffeeOutlined,
  DashboardOutlined,
  FileTextOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React from "react";

const menuConfig: MenuItem[] = [
  {
    key: "/home",
    label: "首页",
    icon: React.createElement(HomeOutlined),
    path: "/home",
  },
  {
    key: "/dashboard",
    label: "仪表盘",
    icon: React.createElement(DashboardOutlined),
    children: [
      {
        key: "/dashboard/analytics",
        label: "数据分析",
        path: "/dashboard/analytics",
      },
      {
        key: "/dashboard/monitor",
        label: "监控中心",
        path: "/dashboard/monitor",
      },
      {
        key: "/dashboard/workplace",
        label: "工作台",
        path: "/dashboard/workplace",
      },
    ],
  },
  {
    key: "/user",
    label: "用户管理",
    icon: React.createElement(TeamOutlined),
    children: [
      {
        key: "/user/list",
        label: "用户列表",
        path: "/user/list",
      },
      {
        key: "/user/roles",
        label: "角色管理",
        path: "/user/roles",
        children: [
          {
            key: "/user/roles/list",
            label: "角色列表",
            path: "/user/roles/list",
          },
          {
            key: "/user/roles/permissions",
            label: "权限配置",
            path: "/user/roles/permissions",
          },
        ],
      },
      {
        key: "/user/departments",
        label: "部门管理",
        path: "/user/departments",
      },
    ],
  },
  {
    key: "/content",
    label: "内容管理",
    icon: React.createElement(FileTextOutlined),
    children: [
      {
        key: "/content/articles",
        label: "文章管理",
        path: "/content/articles",
      },
      {
        key: "/content/categories",
        label: "分类管理",
        path: "/content/categories",
      },
      {
        key: "/content/tags",
        label: "标签管理",
        path: "/content/tags",
      },
    ],
  },
  {
    key: "/reports",
    label: "报表统计",
    icon: React.createElement(BarChartOutlined),
    children: [
      {
        key: "/reports/sales",
        label: "销售报表",
        path: "/reports/sales",
      },
      {
        key: "/reports/user-analysis",
        label: "用户分析",
        path: "/reports/user-analysis",
      },
    ],
  },
  {
    key: "/demo",
    label: "演示页面",
    icon: React.createElement(CoffeeOutlined),
    path: "/demo",
  },
  {
    key: "/system",
    label: "系统设置",
    icon: React.createElement(SettingOutlined),
    children: [
      {
        key: "/system/config",
        label: "系统配置",
        path: "/system/config",
      },
      {
        key: "/system/logs",
        label: "系统日志",
        path: "/system/logs",
        children: [
          {
            key: "/system/logs/operation",
            label: "操作日志",
            path: "/system/logs/operation",
          },
          {
            key: "/system/logs/error",
            label: "错误日志",
            path: "/system/logs/error",
          },
          {
            key: "/system/logs/access",
            label: "访问日志",
            path: "/system/logs/access",
          },
        ],
      },
      {
        key: "/system/backup",
        label: "数据备份",
        path: "/system/backup",
      },
    ],
  },
  {
    key: "/about",
    label: "关于系统",
    icon: React.createElement(InfoCircleOutlined),
    path: "/about",
  },
];

export default menuConfig;
