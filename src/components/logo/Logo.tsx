import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = ({mobile, white}:any) => {
  return (
    <figure>
        <Link href="/">
            <Image src="/logo.svg" alt="shop.co" width={mobile ? 126 : 160} height={22} className={white && 'invert'}/>
        </Link>
    </figure>
  )
}

export default Logo