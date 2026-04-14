"use client"
import React, { useState } from 'react'
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
function SelectTypes({setTypes,type , setData}:{setTypes?:any,type?:{beds?:number,baths?:number} , setData?:(data:any) => void}) {
      const [select , SetSelect] = useState(false)
  const arr = [1,2,3,4,5,6,7,8,9,10]
  return (
   <div className="select w-full relative py-2 px-4 rounded-md border shadow-sm !bg-white border-[#e5e5e5]" >
<div className="Title flex justify-between items-center" onClick={() => SetSelect((e) => !e)}>
    <h1 className='text-[#737373] text-sm  select-none'>Beds & Baths</h1>
<MdKeyboardArrowDown color='#737373' size={20} />
</div>

 <div className={`window flex flex-col gap-5 bg-white absolute bottom-[-375px] shadow rounded-md w-[350px]  left-0 p-5 transition ${select ? "z-9 opacity-100" : "z-[-1] opacity-0"}`}>
     <div className="beds flex flex-col gap-1">
         <h1 className='font-semibold mb-1'>Beds</h1>
       <div className="grid grid-cols-5 gap-2">
         {arr.map((e,a) => (
          <Button key={e} variant={"outline"} className={`rounded-xl shadow-none cursor-pointer  ${type?.beds === a +1 ? "bg-accent" : ""}`} onClick={() => {
            setTypes?.((a) => ({...a, beds:e}));
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
            setTypes?.((a) => ({...a, baths:e}));
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
  className="inline-block w-full rounded-sm cursor-pointer border border-blue-600 px-12 py-3 text-sm font-medium text-blue-600  mt-3 focus:ring-3 focus:outline-hidden"
>
  Reset
</button>
   <button
   onClick={() => SetSelect(false)}
  className="inline-block w-full rounded-sm cursor-pointer border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white  mt-3 focus:ring-3 focus:outline-hidden"
>
  Done
</button>
     </div>
</div>

</div>
  )
}

export default SelectTypes