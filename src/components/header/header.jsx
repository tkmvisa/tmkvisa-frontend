"use client"
import React, { useContext } from 'react'
import { HandleLang } from '../handle-lang'
import UserDropdown from "../../components/user-avatar-menu/user-dropdown"
import { SettingContext } from '@/context/global-context'

const Header = () => {
    const {mobileNav, setMobileNav} = useContext(SettingContext)
    return (
        <header className='px-4 py-3 md:px-8 md:py-6 flex bg-white justify-between items-center border-b-[2px] border-border'>
            <div className='flex items-center gap-3 '>
                <button className='md:hidden' onClick={()=>setMobileNav(!mobileNav)}>
                    <svg width="30" height="18" viewBox="0 0 27 16" fill="none" className="-rotate-180 cursor-pointer">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4714 3.52859C10.7318 3.78894 10.7318 4.21105 10.4714 4.4714L6.94285 8L10.4714 11.5286C10.7318 11.7889 10.7318 12.2111 10.4714 12.4714C10.2111 12.7317 9.78899 12.7317 9.52864 12.4714L5.52864 8.4714C5.26829 8.21105 5.26829 7.78894 5.52864 7.52859L9.52864 3.52859C9.78899 3.26824 10.2111 3.26824 10.4714 3.52859Z" fill="#111827" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4714 3.52859C21.7318 3.78894 21.7318 4.21105 21.4714 4.4714L17.9428 8L21.4714 11.5286C21.7318 11.7889 21.7318 12.2111 21.4714 12.4714C21.2111 12.7317 20.789 12.7317 20.5286 12.4714L16.5286 8.4714C16.2683 8.21105 16.2683 7.78894 16.5286 7.52859L20.5286 3.52859C20.789 3.26824 21.2111 3.26824 21.4714 3.52859Z" fill="#111827" />
                    </svg>
                </button>
                <div className='bg-[#F8F8F8] py-[14px] px-4 rounded-[10px] max-w-[315px] lg:w-[315px] w-full flex items-center gap-2'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.80541 1.94002C5.01372 1.94002 1.93994 5.01379 1.93994 8.80548C1.93994 12.5972 5.01372 15.6709 8.80541 15.6709C12.5971 15.6709 15.6709 12.5972 15.6709 8.80548C15.6709 5.01379 12.5971 1.94002 8.80541 1.94002ZM0.689941 8.80548C0.689941 4.32344 4.32336 0.690018 8.80541 0.690018C13.2875 0.690018 16.9209 4.32344 16.9209 8.80548C16.9209 13.2875 13.2875 16.9209 8.80541 16.9209C4.32336 16.9209 0.689941 13.2875 0.689941 8.80548Z" fill="#6C6C6C" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5727 13.9629C13.8164 13.7185 14.2121 13.718 14.4565 13.9617L17.3932 16.8908C17.6376 17.1346 17.6381 17.5303 17.3944 17.7747C17.1506 18.0191 16.7549 18.0196 16.5105 17.7758L13.5738 14.8468C13.3294 14.603 13.3289 14.2073 13.5727 13.9629Z" fill="#6C6C6C" />
                    </svg>
                    <input type="text" placeholder='Search' className='w-full outline-none bg-transparent focus:border-none border-none' />
                </div>
            </div>
            <div className='flex items-center gap-3 md:gap-7'>
                <HandleLang />
                <UserDropdown />
            </div>
        </header>
    )
}

export default Header