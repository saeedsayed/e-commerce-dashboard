import React from "react";
import Logo from "@/components/common/Logo";
import { getLocale, getTranslations } from "next-intl/server";
import ThemeLangButton from "@/components/common/Theme&LangButton";

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const locale = await getLocale();
  const t = await getTranslations("Auth");

  return (
    <div
      data-locale={locale}
      // className="min-h-screen bg-linear-to-br from-slate-800 via-slate-900 to-black text-slate-100"
      className="min-h-screen flex flex-col md:p-12 p-4"
    >
      <nav className="flex justify-between items-center ">
        <Logo />
        <ThemeLangButton />
      </nav>
      <div className="flex flex-1 gap-4">
        <aside className="hidden md:flex md:w-2/5 flex-col justify-between bg-[radial-gradient(circle_at_0_0,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size[24px_24px]">
          <div className="mt-12">
            <h1 className="text-3xl font-semibold">{t("welcome_back")}</h1>
            <p className=" mt-2">{t("layout_subtitle")}</p>
          </div>

          <ul className="mt-7  list-none space-y-2">
            <li>{t("feature_secure_sign_in")}</li>
            <li>{t("feature_fast_setup")}</li>
            <li>{t("feature_insights_reports")}</li>
          </ul>

          <div className=" text-sm">
            &copy; {new Date().getFullYear()} {t("brand_name")}
          </div>
        </aside>

        <main className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full md:mb-0 max-w-md bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] rounded-xl shadow-2xl border border-white/5 p-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
