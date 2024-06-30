import {
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

const menuConfig = [
  {
    key: "/home",
    icon: React.createElement(UserOutlined),
    label: "首页",
  },
  {
    key: "/about",
    icon: React.createElement(UserOutlined),
    label: "关于",
  },
  // {
  //   key: "/user-list",
  //   icon: UserOutlined,
  //   label: "用户管理",
  //   children: [
  //     {
  //       key: "/user-list/list",
  //       label: "用户列表",
  //     },
  //     {
  //       key: "/user-list/roles",
  //       label: "角色管理",
  //     },
  //   ],
  // },

];

export default menuConfig;
