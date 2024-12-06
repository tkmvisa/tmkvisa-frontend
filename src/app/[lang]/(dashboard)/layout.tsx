import React from "react";
import Sidebar from "../../../components/SideBar/sidebar";
import Header from "../../../components/header/header";

const Layout = ({ children }: any) => {
  return (
    <>
      <section className="flex">
        <Sidebar />
        <div className="flex-1 h-screen !bg-[#F8F8F8] ">
          <Header />
          {children}
        </div>
      </section>
    </>
  );
};

export default Layout;
