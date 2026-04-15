import { ArrowUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function ProTopBox({data}:any) {
  return (
        <div className="box mb-5 items-center flex justify-between">
           <div className="first flex items-center gap-2">
             <Image src={"/Heroo.jpg"} alt="" width={100} height={100} className="w-13 h-13 rounded-xl " />
            <div className="body">
                <h1 className='font-semibold text-md'>{data?.title}</h1>
                <h2 className='text-[#9fa3af] font-medium text-sm'>{data?.location}</h2>
            </div>
           </div>
           <div className="second items-center flex gap-1 text-green-600">
            <ArrowUp size={18} />
            <h1>{data?.leads}</h1>
           </div>
        </div>
          )
}

export default ProTopBox