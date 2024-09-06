import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  return (
    <section className='px-14 items-center justify-center flex flex-col gap-5'>
      <Image src="/error.avif" width={500} height={500} alt='error'/>   
          <p className='font-satoshi font-semibold text-base text-black'>Log for entered Date already exists...</p>
          <Link href="/" className='py-1 px-2 bg-[#ff4e00] text-white rounded-lg'>Go Back</Link>
      </section>
  )
}

export default page
