"use client"
import Product from '@/componants/Product'
import { Button } from '@/components/ui/button'
import { Broker } from '@/types/Broker'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ShareProfile } from './_compoents/ShareProfile'
import { useGetProducts } from '@/hooks/useGetProducts'
import { useUserStore } from '@/store/store'
import { fetchBrokers } from '@/lib/Brokers'
import BrokerSug from './_compoents/BrokerSug'
import { SendChat } from '@/app/realEstats/[id]/components/SendChat'
import { FaStar, FaStarHalf } from 'react-icons/fa6'
import Rate from './_compoents/Rate'
import { IoMdAdd } from 'react-icons/io'
import { RateWindow } from '@/componants/RateWindow'

function page() {
    const params = useParams();

    const user = useUserStore((state) => state.user)
    


    const {data: brokerData} = useQuery<Broker | any>({
        queryKey:["broker"],
        queryFn: async () => {
            const res = await fetch(`/api/brokers/search?brokerId=${params.brokerid}`);
            const data = await res.json();
            
            return data.data
        },
        refetchOnWindowFocus:false,
    })

    const {data: productsData} = useGetProducts("",params?.brokerid)
    

  const {data, isLoading} = useQuery({
    queryKey:["brokers"],
    queryFn:() => fetchBrokers(3),
    refetchOnWindowFocus:false
  })
    
      const avg = (brokerData?.ratingSum ?? 0) / (brokerData?.reviewsCount ?? 1) || 0;
const [open,setOpen] = useState(false);

useEffect(() => {
    console.log(brokerData)
},[brokerData])
  return (
    <>
   <div className="parent flex justify-center">
    <div className="container w-full flex gap-10 justify-center">
<div className="flex flex-col basis-[80%] min-w-0 max-md:w-full max-md:basis-full max-md:px-2">
    <div className="box shadow bg-white  dark:!bg-gray-800  dark:!border-gray-600 rounded-xl ">
    <div className="profile w-full relative mb-14">
    <Image src={"/Hero.jpg"} alt='' width={1500} height={500} className="banner bg-blue-500 w-full h-[300px] max-md:h-[200px] rounded-xl object-cover rounded-b-none" />
    <Image src={brokerData?.image} alt='' width={1000} height={1000} className="image shadow w-35 h-35 max-md:w-20 max-md:h-20 object-cover rounded-full  absolute max-md:-bottom-10 -bottom-20 left-6" />
</div>
<div className="profile mt-8 flex justify-between items-start p-6 max-md:mt-0 max-md:pt-0">
   <div className="text  mt-3 max-md:mt-0">
    <h1 className='font-semibold text-2xl'>{brokerData?.userName}</h1>
    <h2 className='text-[17px] flex items-center mt-1.5 text-[#898989] dark:text-gray-400  mb-2 '>
        {/* <Image src={``} alt='' width={20} height={20} className=" w-7 h-7 inline mr-2 " /> */}
        <span className={`fi fi-${brokerData?.locationCode} inline mr-2 !rounded-sm `}></span>
        <span>{brokerData?.location}</span>
        </h2>
        <h2 className='text-[16px] flex  items-center gap-2' >@{brokerData?.userName} <span className='text-[8px] text-gray-300'>⬤</span><span className='text-gray-400'>{brokerData?.company}</span></h2>
<div className="buttons flex gap-4 mt-3">
     {/* <button className='bg-white  border border-gray-200 duration-300 text-black hover:bg-gray-50/10 rounded-xl justify-center  py-2.5 text-[15px] px-7 flex items-center   ' >
        {/* <Mail size={18} className='mr-2' /> 
       <span>
        Massege
       </span>
        </button> */}

        <SendChat broker={{userName:brokerData?.userName,id:brokerData?.id}} type="Broker" />
   <ShareProfile Type='broker' />
</div>
   </div>

</div>
</div>

<div className="box shadow bg-white  dark:!bg-gray-800  dark:!border-gray-600 rounded-xl p-7 mt-10">
<h1 className='text-xl font-semibold mb-3'>Bio</h1>
<p className='leading-8'>
    {brokerData?.bio}
     </p>
</div>

    <div className="box shadow bg-white  overflow-hidden   dark:!bg-gray-800  dark:!border-gray-600 rounded-xl p-7 mt-10 mb-10">
    <h1 className='text-xl font-semibold mb-3'>Real Estats</h1>

    {/* categories relative flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 mt-13 w-full */}
    {/* 
    min-w-max
  grid-cols-3
  max-2xl:grid-cols-2
  grid
  max-md:!flex
  max-md:overflow-x-auto
  gap-6
    */}
<div className='
w-full
  grid-cols-3
  max-2xl:grid-cols-2
  grid
  max-md:!flex
  max-md:overflow-x-auto
  gap-6
  '>
              {productsData?.map((e:any,i:number) => <Product key={i} product={e} screen={false} />)}
      
</div>
</div>
<div className="box shadow bg-white  dark:!bg-gray-800  dark:!border-gray-600 rounded-xl p-7 mt-10 mb-10">
    <h1 className='text-xl font-semibold mb-3'>Rates and reviews</h1>
    <div className="products flex max-md:flex-col max-md:gap-5 max-md:items-start border-b pb-5 border-b-gray-300 dark:border-b-gray-700 justify-between items-center">
<div className="rates flex gap-3  items-center">
    <h2 className='font-semibold'>Total Rates: <span className='mx-3'>{avg.toFixed(1)}</span></h2>

     <div className="flex gap-0.5">
            {Array.from({length:avg}).map((e,i) => <FaStar key={i}  />)}
            <>
          {avg % 1 !== 0 && <FaStarHalf />}
            </>
       </div>
</div>
<Button onClick={() => setOpen((e) => !e)} variant={"outline"} className='rounded-full cursor-pointer text-[14px] flex items-center !font-semibold px-[30px] py-[20px]'>
    <IoMdAdd />
<span>Add Rate and review</span>
    </Button>
    </div>
    <div className="products">
        {brokerData?.rates?.map((e:any) => (
            <>
            {e?.massege !== "" && <Rate data={e} />}
            </>
        ))}
    </div>
</div>
</div>
<div className="sidebar p-10 px-5 basis-[30%] max-md:hidden  shadow bg-white  dark:!bg-gray-800  dark:!border-gray-600 mt-10 rounded-xl h-[700px]">
    <h1 className='text-xl font-semibold mb-6'>More Brokers</h1>
   {/* <div className="flex flex-col gap-3">
     <h1><strong>Languages: </strong>arabic, english, japaness</h1>
     <h1><strong>Location: </strong>Cairo, Egypt</h1>
    <h1><strong>Company: </strong>Real Estate Company</h1>
    <h1><strong>Areas of jurisdiction: </strong>Cairo , Gize , Qalyobia , sina </h1>
    <h1><strong>experince: </strong>3 years </h1>
   </div> */}
<div className="flex flex-col  gap-3">
{data?.length === 0 ? (
    <h1 className='text-lg mt-10 text-center w-full font-semibold h-full animate-fade-in'>No brokers found</h1>
) : (
  <>
   {data?.map((e:any , i:number) => (
        <BrokerSug key={i}  data={e} />

 ))}
  </>
)}    
    
</div>
</div>
    </div>
   </div>
           <RateWindow product={brokerData} broker={brokerData} setOpene={setOpen} opene={open} />

   </>
  )
}

export default page