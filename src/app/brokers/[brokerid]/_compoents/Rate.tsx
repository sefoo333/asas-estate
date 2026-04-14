import type { Rate } from '@/types/Broker'
import React from 'react'
import { FaStar } from 'react-icons/fa6'

function Rate({data}:{data:Rate}) {
  return (
    <div className="box py-5 border-b border-b-gray-300">
        <div className="user">
          <div className="te">
              <h1 className='font-bold'>{data?.User?.userName}</h1>
            <h3 className='text-sm text-gray-600'>{data?.User?.location} | {new Date(data?.createdAt).toLocaleDateString()}</h3>
          </div>
        </div>
            <div className="rates flex gap-1 my-2  items-center">
              <span className='mr-3 font-semibold'>{data?.rating}</span>
            
                 <div className="flex gap-0.5">
                        {Array.from({length:+data?.rating}).map((e , i:number) => <FaStar key={i}  />)}
                   </div>
        </div>
        <p>{data?.massege}</p>
    </div>
  )
}

export default Rate