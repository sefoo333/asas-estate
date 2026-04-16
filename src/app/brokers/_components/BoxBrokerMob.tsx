import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { BoxBrokerProps } from './BoxBroker'
import Link from 'next/link';

function BoxBrokerMob({data}:{data:BoxBrokerProps['data']}) {
      const avg = data?.ratingSum / data?.reviewsCount || 0;
const returnPrices:any = data?.realEstates?.map((e:any) => parseInt(e?.price))
const min = Math.min(...returnPrices)
const max = Math.max(...returnPrices)
  return (
 <div className="box border border-gray-300 bg-white p-5 rounded-lg">
       <div className=' flex gap-3 w-full mb-2   '>
        <div className="i basis-[30%]">
            <Image src="/Heroo.webp" alt='' width={150} height={150} className='w-20 h-20 rounded-full' />
        </div>
  <div className="text basis-[70%]">
    <h1 className='font-semibold text-lg'>{data.userName}</h1>
    <h2 className='text-sm mb-2'>{data.company}</h2>
    <div className="rates flex gap-2 items-center my-2">
<span className='font-semibold'>{avg}</span>
     <div className="flex gap-0.5">
          {Array.from({length:avg}).map((e , i:number) => <FaStar key={i}  />)}
     </div>
    </div>
    <div className="price my-2">
        <span className='font-semibold'>${min}{min >= 1000 ? "K" : min > 1000000 ? "M" : ""} - ${max}{max > 1000 ? "K" : max > 1000000 ? "M" : ""}</span> price range
    </div>
    <h2 className='my-2'>{data?.realEstates?.length} properties in last time</h2>
  </div>
    </div>
    <button className='border border-primary py-3 w-full rounded-full text-primary font-semibold'>
<Link href={`/brokers/${data?.id}`}>
Contact
</Link>
    </button>
 </div>
  )
}

export default BoxBrokerMob