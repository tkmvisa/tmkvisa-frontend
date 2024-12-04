import Container from "@/components/ui/Container";
import Image from "next/image";
import React from "react";

const layout = ({ children }: any) => {
  
  return (
    <Container>
      <section className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-127px)] gap-10">
        <div className="w-full hidden h-full md:flex flex-col justify-center items-center">
          <figure>
            <Image src="/svg/Union.svg" width={425} height={386} alt="" />
          </figure>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="max-w-[440px] w-full mx-auto">
          {children}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default layout;
