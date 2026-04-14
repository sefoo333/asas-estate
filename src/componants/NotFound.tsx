import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function NotFound() {
  return (
    <div className="notFound absolute w-full h-full z-9  top-0 flex justify-center items-center text-center flex-col">
                {/* <Image src={"/empty.png"} alt='' width={400} height={400} className='object-contain' /> */}
                {/* <Search size={50} className='text-gray-500' /> */}
        <h1 className='font-semibold text-xl mt-4 animate-fade-in'>No results for your search</h1>
        {/* <p className=' text-gray-600'>we can't find any product matching your search</p> */}
    </div>
  )
}

export default NotFound