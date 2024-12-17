"use client"
import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Typography, Divider, Avatar } from "@mui/material";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const UserDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        Cookies.remove('jwt');
        handleClose()
        router.push('/en/login')
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Avatar and Username */}
            <h6 className='font-bold md:mr-4 font_man hidden md:block'>Atabay Kuliyev</h6>
            <Avatar
                src="/path/to/avatar.jpg"
                alt="Profile Picture"
                className="!cursor-pointer"
                sx={{ width: 32, height: 32 }}
                onClick={handleClick}
            />
            <svg width="16" height="16" onClick={handleClick} className="cursor-pointer" viewBox="0 0 14 14" fill="none" >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.08736 4.83753C3.31516 4.60972 3.68451 4.60972 3.91232 4.83753L6.99984 7.92505L10.0874 4.83753C10.3152 4.60972 10.6845 4.60972 10.9123 4.83753C11.1401 5.06533 11.1401 5.43468 10.9123 5.66248L7.41232 9.16248C7.18451 9.39029 6.81516 9.39029 6.58736 9.16248L3.08736 5.66248C2.85955 5.43468 2.85955 5.06533 3.08736 4.83753Z" fill="#111827" />
            </svg>


            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    elevation: 8, // Adjust the shadow depth
                    sx: {
                        mt: 2,
                        borderRadius: '12px',
                        overflow: "visible",
                        minWidth: 280,
                        boxShadow: "0px 4px 100px #64748b4e", // Custom shadow
                        p: 2, // Padding
                    },
                }}
                className="!p-4"
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose} className="!bg-transparent hover:!bg-transparent">
                    <div className="text-[#8E59FF] py-2 font-medium font_man flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 7.00999C9 5.90542 9.89543 5.00999 11 5.00999H13C14.1046 5.00999 15 5.90543 15 7.00999V18.01C15 18.5623 14.5523 19.01 14 19.01H10C9.44772 19.01 9 18.5623 9 18.01V7.00999Z" fill="#8E59FF" />
                            <path d="M17 13.01C17 12.4577 17.4477 12.01 18 12.01H20C21.1046 12.01 22 12.9054 22 14.01V18.01C22 18.5623 21.5523 19.01 21 19.01H18C17.4477 19.01 17 18.5623 17 18.01V13.01Z" fill="#8E59FF" />
                            <path d="M2 12.01C2 10.9054 2.89543 10.01 4 10.01H6C6.55228 10.01 7 10.4577 7 11.01V18.01C7 18.5623 6.55228 19.01 6 19.01H3C2.44772 19.01 2 18.5623 2 18.01V12.01Z" fill="#8E59FF" />
                        </svg>
                        Admin
                    </div>
                </MenuItem>
                <Divider />
                <MenuItem className="hover:!bg-transparent" onClick={handleClose}>
                    <div className="text-[#6F767E] py-2 font-semibold font_man hover:text-[#8E59FF] flex items-center gap-3">
                        Account Settings
                    </div>
                </MenuItem>
                <MenuItem className="hover:!bg-transparent" onClick={handleLogout}>
                    <div className="text-[#6F767E] pt-2 font-semibold font_man hover:text-[#8E59FF] flex items-center gap-3">
                        Log Out
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserDropdown;
