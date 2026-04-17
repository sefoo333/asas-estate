"use client"
import Crubchumb from '@/app/settings/_components/crubchumb';
import HeadS from '@/app/settings/_components/HeadS'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { lead } from '../_components/OrdersTable';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BsWhatsapp } from 'react-icons/bs';
import {  Star } from 'lucide-react';
import Link from 'next/link';
import { LuPhone } from 'react-icons/lu';
import { toast } from 'sonner';
import { useUserStore } from '@/store/store';
import { IoArrowUndoOutline, IoChatboxEllipsesOutline } from 'react-icons/io5';

function page() {
    
    const {chatId} = useParams();
const user = useUserStore((state) => state.user);

    const {data:chatProduct} = useQuery<lead>({
        queryKey:["chatNo" , chatId],
        queryFn:async () => {
const fetcher = await fetch(`/api/Leads/${chatId}`);
const json = await fetcher.json();

return json.data
        },
        refetchOnWindowFocus:false
    })



  const data = [{
    name:"UserName",
    value:chatProduct?.userSender?.userName,
    id:1
  },
{
    name:"Email",
    value:chatProduct?.userSender?.email,
    id:2,
},
{
    name:"Phone",
    value:chatProduct?.userSender?.phone || "01110343035",
    id:3
},
]


// response => true
// review => false

const [open,setOpen] = useState(false);
const [massege,setMassege] = useState("");
      const sendMassege = useMutation({
        mutationKey:["sendmassege"],
        mutationFn:async (type:boolean) => {
const test = await fetch(`/api/Leads/SendMassege` , {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        id:user?.id,
        idTo:chatProduct?.userSender?.id,
        idProduct:chatProduct?.product?.id,
        title:`${user?.userName}`,
        massege:!type ? "review": massege,
        description:!type ? `${user?.userName} want to know your rate about Brokering service` : `${user?.userName} response to your massege`,
        linkNoti:`${window.location.host}/brokers/${user?.id}/review`,
    })
})


return test.json()
        },
        onSuccess:() => {
            
            toast.success(`${open ? "Request evaluation" : "Response massege"} sent successfully`)
        },
        onError:() => {
            toast.error("Failed to send request evaluation")
        }
       
      })

// const sendStar = useMutation({
//     mutationFn:async () => {
//         const res = await fetch(`/api/Leads/star/${chatId}`,{
//             method:"POST"
//         })
//         const json = await res.json();
//         return json
//     },
//     onSuccess:() => {
//         toast.success("Request evaluation sent successfully")
//     },
//     onError:() => {
//         toast.error("Failed to send request evaluation")
//     }
// })





    return (
     <div className="page  px-7 py-7 basis-[100%]">
    <Crubchumb />
                <HeadS title="Lead Details" />
                            <div className="window   p-8 mt-5 bg-white shadow  rounded-lg border  dark:!bg-gray-800  dark:!border-gray-600 border-gray-100  ">

<div className="grid grid-cols-2 gap-5">
    {data?.map((e) => (
    <div key={e?.id} className="box">
        <h1 className='font-semibold'>{e?.name}</h1>
        <h2 className='text-sm mt-1'>{e?.value}</h2>
    </div>
))}
</div>

<div className="massegeBox mt-10">
    <h1 className='font-semibold'>Massege</h1>
    <Textarea onChange={(e) => setMassege(e.target.value)} className='mt-2 h-[400px]' readOnly={!open ? true : false} defaultValue={!open ? chatProduct?.massege : ""}  />
</div>

<div className="buttons mt-3 flex gap-5 justify-end">
    {chatProduct?.status === "Done" && <Button onClick={() => sendMassege.mutate(false)} className='px-10 cursor-pointer bg-amber-500 text-white hover:bg-amber-600'>
        <Star />
        Request evaluation
    </Button>}
    <Link href={`https://wa.me/+${chatProduct?.userSender?.phoneCode}${chatProduct?.userSender?.phone}`}>
    <Button  className='cursor-pointer bg-green-500 hover:bg-green-600'>
    <BsWhatsapp />
        WhatsApp
    </Button>
        </Link>
       <Link href={`tel:${chatProduct?.userSender?.phone}`}>
    <Button className='px-10 cursor-pointer'>
        <LuPhone />
        Call 
    </Button>
       </Link>
    <Button onClick={() => setOpen((e) => !e)} className='px-10 cursor-pointer'>
        <IoArrowUndoOutline />
        {!open ? "Response" : "Cancel Response"} 
    </Button>

    {open && <Button onClick={() => sendMassege.mutate(true)} className=' cursor-pointer  text-white'>
        <IoChatboxEllipsesOutline />
        Send
    </Button>}
</div>

</div>


</div>
  )
}

export default page