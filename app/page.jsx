import React from 'react'
import Image from 'next/image'
import Log from '@/components/Log'

const Home = () => {
  return (
    <div className='px-14 flex flex-col '>
      
      <div className='w-full bg-[#f5f5f5] rounded-xl py-5 flex justify-center flex-col gap-3'>

      <h6 className='text-center text-black'>WELCOME TO DIARY</h6>

      <p className=' text-center text-[24px] font-semibold'>
          Capture <Image src="/hand.png" width={50} height={50} className='inline' /> your <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'> thoughts</span> <Image src="/thought.png" width={40} height={40} className='inline' />, <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>memories</span> <Image src="/memories.png" width={40} height={40} className='inline' />, and <br /> <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>experiences</span>  <Image src="/book.png" width={40} height={40} className='inline' />, effortlessly with Diary <br /><span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-[28px]'>
            – the ultimate diary app</span> .
      </p>

     

      </div>

    <Log/>

      
    </div>
  )
}

export default Home
  