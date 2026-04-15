"use client"
import React, { useState } from 'react'
import { Buys } from './_components/Buys'
import { BiMoney } from 'react-icons/bi'
import Countries from './_components/Coutries'
import Top from './_components/Top'
import { Bare } from './_components/Bare'
import HeadS from '../../_components/HeadS'
import DashBox from './_components/DashBox'
import { useGetProducts } from '@/hooks/useGetProducts'
import { useUserStore } from '@/store/store'
import { useQuery } from '@tanstack/react-query'
import { BsHouses } from 'react-icons/bs'
import { IoChatboxEllipsesOutline, IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
import FeaturedBanner from '@/componants/FeaturedBanner'

function page() {

  const user = useUserStore((state) => state.user);
  const {data:UserProducts} = useGetProducts("",user?.id);

 const {data:masseges} = useQuery({
    queryKey:["MassegesKey"],
    queryFn: async () => { 
      const res =  await fetch(`/api/Leads/Masseges?idUser=${user?.id}`)
      const json = await res.json()
      
      return json?.data
  },
  refetchOnWindowFocus:false,
  })

  const data = [{
    name:"Total Properties",
    value:UserProducts?.length,
    icon:BsHouses,
    lastEdit:`${new Date(UserProducts?.slice(-1)[0]?.UpdatedAt)?.getMonth() === new Date().getMonth() ? "This Month" :`${new Date(UserProducts?.slice(-1)[0]?.UpdatedAt)?.getMonth()} Months ago`}`
  },
  {
    name:"Total leads",
    value:masseges?.length,
    icon:IoChatboxEllipsesOutline,
        lastEdit:`${new Date(masseges?.slice(-1)[0]?.UpdatedAt)?.getMonth() === new Date().getMonth() ? "This Month" :`${new Date(UserProducts?.slice(-1)[0]?.UpdatedAt)?.getMonth()} Months ago`}`

  },
  {
    name:"All Deals",
    value:masseges?.filter((e:any) => e?.status === "Done").length,
    icon:IoCheckmarkDoneCircleOutline,
        lastEdit:`${new Date(masseges?.slice(-1)[0]?.UpdatedAt)?.getMonth() === new Date().getMonth() ? "This Month" :`${new Date(UserProducts?.slice(-1)[0]?.UpdatedAt)?.getMonth()} Months ago`}`

  },
  {  
    name:"Total Money",
    value:`$${UserProducts?.map((e:any) => e?.price).reduce((a:any,b:any) => a + b , 0) || 0}`,
    icon:BiMoney,
        lastEdit:`${new Date(UserProducts?.slice(-1)[0]?.UpdatedAt)?.getMonth() === new Date().getMonth() ? "This Month" :`${new Date(UserProducts?.slice(-1)[0]?.UpdatedAt)?.getMonth()} Months ago`}`

  }
]

const [cancel,setCancel] = useState(true);

  return (
            <div className="page px-7 py-7 max-md:px-5 basis-[100%]">
            <HeadS title='Dashboard' />
                        <div className="window py-5  ">
                              <div className="r w-full flex justify-center my-5">
     {cancel && <FeaturedBanner setCancel={setCancel} />}
      </div>
                            <div className="boxs grid gap-5 mb-3 grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1">

                              
                            {data?.map((e,i:number) => (
                              <DashBox Data={e} key={i} />
                            ))}
                               
                                
                            </div>

    <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10 mt-8">
      <Buys />
                                                                      {/* <ChartPieDonutText /> */}
    </div>
                                  <div className="grid grid-cols-3 max-xl:grid-cols-1 max-md:grid-cols-1 h-full mt-5 gap-7">
                                    <Countries />
                                    <Top />
                                    <Bare />
                                  </div>
                                  {/* <div className="bg-white p-5 shadow border rounded-xl mt-8 border-gray-100">
                                     <TTable />
                                  </div> */}

                        </div>
</div>
  )
}

export default page