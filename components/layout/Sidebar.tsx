"use client";
import { DashboardRoutes } from "@/helpers/DashboardRoutes";
import { Link } from "@/i18n/navigation";
import { AbsoluteCenter, Box, Center, List, Span } from "@chakra-ui/react";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Tooltip } from "../ui/tooltip";
import Logo from "../common/Logo";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const t = useTranslations("Sidebar");
  const local = useLocale();
  return (
    <Box
      as={"aside"}
      borderEnd={"1px solid"}
      borderEndColor={"border.emphasized"}
      
      bg={"bg.subtle"}
      w={isSidebarOpen ? "64" : "16"}
      transition={"all"}
      transitionDuration={"slow"}
      position={"relative"}
    >
      <AbsoluteCenter
        onClick={() => setIsSidebarOpen((p) => !p)}
        axis={"vertical"}
        zIndex={10}
        cursor={"pointer"}
        className={`end-0 ${local === "ar" ? "-translate-x-1/2! rotate-180" : "translate-x-1/2!"} -translate-y-1/2`}
      >
        {isSidebarOpen ? <SidebarClose /> : <SidebarOpen />}
      </AbsoluteCenter>
      {/* overlay for small screens */}
      {/* <Span /> */}
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        <Box p={4} overflowX={"hidden"} w={"full"}>
          <Logo size={isSidebarOpen ? "md" : "sm"} />
        </Box>
        {/* Sidebar content here */}
        <List.Root className="menu w-full grow">
          {/* List item */}
          {DashboardRoutes.map((route) => (
            <List.Item
              _hover={{ bg: "bg.muted" }}
              transition={"backgrounds"}
              rounded={"md"}
              transitionDuration={"1000"}
              key={route.localKey}
            >
              <Tooltip
                showArrow
                content={t(route.localKey)}
                disabled={isSidebarOpen}
              >
                <Link
                  href={route.path}
                  className="flex p-4! gap-2"
                  data-tip={t(route.localKey)}
                >
                  {/* Home icon */}
                  <Span w={8} h={8}>
                    <route.icon className="size-8" />
                  </Span>
                  <span
                    className={`${isSidebarOpen ? "" : "opacity-0"} truncate  text-sm transition-all duration-300`}
                  >
                    {t(route.localKey)}
                  </span>
                </Link>
              </Tooltip>
            </List.Item>
          ))}
        </List.Root>
      </div>
    </Box>
  );
};

export default Sidebar;
