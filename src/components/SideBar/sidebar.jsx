"use client"

import React, { useState } from "react";
import { Box, List, ListItem, Collapse } from "@mui/material";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";

const Sidebar = ({setMobileNav}) => {
    const [open, setOpen] = useState(false);


    const handleClick = () => {
        setOpen(!open);
    };

    const params = useParams()
    const router = useRouter()

    return (
        <aside className="max-w-[280px] w-full border-border px-8 py-6 h-screen ">
            <div className="flex items-center justify-between mb-6">
                <figure>
                    <Image src="/logo-dark.svg" alt="tmk visa" width={89} height={52} />
                </figure>
                <svg onClick={()=>setMobileNav(false)} width="27" height="16" viewBox="0 0 27 16" fill="none" className="hover:scale-105 cursor-pointer">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4714 3.52859C10.7318 3.78894 10.7318 4.21105 10.4714 4.4714L6.94285 8L10.4714 11.5286C10.7318 11.7889 10.7318 12.2111 10.4714 12.4714C10.2111 12.7317 9.78899 12.7317 9.52864 12.4714L5.52864 8.4714C5.26829 8.21105 5.26829 7.78894 5.52864 7.52859L9.52864 3.52859C9.78899 3.26824 10.2111 3.26824 10.4714 3.52859Z" fill="#111827" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4714 3.52859C21.7318 3.78894 21.7318 4.21105 21.4714 4.4714L17.9428 8L21.4714 11.5286C21.7318 11.7889 21.7318 12.2111 21.4714 12.4714C21.2111 12.7317 20.789 12.7317 20.5286 12.4714L16.5286 8.4714C16.2683 8.21105 16.2683 7.78894 16.5286 7.52859L20.5286 3.52859C20.789 3.26824 21.2111 3.26824 21.4714 3.52859Z" fill="#111827" />
                </svg>
            </div>
            <List>
                {/* Dashboard Item */}
                <ListItem onClick={()=>router.push(`/${params?.lang}/dashboard`)} className="cursor-pointer" sx={{ display: "flex", alignItems: "center", gap: "10px", padding: '16px', paddingLeft: 0, paddingRight: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                        <path d="M7 10.75C4.933 10.75 3.25 9.068 3.25 7C3.25 4.932 4.933 3.25 7 3.25C9.067 3.25 10.75 4.932 10.75 7C10.75 9.068 9.067 10.75 7 10.75ZM7 4.75C5.76 4.75 4.75 5.759 4.75 7C4.75 8.241 5.76 9.25 7 9.25C8.24 9.25 9.25 8.241 9.25 7C9.25 5.759 8.24 4.75 7 4.75ZM17 10.75C14.933 10.75 13.25 9.068 13.25 7C13.25 4.932 14.933 3.25 17 3.25C19.067 3.25 20.75 4.932 20.75 7C20.75 9.068 19.067 10.75 17 10.75ZM17 4.75C15.76 4.75 14.75 5.759 14.75 7C14.75 8.241 15.76 9.25 17 9.25C18.24 9.25 19.25 8.241 19.25 7C19.25 5.759 18.24 4.75 17 4.75ZM7 20.75C4.933 20.75 3.25 19.068 3.25 17C3.25 14.932 4.933 13.25 7 13.25C9.067 13.25 10.75 14.932 10.75 17C10.75 19.068 9.067 20.75 7 20.75ZM7 14.75C5.76 14.75 4.75 15.759 4.75 17C4.75 18.241 5.76 19.25 7 19.25C8.24 19.25 9.25 18.241 9.25 17C9.25 15.759 8.24 14.75 7 14.75ZM17 20.75C14.933 20.75 13.25 19.068 13.25 17C13.25 14.932 14.933 13.25 17 13.25C19.067 13.25 20.75 14.932 20.75 17C20.75 19.068 19.067 20.75 17 20.75ZM17 14.75C15.76 14.75 14.75 15.759 14.75 17C14.75 18.241 15.76 19.25 17 19.25C18.24 19.25 19.25 18.241 19.25 17C19.25 15.759 18.24 14.75 17 14.75Z" fill="#25314C" />
                    </svg>
                    <h4 className="text-sm !font-bold font_man">
                        <span>{params?.lang === "en" &&  "Dashboard"}</span>
                        <span>{params?.lang === "ru" &&  "Панель управления"}</span>
                        <span>{params?.lang === "tr" &&  "Kontrol paneli"}</span>
                    </h4>
                </ListItem>

                {/* Clients Item */}
                <ListItem onClick={handleClick} className="!cursor-pointer" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", padding: '16px', paddingLeft: 0, paddingRight: 0 }}>
                    <div className="flex cursor-pointer items-center gap-[10px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                            <path d="M12.009 10.75C9.66503 10.75 7.75903 8.843 7.75903 6.5C7.75903 4.157 9.66503 2.25 12.009 2.25C14.353 2.25 16.259 4.157 16.259 6.5C16.259 8.843 14.353 10.75 12.009 10.75ZM12.009 3.75C10.492 3.75 9.25903 4.983 9.25903 6.5C9.25903 8.017 10.492 9.25 12.009 9.25C13.526 9.25 14.759 8.017 14.759 6.5C14.759 4.983 13.525 3.75 12.009 3.75ZM15.9969 21.75H8.00305C5.58305 21.75 4.25 20.425 4.25 18.019C4.25 15.358 5.756 12.25 10 12.25H14C18.244 12.25 19.75 15.357 19.75 18.019C19.75 20.425 18.4169 21.75 15.9969 21.75ZM10 13.75C6.057 13.75 5.75 17.017 5.75 18.019C5.75 19.583 6.42405 20.25 8.00305 20.25H15.9969C17.5759 20.25 18.25 19.583 18.25 18.019C18.25 17.018 17.943 13.75 14 13.75H10Z" fill={open ? "#00C853" : "#1A202C"} />
                        </svg>
                        <h4 className="text-sm !font-bold font_man">
                            <span>{params?.lang === "en" &&  "Clients"}</span>
                            <span>{params?.lang === "ru" &&  "Клиент"}</span>
                            <span>{params?.lang === "tr" &&  "Müşteri"}</span>
                            
                        </h4>
                    </div>
                    {open ?
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 8.29289C11.6834 7.90237 12.3166 7.90237 12.7071 8.29289L18.7071 14.2929C19.0976 14.6834 19.0976 15.3166 18.7071 15.7071C18.3166 16.0976 17.6834 16.0976 17.2929 15.7071L12 10.4142L6.70711 15.7071C6.31658 16.0976 5.68342 16.0976 5.29289 15.7071C4.90237 15.3166 4.90237 14.6834 5.29289 14.2929L11.2929 8.29289Z" fill="#CBD5E0" />
                        </svg>
                        : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 8.29289C11.6834 7.90237 12.3166 7.90237 12.7071 8.29289L18.7071 14.2929C19.0976 14.6834 19.0976 15.3166 18.7071 15.7071C18.3166 16.0976 17.6834 16.0976 17.2929 15.7071L12 10.4142L6.70711 15.7071C6.31658 16.0976 5.68342 16.0976 5.29289 15.7071C4.90237 15.3166 4.90237 14.6834 5.29289 14.2929L11.2929 8.29289Z" fill="#CBD5E0" />
                        </svg>
                    }
                </ListItem>

                {/* Submenu */}
                <Collapse in={open} timeout="auto" className="pl-2" unmountOnExit>
                    <List component="div" className="border-l-[2px] border-border" disablePadding>
                        <ListItem button sx={{ pl: 2  }} className="hover:!bg-transparent py-4">
                            <h4 className="text-sm relative !font-bold -text--text-gray font_man hover:text-primary">
                                 <span>{params?.lang === "en" &&  "Applications"}</span>
                                 <span>{params?.lang === "ru" &&  "Приложения"}</span>
                                 <span>{params?.lang === "tr" &&  "Uygulamalar"}</span>
                                <div className="bg-transparent absolute -left-[18px] -top-1 rounded-bl-[8px] border-[2px] border-t-0 border-r-0 border-border h-4 w-3"/>
                            </h4>
                        </ListItem>
                        <ListItem button sx={{ pl: 2 }} className="hover:!bg-transparent py-4">
                            <h4 className="text-sm !font-bold -text--text-gray relative font_man hover:text-primary">
                                <span>{params?.lang === "en" &&  "Client List"}</span>
                                 <span>{params?.lang === "ru" &&  "Список клиентов"}</span>
                                 <span>{params?.lang === "tr" &&  "Müşteri Listesi"}</span>
                                <div className="bg-transparent absolute -left-[18px] -top-1 rounded-bl-[8px] border-[2px] border-t-0 border-r-0 border-border h-4 w-3"/>    
                            </h4>
                        </ListItem>
                        <ListItem button sx={{ pl: 2 }}  onClick={()=>router.push(`/${params?.lang}/new-application`)} className="hover:!bg-transparent py-4">
                            <h4 className="text-sm !font-bold -text--text-gray relative font_man hover:text-primary">
                                <span>{params?.lang === "en" &&  "New Application"}</span>
                                 <span>{params?.lang === "ru" &&  "Новое приложение"}</span>
                                 <span>{params?.lang === "tr" &&  "Yeni Uygulama"}</span>
                                <div className="bg-transparent absolute -left-[18px] -top-1 rounded-bl-[8px] border-[2px] border-t-0 border-r-0 border-border h-4 w-3"/>    
                            </h4>
                        </ListItem>
                        <ListItem button sx={{ pl: 2 }}  onClick={()=>router.push(`/${params?.lang}/application-status`)} className="hover:!bg-transparent !pb-0 pt-4">
                            <h4 className="text-sm !font-bold -text--text-gray relative font_man hover:text-primary">
                                <span>{params?.lang === "en" &&  "Application Status"}</span>
                                 <span>{params?.lang === "ru" &&  "Статус заявки"}</span>
                                 <span>{params?.lang === "tr" &&  "Başvuru Durumu"}</span>
                                <div className="bg-transparent absolute -left-[18px] -top-1 rounded-bl-[8px] border-[2px] border-t-0 border-r-0 border-border h-4 w-3"/>    
                            </h4>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </aside>
    );
};

export default Sidebar;
