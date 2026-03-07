"use client";
import { DashboardRoutes } from "@/helpers/DashboardRoutes";
import { Link, usePathname } from "@/i18n/navigation";
import {
  AbsoluteCenter,
  Box,
  Button,
  Flex,
  List,
  Span,
  Text,
} from "@chakra-ui/react";
import { ChevronDown, SidebarClose, SidebarOpen } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Tooltip } from "../ui/tooltip";
import Logo from "../common/Logo";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSubroutesOpen, setIsSubroutesOpen] = useState<string | null>();
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const local = useLocale();
  return (
    <Box
      as={"aside"}
      borderEnd={"1px solid"}
      borderEndColor={"border.emphasized"}
      h={"vh"}
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
      <Box p={4} overflowX={"hidden"} w={"full"}>
        <Logo size={isSidebarOpen ? "md" : "sm"} />
      </Box>
      {/* Sidebar content here */}
      <List.Root
        w={"full"}
        overflowY={"auto"}
        h={"calc(100% - 4.5rem)"}
        pb={16}
        scrollbarWidth={"thin"}
      >
        {/* List item */}
        {DashboardRoutes.map((route) => (
          <List.Item
            transition={"backgrounds"}
            rounded={"md"}
            transitionDuration={"1000"}
            overflow={"hidden"}
            key={route.localKey}
            minH={"fit-content"}
          >
            <Tooltip
              showArrow
              content={t(route.localKey)}
              disabled={isSidebarOpen}
            >
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                _hover={{ bg: "bg.emphasized" }}
                bg={route.path.includes(pathname) ? "bg.muted" : ""}
              >
                <Link
                  href={route.path}
                  className="flex p-4! gap-2 flex-1"
                  data-tip={t(route.localKey)}
                >
                  {/* icon */}
                  <Span w={8} h={8}>
                    <route.icon className="size-8" />
                  </Span>
                  <Text
                    opacity={isSidebarOpen ? "100" : "0"}
                    transition={"opacity .3s"}
                    truncate
                  >
                    {t(route.localKey)}
                  </Text>
                </Link>
                {!!route.subRotes && isSidebarOpen && (
                  <Button
                    variant={"ghost"}
                    size={"xs"}
                    onClick={() =>
                      setIsSubroutesOpen((p) =>
                        p === route.localKey ? null : route.localKey,
                      )
                    }
                  >
                    <ChevronDown
                      className={`${isSubroutesOpen === route.localKey ? "rotate-180" : ""} transition-transform! duration-300`}
                    />
                  </Button>
                )}
              </Flex>
            </Tooltip>
            {/* ================== subroutes ============== */}
            {!!route.subRotes && (
              <>
                <List.Root
                  listStyle={"none"}
                  ms={isSidebarOpen ? 6 : 0}
                  py={isSubroutesOpen === route.localKey ? 2 : 0}
                  transition={"all .2s linear"}
                  // maxH={isSubroutesOpen === route.localKey ? "unset" : "0"}
                  display={"grid"}
                  gridTemplateRows={
                    isSubroutesOpen === route.localKey ? "1fr" : "0fr"
                  }
                  borderInlineStart={isSidebarOpen ? "1px solid" : ""}
                  borderColor={"border.emphasized"}
                >
                  {route?.subRotes.map((subRoute) => (
                    <List.Item
                      transition={"backgrounds"}
                      overflow={"hidden"}
                      rounded={"md"}
                      transitionDuration={"1000"}
                      key={subRoute.localKey}
                      _hover={{ bg: "bg.muted" }}
                      bg={pathname.includes(subRoute.path) ? "bg.muted" : ""}
                    >
                      <Tooltip
                        showArrow
                        content={t(subRoute.localKey)}
                        disabled={isSidebarOpen}
                      >
                        <Link
                          href={subRoute.path}
                          className="flex items-center p-4! gap-2"
                          data-tip={t(subRoute.localKey)}
                        >
                          {/* Home icon */}
                          <Span w={6} h={6}>
                            <subRoute.icon className="size-6" />
                          </Span>
                          <Text
                            opacity={isSidebarOpen ? "100" : "0"}
                            transition={"opacity .3s"}
                            truncate
                          >
                            {t(subRoute.localKey)}
                          </Text>
                        </Link>
                      </Tooltip>
                    </List.Item>
                  ))}
                </List.Root>
              </>
            )}
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
};

export default Sidebar;
