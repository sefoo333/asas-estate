import { Broker } from '@/types/Broker'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

function BrokerSug({data}: {data: Broker}) {
  return (
     <div className="box flex gap-3 items-center bg-slate-100/30 p-3 rounded-lg  ">
    <Image src={"/Heroo.jpg"} alt='' width={200} height={200} className=" w-15 h-15  object-cover rounded-full " />
  <div className="flex justify-between w-full items-center">
      <div className="text">
        <h1 className='font-semibold text-lg'>{data?.userName}</h1>
        <h1 className=' text-[13px] text-[#898989]'>{data?.company}</h1>
    </div>
    <Link href={`/brokers/${data?.id}`}>
    <div className="icon">
        <RiArrowRightSLine size={22} className='text-gray-400' />
    </div>
    </Link>
  </div>
   </div>
     )
}

export default BrokerSug