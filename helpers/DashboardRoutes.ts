import React from "react";
import {
  Boxes,
  HandHelping,
  Home,
  Images,
  Newspaper,
  Package,
  Users,
} from "lucide-react";

export type TDashboardRoute = {
  localKey: string;
  path: string;
  icon: React.ReactNode;
  subRotes?: TDashboardRoute[];
};

export const DashboardRoutes = [
  {
    localKey: "statistics",
    path: "/statistics",
    icon: Home,
  },
  {
    localKey: "inventory",
    path: "/inventory",
    icon: Package,
  },
  {
    localKey: "orders",
    path: "/orders",
    icon: HandHelping,
  },
  {
    localKey: "categories",
    path: "/categories",
    icon: Boxes,
  },
  {
    localKey: "media_library",
    path: "/media-library",
    icon: Images,
  },
  {
    localKey: "blogs",
    path: "/blogs",
    icon: Newspaper,
  },
  {
    localKey: "customers",
    path: "/customers",
    icon: Users,
  },
];
