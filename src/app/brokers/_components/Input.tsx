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

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { IoLocationSharp } from "react-icons/io5";
import SearchInput from '@/componants/InputSearch/SearchInput'
import SelectEstat from '@/componants/InputSearch/Selects/SelectEstat'
import SelectInBroker from './Select'
import { useRouter } from 'next/navigation'


/**
 * 1- Name or location
 * 2- Search Input
 * 3- service type
 */

function BrokerInput({dataSearch,setData}:{setData:any,dataSearch:{location:string, finder:string,type:string}}) {


  const data = ["house" , "villa" , "apartment"]
const router = useRouter();
  const [switcher,setSwitcher] = useState(false)
const [text,setText] = useState()

const [type,setType] = useState("Sale");


const types = [{
  name:"Sale",
  id:1
},
{
  name:"Rent",
  id:2
},
{
  name:"Commrical",
  id:3
}
]


  useEffect(() => {
setData((e) => ({...e,finder:e ? "name" : "location"}))
  },[switcher])

  const searchProducts = async () => {
// setSearchResults(json.data)
router.push(`/brokers/search?finder=${switcher ? "name" : "location"}?${new URLSearchParams({title:dataSearch?.location || "", type:type }  )}`)
  }


  return (
     <div className="input bg-white relative flex max-md:shadow-sm gap-5 max-md:absolute max-md:bottom-[-179px]  rounded-xl p-5 w-[750px] max-md:w-full ">
{/* <div className="button flex rounded-md  border border-[#ccc] p-0.5">
<button className={`px-8 font-semibold py-2.5 cursor-pointer rounded-md transition-[500ms] ${!switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => setSwitcher(false)}>
  Buy
</button>
<button className={`px-8 font-semibold py-2.5 cursor-pointer rounded-md transition-[500ms] ${switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => setSwitcher(true)}>
  Rent
</button>
</div> */}
<div className="inline-flex absolute -top-10 left-1/2 -translate-x-1/2">
  {
  types.map((e) => (
     <button
     key={e.id}
     onClick={() => {setType(e.name)}}
    className={` bg-white border border-gray-200 border-b-0 rounded-b-none px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:z-10 cursor-pointer ${e.id === 1 ? "rounded-l-md" : e.id === 3 ? "rounded-r-md" : ""}    ${type === e.name ? "!bg-blue-500 !text-white !border-transparent" : ""}   disabled:pointer-events-auto disabled:opacity-50`} >
    {e.name}
  </button>
  ))
  }
</div>
<div className="flex max-md:flex-col 2s gap-5 !w-full max-md:w-full">
  
   <div className="flex max-md:flex-col w-full  gap-2 items-center">
    <div className="button flex rounded-md  border border-[#ccc] p-0.5 max-md:w-full max-md:justify-center">
<button className={`px-8 font-semibold py-2.5 cursor-pointer max-md:w-1/2 rounded-md transition-[500ms] ${!switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => setSwitcher(() => false)}>
  Name
</button>
<button className={`px-8 font-semibold py-2.5 cursor-pointer max-md:w-1/2 rounded-md transition-[500ms] ${switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => setSwitcher(() => true)}>
  Location
</button>
</div>
      <div className="flex w-full  items-center gap-3 ">
<SearchInput finder={switcher} placeholder={!switcher ? "Name" : "Location"} setData={setData} className=' py-6 w-full' />
    </div>
      <Button onClick={() => {
        searchProducts()
      }} type="submit" className="py-6  bg-blue-600 px-8 cursor-pointer hover:bg-blue-700 hover:text-white text-white" variant="outline">
        Search
      </Button>
   </div>
</div>
</div>

  )
}

export default BrokerInput