"use client"
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { general } from './Types'

import { MdKeyboardArrowDown } from "react-icons/md";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
function SelectTypes({setTypes,type , setData ,openar,setOpener}:{setTypes?:any,setOpener:any,openar:any,type?:{beds?:number,baths?:number} , setData?:(data:any) => void}) {
      const [select , SetSelect] = useState(false)
  const arr = [1,2,3,4,5,6,7,8,9,10]

  useEffect(() => {
if (openar !== 1){
  SetSelect(false)
}
  },[openar])
  return (
   <div className="select w-full relative py-2 px-4 rounded-md border ml-10 shadow-sm !bg-white border-[#e5e5e5] dark:!bg-gray-800 left-[-20px]  dark:!border-gray-600" >
<div className="Title flex justify-between items-center" onClick={() => {SetSelect((e) => !e);setOpener(1)}}>
    <h1 className='text-[#737373] dark:text-gray-400 text-sm  select-none'>Beds & Baths</h1>
<MdKeyboardArrowDown color='#737373' size={20} />
</div>

 <div className={`window flex flex-col gap-5 bg-white max-xl:!left-[-90px] dark:!bg-gray-800  dark:!border-gray-600 absolute bottom-[-380px] shadow rounded-md w-[350px]  left-0 p-5 transition ${select ? "z-9 opacity-100" : "z-[-1] opacity-0"}`}>
     <div className="beds flex flex-col gap-1">
         <h1 className='font-semibold mb-1'>Beds</h1>
       <div className="grid grid-cols-5 gap-2">
         {arr.map((e,a) => (
          <Button key={e} variant={"outline"} className={`rounded-xl shadow-none cursor-pointer  ${type?.beds === a +1 ? "bg-accent" : ""}`} onClick={() => {
            setTypes?.((a:any) => ({...a, beds:e}));
            setData?.((prevData:any) => ({ ...prevData, beds: e }));
          }}>
            {e}
          </Button>
        ))}
       </div>
     </div>
     <div className="baths flex flex-col gap-1">
         <h1 className='font-semibold mb-1'>Baths</h1>
       <div className="grid grid-cols-5 gap-2">
         {arr.map((e,a) => (
          <Button key={e} variant={"outline"} className={` rounded-xl shadow-none cursor-pointer ${type?.baths === a +1 ? "bg-accent" : ""}`} onClick={() => {
            setTypes?.((a:any) => ({...a, baths:e}));
            setData?.((prevData:any) => ({ ...prevData, baths: e }));
          }}>
            {e}
          </Button>
        ))}
       </div>
     </div>
     <div className="buttons flex gap-2 ">
        <button
        onClick={() => {
          setTypes?.({baths:0 , beds:0});
          setData?.((prevData:any) => ({ ...prevData, baths: 0, beds: 0 }));
        }}
  className="inline-block w-full rounded-sm cursor-pointer border border-primary text-primary px-12 py-3 text-sm font-medium   mt-3 focus:ring-3 focus:outline-hidden"
>
  Reset
</button>
   <button
   onClick={() => SetSelect(false)}
  className="inline-block w-full rounded-sm cursor-pointer  px-12 py-3 bg-primary text-sm font-medium text-white  mt-3 focus:ring-3 focus:outline-hidden"
>
  Done
</button>
     </div>
</div>

</div>
  )
}

export default SelectTypes