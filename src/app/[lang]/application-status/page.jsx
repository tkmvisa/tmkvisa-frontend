"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ApplicationTimeline from "../../../components/ApplicationTimeline"
import Link from 'next/link'
import NotFound from "../../../components/NotFound"
import axios from 'axios'
import { formatEmailToName } from '@/utils/utils'
import { useParams, useSearchParams } from 'next/navigation'


const ApplicationStatus = () => {
    const searchParams = useSearchParams()
    const appId = searchParams.get('applicationId')
    const [applicationNumber, setApplicationNumber] = useState(appId)
    const[applicationRes, setApplicationRes] = useState()

    const handelSearchApplication = async () => {
        const application = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications?populate[0]=users_permissions_user&filters[ApplicationID][$eq]=${applicationNumber}`)
        setApplicationRes(application?.data?.data[0]?.attributes)
    }

    useEffect(()=>{
        (async()=>{
            if(appId){
                const application = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/applications?populate[0]=users_permissions_user&filters[ApplicationID][$eq]=${appId}`)
                setApplicationRes(application?.data?.data[0]?.attributes)
            }
        })()
    },[])

    return (
        <>
            <header className='p-6 px-8'>
                <Image src="/logo-dark.svg" alt="tmk visa" width={180} height={105} />
            </header>

            <section className='max-w-[762px] mx-auto px-3 md:px-0 mt-4'>
                <h2 className='font-semibold text-2xl text-center'>Application status</h2>
                <div className='flex justify-center items-center gap-2 mt-10'>
                    <input
                        type='text'
                        value={applicationNumber}
                        onChange={(e)=>setApplicationNumber(e.target.value)}
                        className='px-6 py-4 placeholder:-text--text-gray bg-[#F1F4F6] max-w-[360px] w-full rounded-full'
                        placeholder='Application number'
                    />
                    <button className='hover:scale-105 transition-all duration-200 hover:opacity-80' onClick={handelSearchApplication}>
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                            <rect width="55.9403" height="55.2131" rx="27.6066" fill="black" />
                            <path d="M30.4655 32.8086L35.4556 27.6064M35.4556 27.6064L30.4655 22.4042M35.4556 27.6064L20.4854 27.6064" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </section>

            {
                applicationRes ?
                    <div className='pb-10 md:pb-20'>
                        <section className='max-w-[762px] mx-auto px-3 md:px-0 mt-4 font_man'>
                            <section className='bg-[#fff] px-[34px] mt-[37px] py-[14px] rounded-2xl blr'>
                                <p className='text-[#909090] font-medium'>Service type</p>
                                <p className='font-bold text-[#0F172A] capitalize'>{applicationRes?.country} {applicationRes?.Visa_Type} Visa</p>
                            </section>

                            <section className='bg-[#fff] px-5 !pb-5 sm:px-[34px] mt-6 py-[14px] rounded-2xl blr'>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <p className='text-[#909090] text-sm font-medium'>Application number</p>
                                        <p className='font-bold text-[#0F172A]'>{applicationRes?.ApplicationID}</p>
                                    </div>
                                    <button>
                                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                                            <rect width="56" height="56" rx="28" fill="#F8FAFC" />
                                            <path d="M34 24H26C24.8954 24 24 24.8954 24 26V34C24 35.1046 24.8954 36 26 36H34C35.1046 36 36 35.1046 36 34V26C36 24.8954 35.1046 24 34 24Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M32 24V22C32 21.4696 31.7893 20.9609 31.4142 20.5858C31.0391 20.2107 30.5304 20 30 20H22C21.4696 20 20.9609 20.2107 20.5858 20.5858C20.2107 20.9609 20 21.4696 20 22V30C20 30.5304 20.2107 31.0391 20.5858 31.4142C20.9609 31.7893 21.4696 32 22 32H24" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <h6 className='mt-6 mb-3 font-bold text-[17px] text-[#0F172A]'>Customer details</h6>
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-sm font-medium'>Customer</p>
                                        <p className='font-medium text-[#94A3B8] mt-1'>{formatEmailToName(applicationRes?.email)}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium'>Phone</p>
                                        <p className='font-medium text-[#94A3B8] mt-1'>+90 5** *** ****</p>
                                    </div>
                                </div>
                                <div className='flex sm:flex-row flex-col gap-2 justify-between mt-1 sm:mt-3'>
                                    <div>
                                        <p className='text-sm font-medium'>Address</p>
                                        <p className='font-medium text-[#94A3B8] mt-1'>Ç******* ********. G********* ******</p>
                                        <p className='font-medium text-[#94A3B8] mt-1'>Ka*******/İs***</p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium'>Email</p>
                                        <p className='font-medium text-[#94A3B8] mt-1'>kuliyev1199@gmail.com</p>
                                    </div>
                                </div>
                            </section>

                            <section className='bg-[#fff] px-[20px] mt-[37px] py-[14px] rounded-2xl blr'>
                                <h6 className='font-bold text-[17px] text-[#0F172A] pb-4 mt-1'>Application status</h6>
                                <hr />
                                <div className='sm:px-[14px]'>
                                    <ApplicationTimeline />
                                </div>
                            </section>

                        </section>
                    </div> : <NotFound />

            }


            <footer className='bg-[#9747FF] py-[50px] '>
                <div className='max-w-[1200px] mx-auto px-3 flex flex-col gap-3 md:flex-row justify-center md:justify-between items-center'>
                    <h3 className='text-2xl sm:text-4xl font-semibold max-w-[475px] text-pure text-center md:text-left'>Download our app for the best experience</h3>
                    <div className='flex items-start gap-5'>
                        <Link href="#"><Image src="/App-Store.svg" alt='btn' width={160} height={50} className='hover:scale-105 cursor-pointer' /></Link>
                        <Link href="#"><Image src="/Google-Play.svg" alt='btn' width={160} height={50} className='hover:scale-105 cursor-pointer' /></Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default ApplicationStatus