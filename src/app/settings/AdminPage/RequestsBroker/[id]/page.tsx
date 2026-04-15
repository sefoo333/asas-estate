"use client"
import Crubchumb from '@/app/settings/_components/crubchumb';
import HeadS from '@/app/settings/_components/HeadS'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LuPhone } from 'react-icons/lu';
import { toast } from 'sonner';
import { useUserStore } from '@/store/store';
import { IoArrowUndoOutline, IoChatboxEllipsesOutline } from 'react-icons/io5';
import { Broker } from '@/types/Broker';
import { Badge } from '@/components/ui/badge';
import { FiUserCheck, FiUserX } from 'react-icons/fi';

function page() {
    
    const {id} = useParams();
const user = useUserStore((state) => state.user);

    const {data:chatProduct} = useQuery<Broker>({
        queryKey:["RequestNo" , id],
        queryFn:async () => {
const fetcher = await fetch(`/api/brokers/requests/${id}`);
const json = await fetcher.json();
console.log(json)
return json.data
        },
        refetchOnWindowFocus:false
    })



  const data = [{
    name:"UserName",
    value:chatProduct?.userName,
    id:1
  },
{
    name:"Location",
    value:chatProduct?.location,
    id:2,
},
{
    name:"Phone",
    value:chatProduct?.phone || "01110343035",
    id:3
},
{
    name:"Company",
    value:chatProduct?.company,
    id:4
},
{
    name:"Languages",
    value:chatProduct?.languages,
    id:4
},
]


// response => true
// review => false
const router = useRouter();

   const acceptRequest = useMutation({
     mutationKey:["BrokerAction"],
     mutationFn: async ( action : string) => { 
       const res =  await fetch(`/api/brokers/requests/${id}` , {method:action})
       const json = await res.json()
       console.log("tsa",json)
       return json?.data
   },
   onSuccess:() => {
     toast.success("success Action")
     router.back()
   }
   })






    return (
     <div className="page  px-7 py-7 basis-[100%]">
    <Crubchumb />
                <HeadS title="Request Details" />
                            <div className="window   p-8 mt-5 bg-white shadow  rounded-lg border border-gray-100  ">

<div className="grid grid-cols-2 gap-5">
    {data?.map((e:any) => (
    <div className="box" key={e?.id} >
        <h1 className='font-semibold'>{e?.name}</h1>
        {e?.name === "Languages" ? (
           <div className="flex gap-2 mt-2">
             {e?.value?.map((x:string) => (
<Badge key={x}  className='' variant={"outline"}>{x}</Badge>
            ))}
           </div>
            
        ): (
            <h2 className='text-sm mt-1'>{e?.value}</h2>
        )}
    </div>
))}
</div>

<div className="massegeBox mt-10">
    <h1 className='font-semibold'>Bio</h1>
    <Textarea className='mt-2 h-[400px]' readOnly value={chatProduct?.bio}  />
</div>

<div className="buttons mt-3 flex gap-5 justify-end">
   
    <Button onClick={() => acceptRequest.mutate("POST")} className='px-10 cursor-pointer'>
        <FiUserCheck />
        Accept 
    </Button>
    <Button onClick={() => acceptRequest.mutate("DELETE")} variant={"destructive"} className='px-10 cursor-pointer'>
        <FiUserX />
        Deny
    </Button>

 
</div>

</div>


</div>
  )
}

export default page