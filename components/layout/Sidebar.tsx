import { DashboardRoutes } from "@/helpers/DashboardRoutes";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const Sidebar = async () => {
  const t = await getTranslations("Sidebar");
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      {/* overlay for small screens */}
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      />
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}
          {DashboardRoutes.map((route) => (
            <li key={route.localKey}>
              <Link
                href={route.path}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip={t(route.localKey)}
              >
                {/* Home icon */}
                <route.icon />
                <span className="is-drawer-close:hidden">
                  {t(route.localKey)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
