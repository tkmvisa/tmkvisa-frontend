import Image from 'next/image'
import React from 'react'

const NotFound = ({t}) => {
  return (
    <section className='mt-[134px] mb-[300px] md:mb-[500px] font_man'>
        <div className='max-w-[320px] mx-auto flex flex-col justify-center items-center'>
            <Image src="/not-found.svg" alt="" width={200} height={200} className=""/>
            <h4 className='text-4xl font-bold text-center mt-[38px]'>{t?.not_found_title}</h4>
            <p className='mt-6 font-medium text-center'>{t?.not_found_info}</p>
        </div>
    </section>
  )
}

export default NotFound