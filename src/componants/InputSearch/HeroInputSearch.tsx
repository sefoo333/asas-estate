"use client"
import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import SelectHero from './Selects/SelectEstat'
import SelectPrice from './Selects/SelectPrice'
import SelectTypes from './Selects/SelectTypes'
import SearchInput from './SearchInput'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'

function HeroInputSearch() {


  const data = ["house" , "villa" , "apartment"]



  const [switcher,setSwitcher] = useState(false)
const [textSearch , setTextSearh] = useState("");
const [selectHero,setSelectHero] = useState("");
    const [selectPrice,setSelectPrice] = useState<{min?:string,max?:string}>({});
const [selectType,setSelectType]:any = useState<{beds?:string,baths?:string}>({});


const router = useRouter();

const searchProducts = async () => {
// setSearchResults(json.data)
router.push(`/${switcher ? "rent" : "buy"}?${new URLSearchParams({title:textSearch , transactionType:switcher ? "Rent" : "Sale" , estateType:selectHero , min:`${selectPrice.min || ""}` , max:`${selectPrice.max || ""}` , baths:selectType.baths || "" , beds:selectType.beds || ""}  )}`)
  }

  return (
     <div className="input max-md:absolute max-md:top-[110px]  bg-white rounded-xl p-5 ">
<div className="first max-md:flex-col flex gap-5 ">
<div className="button flex rounded-md  border border-[#ccc] p-0.5">
<button  className={`px-8 w-full font-semibold py-2.5 cursor-pointer rounded-md transition-[500ms] ${!switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => setSwitcher(false)}>
  Buy
</button>
<button className={`px-8  w-full font-semibold py-2.5 cursor-pointer rounded-md transition-[500ms] ${switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => setSwitcher(true)}>
  Rent
</button>
</div>
 <div className="flex w-full max-w-md items-center gap-2">
<SearchInput setTextSearh={setTextSearh} finder={true} placeholder={'search Location'} />
      <Button onClick={() => {
        searchProducts()
      
      }}  className="py-6 bg-blue-600 px-7 cursor-pointer hover:bg-blue-700 hover:text-white text-white" variant="outline">
        Search
      </Button>
    </div>
</div>
<div className="second max-md:hidden mt-5 grid grid-cols-3 gap-5 justify-items-center">
   <SelectHero setSelectHero={setSelectHero}  data={data} placeholder='Select real Estat' Title='Stats' />
   <SelectPrice prices={selectPrice} setSelectPrice={setSelectPrice}  />
   <SelectTypes type={selectType} setTypes={setSelectType} />
</div>
   </div>
  )
}

export default HeroInputSearch