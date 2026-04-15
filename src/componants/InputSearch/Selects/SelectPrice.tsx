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

import { MdKeyboardArrowDown } from "react-icons/md";
import { Input } from '@/components/ui/input';

function SelectPrice({setSelectPrice , prices , setData}:{setSelectPrice?:({min,max}: {min?:string,max?:string}) => void , prices?: {min?:string,max?:string} | any , setData?:(data:any) => void}) {
    const [select , SetSelect] = useState(false)
    const [price, setPrice] = useState<{min?:string,max?:string}>({})

    const handlePriceChange = (key: 'min' | 'max', value: string) => {
        const newPrice = {...price, [key]: value}
        setPrice(newPrice)
        setSelectPrice?.(newPrice)
    }

  return (
 <div className="select w-full relative py-2 px-4 rounded-md shadow-sm !bg-white border border-[#e5e5e5]" >
<div className="Title flex justify-between items-center" onClick={() => SetSelect((e) => !e)}>
    <h1 className='text-[#737373] text-sm  select-none'>{prices?.min && prices.max ? `$${prices.min} - $${prices.max}` : "Select price"}</h1>
<MdKeyboardArrowDown color='#737373' size={20} />
</div>

 <div className={`window flex gap-5 bg-white shadow absolute bottom-[-150px] rounded-md w-[400px]  left-0 p-3 transition ${select ? "z-9 opacity-100" : "z-[-1] opacity-0"}`}>
    <div className="min">
        <h1 className='font-semibold mb-1 text-sm'>Min</h1>
        <Input type='number' onChange={(e) => {

  if (+e.target.value > parseInt(prices?.max)){
            e.target.value = prices?.max || ""
          }
          handlePriceChange('min', e.target.value)
          setData?.((prevData:any) => ({ ...prevData, min: e.target.value }));
        }} placeholder='0' />
        <button
        onClick={() => {
          setSelectPrice?.({})
          setData?.((prevData:any) => ({ ...prevData, min: undefined }));
        }}
  className="inline-block w-full rounded-sm border border-blue-600 px-12 py-3 text-sm font-medium text-blue-600  mt-3 focus:ring-3 focus:outline-hidden"
>
  Reset
</button>
    </div>
    <div className="max">
        <h1 className='font-semibold mb-1 text-sm'>Max</h1>
        <Input  onChange={(e) => {


          handlePriceChange('max', e.target.value)
          setData?.((prevData:any) => ({ ...prevData, max: e.target.value }));
        }} type='number' placeholder='like $500,000' />
                <button
                onClick={() => SetSelect(false)}
  className="inline-block w-full rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white  mt-3 focus:ring-3 focus:outline-hidden"
>
  Done
</button>
    </div>
</div>

</div>
  )
}

export default SelectPrice