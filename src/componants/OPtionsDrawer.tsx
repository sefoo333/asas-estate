import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer" 
import React, { useState } from 'react'
import { IoFilterOutline } from "react-icons/io5"
import { CgGym, CgHomeAlt, CgProfile, CgSmartHomeBoiler } from 'react-icons/cg'
import { IoMdCafe } from 'react-icons/io'
import { FaUtensils } from 'react-icons/fa6'
import { FaParking, FaPray, FaSwimmingPool } from 'react-icons/fa'
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import SelectTypes from "./InputSearch/Selects/SelectTypes"
import SelectPrice from "./InputSearch/Selects/SelectPrice"
import SelectEstat from "./InputSearch/Selects/SelectEstat"
import { LuFilter } from "react-icons/lu"

function OPtionsDrawer({setData ,data ,isMob}:any) {

  const [switcher, setSwitcher] = React.useState(data?.transactionType === "rent" ? true : false);
 const featuresLabel: { label: string; icon: React.ComponentType<any> }[] = [
  { label: 'Elevators', icon: CgHomeAlt },
  { label: 'Kitchen', icon: FaUtensils },
  { label: 'Gym', icon: CgGym },
  { label: 'Pool', icon: FaSwimmingPool },
  { label: 'Kids Area', icon: CgProfile },
  { label: 'Landscape', icon: CgSmartHomeBoiler },
  { label: 'Mosque', icon: FaPray },
  { label: 'Fully Finished', icon: CgSmartHomeBoiler },
  { label: 'Semi Finished', icon: CgSmartHomeBoiler },
  { label: 'Jacuzzi', icon: FaSwimmingPool },
  { label: 'Central AC', icon: CgSmartHomeBoiler },
  { label: 'Smart Home', icon: CgSmartHomeBoiler },
  { label: 'Parking', icon: FaParking },
  { label: 'Cafeteria', icon: IoMdCafe },
  { label: 'Sea/Garden View', icon: CgHomeAlt },
  { label: 'special location', icon: CgHomeAlt },
];

const [index,setIndex] = useState<number[]>([]);

const [length , setLenth] = useState(8);
const route = useRouter();

const [Beds,setBeds] = useState(0)
const [baths,setBaths] = useState(0)
return (
    <Drawer direction="right">
  <DrawerTrigger asChild>
   {!isMob ? (
     <Button variant={"outline"} className='py-5 px-8'>
                <IoFilterOutline size={30} /> <span className='font-semibold text-sm'>More Settings</span>
                </Button>
   ) : (
  <div className="box shadow-sm p-3 rounded-lg bg-white">
                        <LuFilter size={23} className='text-primary' />
                    </div>    
   )}
  </DrawerTrigger>
  <DrawerContent className="!w-[800px] max-md:!w-full">
    <DrawerHeader>
      <DrawerTitle>More Settings</DrawerTitle>
      {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
    </DrawerHeader>
     <div className="content px-4 overflow-y-scroll">
       <div className="section_Transaction mt-3">
        <h1 className="text-[15px] text-start  font-semibold mb-3">Transaction Type</h1>
        <div className="button flex rounded-md  border border-[#ccc] p-0.5 w-full">
<button  className={`px-8 font-semibold py-2.5 cursor-pointer rounded-md text-sm transition-[500ms] w-1/2 ${!switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => {setSwitcher(false); setData((prevData:any) => ({ ...prevData, transactionType: "buy" }))}}>
  Buy
</button>
<button className={`px-8 font-semibold py-2.5 cursor-pointer rounded-md text-sm transition-[500ms] w-1/2 ${switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => {setSwitcher(true); setData((prevData:any) => ({ ...prevData, transactionType: "rent" }))}}>
  Rent
</button>
</div>
      </div>
      <div className="section_features pb-5 border-b border-b-gray-300">
        <h1 className="text-[15px] text-start  font-semibold  mt-5">Features</h1>
                 <div className="collections  justify-start mt-4 grid grid-cols-2 gap-4">
                 {featuresLabel.slice(0,length).map((e,x) => (
                   <Button onClick={() => {!index.includes(x) ? setIndex((a) => [...a,x]) : setIndex((a) => a.filter((i) => i !== x)); 
                    setData((prevData:any) => ({...prevData, features: !index.includes(x) ? [...(prevData.features || []), e.label] : prevData.features.filter((i:string) => i !== e.label) }))
                   }} key={e.label} variant={"outline"} className={`rounded-full py-4 font-semibold ${index.includes(x) ? "bg-blue-400/20 " : ""}`} size={"sm"}>
                     <e.icon />
                     <span className="ml-2">{e.label}</span>
                   </Button>
                 ))}
                 <span className={`text-gray-600 text-center text-sm col-span-2 cursor-pointer ${length === featuresLabel.length ? 'hidden' : ''}`} onClick={() => setLenth(featuresLabel.length)}>
                   {length === featuresLabel.length ? "Show Less" : `Show More (${featuresLabel.length - length})`}
                 </span>
                    </div>
      </div>

{/* mobile only */}
      <div className="forMob hidden max-md:flex max-md:flex-col max-md:gap-5 max-md:mt-5">
<div className="types">
          <h1 className="text-[15px] text-start  font-semibold  mb-2">Beds</h1>
<div className="beds bg-white grid grid-cols-6 items-center   rounded-lg border border-gray-300 ">
{Array.from({ length: 6 }, (_, i) => i).map((e) => (
  <span onClick={() => {setBeds(e);setData((x:any) => ({...x , beds:e}))}} className={`p-2 ${e+1 !== 6 ? 'border-r border-r-gray-300' : ''} ${e  === Beds && "!bg-blue-500 text-white "} text-center w-full transition-all `}>{e+1}</span>
))}
</div>

</div>
<div className="types">
          <h1 className="text-[15px] text-start  font-semibold  mb-2">Baths</h1>
<div className="beds bg-white grid grid-cols-6 items-center   rounded-lg border border-gray-300 ">
{Array.from({ length: 6 }, (_, i) => i).map((e) => (
  <span onClick={() => {setBaths(e); setData((x:any) => ({...x , baths:e}))}} className={`p-2 ${e+1 !== 6 ? 'border-r border-r-gray-300' : ''} ${e === baths && "!bg-blue-500 text-white "} text-center w-full transition-all focus:!bg-blue-500 focus:text-white `}>{e+1}</span>
))}
</div>

</div>

<div className="money">
          <h1 className="text-[15px] text-start  font-semibold mb-3 mt-5">Price Range</h1>
  <div className="inputs grid grid-cols-2 gap-3 mt-2">
    <Input onChange={(a) => setData((e:any) => ({...e , min:a.target.value}))} placeholder="Min" className={`w-full bg-white py-5 ${data?.min > data?.max && "border border-red-400"} `} />
    <Input onChange={(a) => setData((e:any) => ({...e , max:a.target.value}))} placeholder="Max" className={`w-full bg-white py-5 ${data?.min > data?.max && "border border-red-400"}`} />
  {data?.min > data?.max && <span className="font-medium text-red-400 text-sm">{data?.min > data?.max ? "Min price is not valid" : "max price is not valid"}</span>}
  </div>
</div>
           <div className="estat">
                    <h1 className="text-[15px] text-start  font-semibold mb-3 mt-5">Property Type</h1>
             <SelectEstat setData={setData} />
           </div>
      </div>

      <div className="section_keywords">
        <h1 className="text-[15px] text-start  font-semibold mb-3 mt-5">Keywords</h1>
        <div className="keywords flex gap-3 flex-wrap">
          <Input placeholder="garage, balcony, swimming pool" className="flex-1 bg-white min-w-[200px]" onBlur={(a) => {
            setData((e:any) => ({...e , keywords:a.target.value.split(",")}))
          }} />
          </div>
      </div>


     </div>
    <DrawerFooter className="justify-start">
      <Button onClick={() => {
        console.log(data)
        if (data?.transactionType === "rent") {
route.push(`/rent?${new URLSearchParams(data)}`)
        } else {
          route.push(`/buy?${new URLSearchParams(data)}&search=true`)
        }
      }}>Search</Button>
      <DrawerClose className="w-full">
        <Button className="w-full" variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
  )
}

export default OPtionsDrawer