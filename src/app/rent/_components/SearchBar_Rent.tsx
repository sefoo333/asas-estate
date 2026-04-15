"use client"

import SearchInput from '@/componants/InputSearch/SearchInput'
import SelectEstat from '@/componants/InputSearch/Selects/SelectEstat'
import SelectPrice from '@/componants/InputSearch/Selects/SelectPrice'
import SelectTypes from '@/componants/InputSearch/Selects/SelectTypes'
import OPtionsDrawer from '@/componants/OPtionsDrawer'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

function SearchBarRent({setData,setSearchResults,data}:any) {



   const searchProducts = async () => {

    const res = await fetch(`/api/RealEstats/RealEstates/search?${new URLSearchParams({...data, transactionType:"Rent"})}`)
    const json = await res.json()
setSearchResults(json.data)
    
  }





  return (
  <div className="parent flex justify-center my-4">
        <div className="container flex flex-col  gap-6 w-[80rem]">
            <SearchInput setData={setData} finder={false} placeholder={'Search Location'} />
           <div className="select flex gap-5 w-full">
             <SelectTypes setData={setData} />
            <SelectPrice setData={setData} />
            <SelectEstat setData={setData} />
                <OPtionsDrawer setData={setData} data={data} />
                   <Button onClick={() => {
searchProducts()
                   }} variant={"default"} className='py-5 px-8 w-[150px] cursor-pointer'>
                <Search size={30} /> <span className='font-semibold text-sm '>Search</span>
                </Button>
           </div>
        </div>
    </div>
  )
}

export default SearchBarRent