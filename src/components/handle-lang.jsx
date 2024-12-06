"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

export const HandleLang =()=>{
    const params = useParams()
    const path = usePathname()
    const lang = ["en", "ru", "tr"]
    const filterLang = lang.filter(l => l !== params?.lang)
    const [open, setOpen] = useState(false)
    return(
      <>
        <div className="flex flex-col relative justify-end items-end text-end gap-2 ">
          <button onClick={()=>setOpen(!open)} className="font-bold uppercase">{params?.lang === "en" ? "ENG" : params?.lang}</button>
          {
            open && <ul className=" absolute top-9 bg-white rounded-lg border overflow-hidden shadow2">
            {
              filterLang?.map((item,idx)=>{
                const slug = path.replace(`/${params?.lang}/`, `/${item}/`)
                return(
                  <li key={idx} className={`uppercase font-bold hover:bg-light-gray ${filterLang.length === idx+1 ? "" : "border-b"} px-5 py-3`} onClick={()=>setOpen(!open)}><Link href={slug}>{item === "en" ? "ENG" : item}</Link></li>
                )
              })
            }
          </ul>
          }
          
        </div>
      </>
    )
  }


