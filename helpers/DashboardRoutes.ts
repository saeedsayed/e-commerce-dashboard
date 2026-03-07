import React from "react";
import {
  Boxes,
  HandHelping,
  Home,
  Images,
  LucideProps,
  Newspaper,
  Package,
  TicketPercent,
  Truck,
  Users,
} from "lucide-react";

export type TDashboardRoute = {
  localKey: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  subRotes?: TDashboardRoute[];
};

export const DashboardRoutes: TDashboardRoute[] = [
  {
    localKey: "statistics",
    path: "/statistics",
    icon: Home,
  },
  {
    localKey: "products",
    path: "/products",
    icon: Package,
  },
  {
    localKey: "orders",
    path: "/orders",
    icon: HandHelping,
  },
  {
    localKey: "shipping_methods",
    path: "/shipping-methods",
    icon: Truck,
  },
  {
    localKey: "coupons",
    path: "/coupons",
    icon: TicketPercent,
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
