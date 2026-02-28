import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("Footer");
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 h-14">
      <aside>
        <p>
          {t("copyright")} © {new Date().getFullYear()} -{" "}
          {t("rights_reserved")}
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
