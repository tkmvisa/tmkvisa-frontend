import React from "react";
import Sidebar from "../../../components/SideBar/sidebar";
import Header from "../../../components/header/header";

const Layout = ({ children }: any) => {
  return (
    <>
      <section className="flex">
        <div className="fixed top-0 bg-pure z-10 w-[280px] left-0">
          <Sidebar />
        </div>
        <div className="flex-1 h-full !bg-[#F8F8F8] pl-[280px]">
          <Header />
          <section className="px-6 py-8">
            <div className="bg-pure p-6 rounded-2xl">{children}</div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Layout;
