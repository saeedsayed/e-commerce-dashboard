import { Home, Settings } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Homepage"
            >
              {/* Home icon */}
              <Home />
              <span className="is-drawer-close:hidden">Homepage</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
