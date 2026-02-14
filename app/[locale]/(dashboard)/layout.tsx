import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open overflow-hidden">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
        {/* Page content here */}
        <div className="p-4">{children}</div>
      </div>
      <Sidebar />
    </div>
  );
};

export default layout;
