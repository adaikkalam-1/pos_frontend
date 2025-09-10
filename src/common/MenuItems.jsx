import {
  LogoutOutlined,
  PieChartOutlined,
  ProjectOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import React from "react";

export const menuItems = [
  {
    label: "Sale",
    key: "/",
    icon: React.createElement(ProjectOutlined),
  },
  {
    label: "Products",
    key: "/products",
    icon: React.createElement(ShoppingCartOutlined),
  },
  {
    label: "Reports",
    key: "/reports",
    icon: React.createElement(RiseOutlined),
  },
];
