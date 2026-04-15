"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Crubchumb from '../../_components/crubchumb'
import HeadS from '../../_components/HeadS'
import { useUserStore } from '@/store/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import ChangeImage from '../../Account/_components/ChangeImage'
import UserName from '../../Account/_components/UserName'
import BrokerAccount from './_components/brokerAccount'
import { FaSave } from 'react-icons/fa'
import { Broker } from '@/generated/prisma/client'
function Account() {

    const user = useUserStore((state) => state.user);
    const ChangeAccount = async (data:any) => {
      
      const test = await fetch(`/api/brokers/search` , {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
  
      
    
      
      return test.json()
    }
  
   
        const {data: brokerData} = useQuery<Broker | any>({
        queryKey:["broker"],
        queryFn: async () => {
            const res = await fetch(`/api/brokers/search?brokerId=${user?.id}`);
            const data = await res.json();
            
            return data.data
        },
        enabled: user !== null,
        refetchOnWindowFocus:false,
    })

    
    
    
    const [data,setData] = useState({})
    useEffect(() => {
setData(brokerData)
    },[brokerData])
  
    const changeAccount = useMutation({
      mutationFn:  ChangeAccount,
    })
  return (
     <div className="page  px-7 py-7 max-md:px-5 basis-[100%]">
          <Crubchumb />
            <HeadS title="Broker Settings" />
            <div className="window bg-white p-8 mt-10 rounded-lg border border-gray-200 w-full ">
              <ChangeImage broker={true} image={brokerData?.image} setData={setData} data={data} />
                <form action="" className='flex gap-6 items-center mt-8 w-full'>
                               <UserName data={data} setData={setData} />
                </form>

                <h1 className='pb-4 border-gray-300 border-b mt-13 text-2xl font-bold'>About Broker</h1>
            <form action="" className='mt-6'>
            <BrokerAccount data={data} setData={setData} />       
            </form>

           <div className="save flex justify-end mt-6">
                    <Button onClick={() => changeAccount.mutate(data)} className='w-30 h-11' size={"lg"}>
                     <FaSave />
                 Save 
                                   </Button>
                 </div>
            </div>
        </div>
  )
}

export default Account