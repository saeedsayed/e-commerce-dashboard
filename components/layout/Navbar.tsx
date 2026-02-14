import { PanelRightClose } from "lucide-react";
import React from "react";
import ThemeAndLangButton from "../common/Theme&LangButton";

const Navbar = () => {
  return (
    <nav className="navbar w-full bg-base-300">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        {/* Sidebar toggle icon */}
        <PanelRightClose />
      </label>
      <div className="px-4">Navbar Title</div>
      <div className="ms-auto">
        <ThemeAndLangButton />
      </div>
    </nav>
  );
};

export default Navbar;
