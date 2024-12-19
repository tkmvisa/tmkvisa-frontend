"use client";
import React, { useContext } from "react";
import Sidebar from "../../../components/SideBar/sidebar";
import Header from "../../../components/header/header";
import { SettingContext } from "@/context/global-context";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

const Layout = ({ children }: any) => {
  const { mobileNav, setMobileNav } = useContext(SettingContext);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <section className="flex">
        {mobileNav && isMobile ? (
          <div className="fixed inset-0 bottom-0 border-r top-0 bg-pure z-10 w-[280px] left-0">
            <Sidebar setMobileNav={setMobileNav} />
          </div>
        ) : (
          <div className="fixed inset-0 hidden md:block bottom-0 border-r top-0 bg-pure z-10 w-[280px] left-0">
            <Sidebar setMobileNav={setMobileNav} />
          </div>
        )}

        <div className="flex-1 h-full !bg-[#F8F8F8] md:pl-[280px]">
          <Header />
          <section className="px-2 md:px-6 !py-8">
            <div className="bg-pure px-2 md:p-6 !py-5 rounded-2xl">
              {children}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Layout;
