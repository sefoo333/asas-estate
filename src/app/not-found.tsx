"use client"
import Image from 'next/image'
import React from 'react'

function NotFound() {
  return (
    <div className="parent absolute w-full h-full z-9 bg-white top-0 flex justify-center items-center text-center flex-col">
        <Image src={"/notFound.jpg"} alt='' width={400} height={400} className='object-contain' />
            <h1 className='font-bold text-3xl'> Not Found 404</h1>
            <h2 className=' text-lg'>The page Not found or you are write wrong !</h2>
    </div>
  )
}

export default NotFound