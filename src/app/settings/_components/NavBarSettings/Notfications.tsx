"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LuUserRound } from 'react-icons/lu'
import Link from 'next/link'
import { useUserStore } from '@/store/store'
import { GoBell } from 'react-icons/go'
import { IoCheckmarkDone } from 'react-icons/io5'
import { Separator } from '@/components/ui/separator'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { RateWindow } from '@/componants/RateWindow'
import { ShowNotifactions } from './ShowNotifactions'
import { Response } from './Response'
function Notfications() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
const router = useRouter();
  const {data} = useQuery({
    queryKey:["Notifcations"],
    queryFn: async () => {
const fetcher = await fetch(`/api/users/Notifactions/${user?.id}`);
const json = await fetcher.json();

return json
    },
    enabled: user?.id !== undefined && user?.id !== null,
    refetchOnWindowFocus:false,
  })

  const [opene,setOpen] = useState(false);
const [selectedNotifaction,setSelectedNotifaction]:any = useState(null);
    const [openWindow,setOpenWindow] = useState(false);

  return (
<>
<Popover>
  <PopoverTrigger asChild>
      <div className='bg-gray-100 rounded-full border border-gray-300   dark:!bg-gray-800  dark:!border-gray-600 p-2'>
              <GoBell className='cursor-pointer'  size={21} />
           </div>
  </PopoverTrigger>
  <PopoverContent className='p-0' align='end'>
    <PopoverHeader className=' p-4 '>
     <div className='flex justify-between'>
         <PopoverTitle className='font-semibold'>Notifactions</PopoverTitle>
      <IoCheckmarkDone size={21} className='text-gray-500' />
     </div>
      {/* <PopoverDescription>Description text here.</PopoverDescription> */}
    </PopoverHeader>
    <Separator />
<div>
{data?.length > 0 && <>
{data?.slice(0,4)?.map((e:any) => (
<div onClick={() => {
 if ( e?.linkNotifaction === "review"){
  setOpen(true);
   setSelectedNotifaction(e)
 } else if (e?.Content?.Response){
  setOpenWindow(true)
     setSelectedNotifaction(e)
 } else {
   router.push(`${window.location.protocol}//${e?.linkNotifaction}`)
 } 
}} className='relative z-999' key={e?.id}>
  <div className="box flex gap-4 items-center p-3 transition-all border-b border-b-gray-200 dark:border-b-gray-600 hover:bg-slate-100/20 cursor-pointer">
    <Image src={e?.userSender?.image} alt='' className='rounded-full w-10 h-10' width={50} height={50} />
    <div className="text">
        <h1 className='font-semibold text-[15px]'>{e?.Content?.title}</h1>
        <h2 className='text-[12px] text-gray-500'>{e?.Content?.description}</h2>
    </div>
</div>
</div>
))}
{data?.length > 4 && <ShowNotifactions setOpenWindow={setOpenWindow} data={data} setOpen={setOpen} setSelectedNotifaction={setSelectedNotifaction} />}
</>}
</div>
  </PopoverContent>
</Popover>
<Response openWindow={openWindow} setOpenWindow={setOpenWindow} chatId={selectedNotifaction?.linkNotifaction}   />
<RateWindow opene={opene} setOpene={setOpen} product={selectedNotifaction} />
</>
  )
}

export default Notfications