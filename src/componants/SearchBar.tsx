"use client"
import SearchInput from '@/componants/InputSearch/SearchInput'
import SelectEstat from '@/componants/InputSearch/Selects/SelectEstat'
import SelectPrice from '@/componants/InputSearch/Selects/SelectPrice'
import SelectTypes from '@/componants/InputSearch/Selects/SelectTypes'
import OPtionsDrawer from '@/componants/OPtionsDrawer'
import { Button } from '@/components/ui/button'
import { MapIcon, Search } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

function SearchBar({setData,data , setSearchResults , transactionType,setOpen ,open}:any) {

  const pathname = usePathname();
const route = useRouter();

  const searchProducts = async () => {
route.push(`/${pathname.split("/")[1]}?${new URLSearchParams({...data , transactionType:transactionType || (pathname.includes("rent") ? "Rent" : "Sale") })}&search=true`)
  }

  const [openar,setOpener] = useState("");

  return (
    <div className="parent flex justify-center my-4">
        <div className="container flex flex-col  gap-6 w-[80rem]">
           <div className="flex gap-3 items-center">
             <SearchInput  setData={setData} finder={true} placeholder={'search Location'} />
            <Button onClick={() => setOpen((e:boolean) => !e)} className='h-full w-40'>
              <MapIcon />
              Open Map
            </Button>
           </div>
           <div className="select flex gap-5 w-full">
             <SelectTypes setOpener={setOpener} openar={openar} setData={setData} />
            <SelectPrice  setOpener={setOpener} openar={openar} setData={setData} />
            <SelectEstat setData={setData} />
                <OPtionsDrawer data={data} setData={setData} />
                   <Button variant={"default"} className='py-5 px-8 w-[150px] cursor-pointer' onClick={() => {
                    searchProducts()
                   }}>
                <Search size={30} /> <span className='font-semibold text-sm '>Search</span>
                </Button>
           </div>
        </div>
    </div>
  )
}

export default SearchBar