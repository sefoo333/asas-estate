import { Button } from '@/components/ui/button'
import { RealEstate } from '@/types/realEstate'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsHouses } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa6'
import { IoLanguageOutline } from 'react-icons/io5'


export interface BoxBrokerProps {
  data: {
    id: number;
    userName: string;
    realEstates?: RealEstate[];
    company: string;
    languages: string[];
    propertiesCount: number;
    ratingSum: number;
    reviewsCount: number;
    image:string;
  }
}


function BoxBroker({data}:{data:BoxBrokerProps['data'] | any}) {

  const avg = data?.ratingSum / data?.reviewsCount || 0;
// const returnPrices:any = data?.realEstates?.map((e:any) => parseInt(e?.price))
// const min = Math.min(...returnPrices)
// const max = Math.max(...returnPrices)
  return (
  <Link href={`/brokers/${data?.id}`} >
      <div className="box  max-md:flex-col relative bg-white dark:!bg-gray-800  dark:!border-gray-600  flex justify-start border  border-gray-300 rounded-xl gap-5 p-5 w-full duration-300 hover:bg-blue-50/30 cursor-pointer">
<Image src={data?.image || "/userD.png"} alt="" width={400} height={400} className='w-[140px] rounded-full h-[140px] max-md:h-[220px] max-md:w-full max-md:rounded-lg' />
  <div className="box w-full max-md:relative">
      <div className="text w-full">
  {/* <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm whitespace-nowrap max-md:hidden font-semibold text-blue-700">
  {data?.company !== "" ? data?.company : "Broker"}
</span> */}
 <div className="flex justify-between items-center">
  <div className="text">
     <h1 className='text-2xl font-semibold mt-1'>{data?.userName}</h1>
  <h2 className='text-[15px] flex gap-1 items-center '>{data?.company}</h2>
  </div>
  <Button className='ml-auto max-md:w-full max-md:mt-4 !rounded-full max-md:rounded-full border-gray-300 cursor-pointer   hover:bg-slate-100  py-5  font-semibold px-7' variant={"outline"}>Contact Me</Button>
 </div>

 <div className="rates flex gap-2 items-center my-2">
<span className='font-semibold'>{avg.toFixed(1)}</span>
     <div className="flex gap-0.5 dark:text-gray-300">
          {Array.from({length:avg}).map((e,i:number) => <FaStar key={i}  />)}
     </div>
    </div>

  <h2 className='flex gap-2 items-center mt-1.5 text-gray-600 dark:text-gray-400 font-semibold text-sm'><IoLanguageOutline size={18} />{data?.languages.join(" , ")}</h2>
  <h2 className='flex gap-2 items-center mt-1.5 text-gray-600 dark:text-gray-400 font-semibold text-sm'><BsHouses  size={18} />{data?.realEstates?.length} houses</h2>

  
</div>


{/* <div className="section absolute right-2 top-2">
  <div className="stars flex items-center gap-1">
  <h1 className='font-semibold text-sm'>{avg.toFixed(1)}</h1>
  <FaStar size={17} className='text-blue-600' /> 
<h2 className='text-[13px] text-gray-500 ml-0.5'>({data?.reviewsCount})</h2>
</div>
</div> */}
  </div>
        </div>
  </Link>
  )
}

export default BoxBroker