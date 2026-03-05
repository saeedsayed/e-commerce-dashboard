import React from "react";
import Logo from "@/components/common/Logo";
import { getTranslations } from "next-intl/server";
import ThemeLangButton from "@/components/common/Theme&LangButton";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  List,
} from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const t = await getTranslations("Auth");

  return (
    <Grid
      as="main"
      templateColumns={"repeat(5, 1fr)"}
      templateRows={"repeat(12, 1fr)"}
      minH={"vh"}
      md={{ p: 12 }}
      p={4}
    >
      <GridItem
        as="nav"
        colSpan={5}
        rowSpan={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Logo />
        <ThemeLangButton />
      </GridItem>
      <GridItem
        as="aside"
        colSpan={2}
        rowSpan={11}
        display={"none"}
        lg={{ display: "unset" }}
      >
        <Flex flexDir={"column"} justifyContent={"space-between"} h={"full"}>
          <Box mt={12}>
            <Heading size={"3xl"} mb={3}>
              {t("welcome_back")}
            </Heading>
            <p className=" mt-2">{t("layout_subtitle")}</p>
          </Box>

          <List.Root spaceY={3} listStyle={"none"} fontSize={"sm"}>
            <List.Item>{t("feature_secure_sign_in")}</List.Item>
            <List.Item>{t("feature_fast_setup")}</List.Item>
            <List.Item>{t("feature_insights_reports")}</List.Item>
          </List.Root>

          <div className=" text-sm">
            &copy; {new Date().getFullYear()} {t("brand_name")}
          </div>
        </Flex>
      </GridItem>

      <GridItem colSpan={5} rowSpan={11} lg={{ gridColumn: "span 3/ span 3" }}>
        <Center h={"full"}>
          <Box
            p={7}
            className="w-full md:mb-0 max-w-md bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] rounded-xl shadow-2xl border border-white/5"
          >
            {children}
          </Box>
        </Center>
      </GridItem>
    </Grid>
  );
}
