"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe, Moon, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const ThemeAndLangButton = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  const changeLanguage = (newLocale: "en" | "ar") => {
    router.replace(pathname, { locale: newLocale });
  };
  return (
    <div className="flex gap-4 items-center justify-center w-fit border rounded-xl px-2 py-1">
      {/* toggle theme button */}
      <label
        className="swap swap-rotate tooltip tooltip-bottom"
        data-tip={t("toggle_theme")}
      >
        <input type="checkbox" className="theme-controller" value="light" />
        {/* sun icon */}
        <Sun className="swap-on h-7 w-7 fill-current text-yellow-400" />
        {/* moon icon */}
        <Moon className="swap-off h-7 w-7 fill-current text-amber-100" />
      </label>
      {/* toggle language button */}
      <label
        className={`flex cursor-pointer tooltip ${locale === "ar" ? "tooltip-right" : "tooltip-left"}`}
        data-tip={t("toggle_language")}
      >
        <Globe className="w-4" />
        <label className="swap">
          <input
            type="checkbox"
            onChange={() => changeLanguage(locale === "en" ? "ar" : "en")}
            checked={locale === "ar"}
          />
          <div className="swap-on">EN</div>
          <div className="swap-off">AR</div>
        </label>
      </label>
    </div>
  );
};

export default ThemeAndLangButton;
