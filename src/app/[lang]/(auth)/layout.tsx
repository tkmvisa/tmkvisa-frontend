import { HandleLang } from "@/components/handle-lang";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = ({ children }: any) => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 h-screen gap-10">
        <div className="w-full hidden h-full md:flex flex-col justify-center items-center bg-primary">
          <figure>
            <Image src="/logo-w.svg" width={330} height={115} alt="tkmVisa" />
          </figure>
        </div>
        <div className="flex relative flex-col items-center justify-center">
          <div className="max-w-[440px] w-full mx-auto">{children}</div>
          <p className="text-sm text-primary absolute bottom-4 flex flex-wrap gap-2 text-center justify-center ">
            <span>
              <Link href="#" className="-text--text-gray">
                © 2024 TKMVISA . Alrights reserved.
              </Link>
            </span>
            <span>
              <Link href="#" className="hover:underline">Terms & Conditions</Link>
            </span>
            <span>
              <Link href="#" className="hover:underline">Privacy Policy</Link>
            </span>
          </p>
          <div className="absolute top-4 right-4"><HandleLang /></div>
        </div>
      </section>
    </>
  );
};

export default layout;
