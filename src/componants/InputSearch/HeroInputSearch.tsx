"use client"
import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import SelectHero from './Selects/SelectEstat'
import SelectPrice from './Selects/SelectPrice'
import SelectTypes from './Selects/SelectTypes'
import SearchInput from './SearchInput'
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
const [openar,setOpener] = useState(false)
  return (
     <div className="input max-md:absolute max-md:top-[110px]  bg-white dark:bg-gray-800 dark:border dark:border-gray-600 rounded-xl p-5 ">
<div className="first max-md:flex-col h-12 max-md:h-fit  flex gap-5 ">
<div className="button flex rounded-md h-full border border-[#ccc] p-0.5  dark:border dark:border-gray-600">
<button  className={`px-8 w-full font-semibold py-2.5 cursor-pointer rounded-md transition-[500ms] ${!switcher && "bg-primary/20 text-primary "}`} onClick={() => setSwitcher(false)}>
  Buy
</button>
<button className={`px-8  w-full font-semibold py-2.5 cursor-pointer rounded-md transition-[500ms] ${switcher && "bg-primary/20 text-primary "}`} onClick={() => setSwitcher(true)}>
  Rent
</button>
</div>
 <div className="flex w-full max-w-md items-center gap-2">
<SearchInput parentClassName={"h-full"} setTextSearh={setTextSearh} finder={true} placeholder={'search Location'} className='max-md:!h-12 h-full' />
      <Button onClick={() => {
        searchProducts()
      }}  className="py-6 bg-primary px-7 h-full cursor-pointer max-md:h-12  hover:text-white text-white" variant="outline">
        Search
      </Button>
    </div>
</div>
<div className="second max-md:hidden mt-5 grid grid-cols-3 gap-5 justify-items-center">
   <SelectHero setSelectHero={setSelectHero}  data={data} placeholder='Select real Estat' Title='Stats' />
   <SelectPrice setOpener={setOpener} openar={openar} prices={selectPrice} setSelectPrice={setSelectPrice}  />
   <SelectTypes setOpener={setOpener} openar={openar} type={selectType} setTypes={setSelectType} />
</div>
   </div>
  )
}

export default HeroInputSearch