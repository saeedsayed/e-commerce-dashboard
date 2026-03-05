"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ColorModeButton } from "../ui/color-mode";
import { Button, Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { Tooltip } from "../ui/tooltip";

const ThemeAndLangButton = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useTranslations("Nav");

  const changeLanguage = (newLocale: "en" | "ar") => {
    const current = new URLSearchParams(Array.from(params.entries()));
    router.replace(`${pathname}?${current}`, { locale: newLocale });
  };
  const handleToggleLang = () => {
    changeLanguage(locale === "en" ? "ar" : "en");
  };
  return (
    <Flex
      border={"1px solid"}
      borderColor={"border.emphasized"}
      className="items-center justify-center w-fit rounded-xl px-2 py-1 overflow-hidden"
    >
      {/* toggle theme button */}
      <ColorModeButton />
      {/* toggle language button */}
      <Tooltip showArrow content={t("toggle_language")}>
        <Button variant={"ghost"} className="px-0!" onClick={handleToggleLang}>
          <Globe className="w-4" />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default ThemeAndLangButton;
