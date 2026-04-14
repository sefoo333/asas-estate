"use client"
import HeroInputSearch from '@/componants/InputSearch/HeroInputSearch'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BrokerInput from './_components/Input'
import { House, LocateIcon, Star } from 'lucide-react'
import { CiLocationOn } from 'react-icons/ci'
import { IoLanguageOutline } from "react-icons/io5";
import { BiStar } from 'react-icons/bi'
import { FaHouse, FaStar } from 'react-icons/fa6'
import { BsHouses } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import BoxBroker from './_components/BoxBroker'
import { useQuery } from '@tanstack/react-query'
import { fetchBrokers } from '@/lib/Brokers'
import NotFound from '@/componants/NotFound'
import BoxBrokerMob from './_components/BoxBrokerMob'
import { useMediaQuery } from 'react-responsive'

function page() {
const isMob = useMediaQuery({maxWidth:767})



  const {data, isLoading} = useQuery({
    queryKey:["brokers"],
    queryFn:() => fetchBrokers(10),
    refetchOnWindowFocus:false
  })

  const [dataSearch,setData]:any = useState([]);



  return (
    <div className="parent flex justify-center text-foreground dark:bg-background dark:text-foreground min-h-screen">
  <div className="container flex items-center flex-col">
        <div className="landing max-md:p-5 w-full max-md:mb-30 container before:rounded-3xl max-md:before:!rounded-none flex items-center justify-center relative p-14 h-[550px] max-md:h-[250px]">
        <Image src={"/brokers.jpg"} alt="" fill className=" object-cover rounded-3xl  max-md:!rounded-none w-full h-full absolute z-[-1]" style={!isMob ? {objectPosition:"0px -150px"} : {}} />
   <div className="relative z-9 w-full flex flex-col gap-20 items-center">
    <div className="text font-bold max-md:mb-[90px] text-center mt-4 text-white">
      <h1 className="text-6xl leading-18 max-md:hidden max-md:text-3xl max-md:text-nowrap max-md:leading-9">
      Find your perfect broker <br/>for a minutes
     </h1>
      <h1 className="text-6xl md:hidden leading-18 max-md:text-3xl max-md:text-nowrap max-md:leading-9">
      Search for brokers
     </h1>
     <p className='font-normal text-gray-50 text-[14px] md:hidden'>Discover a great brokers for good sevice</p>
     {/* <p className="font-medium text-[20px] mt-3">houses , villa , commercial , real estate , more</p> */}
   </div>
   <BrokerInput setData={setData} dataSearch={dataSearch} />
   </div>
      </div>
      <div className="brokers mb-9 w-full max-md:px-3 grid grid-cols-2 max-md:grid-cols-1 gap-8 mt-20">
{data?.length === 0 ? (
  <h1 className='text-2xl text-center w-full font-semibold col-span-2 animate-fade-in'>No brokers found</h1>
) : (
  <>
   {data?.map((e) => (
    <>
       {!isMob ?  <BoxBroker data={e} /> : <BoxBrokerMob data={e} />}
</>
 ))}
  </>
)}
       


     
      </div>
  </div>

    </div>
  )
}

export default page