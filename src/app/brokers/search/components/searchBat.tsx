"use client"

import SearchInput from '@/componants/InputSearch/SearchInput'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import SelectInBroker from '../../_components/Select'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

function SearchBroker() {
  const types = ["Sale","Rent","Commercial"]
  const [switcher,setSwitcher] = useState(false)
  const router= useRouter();
  const [text,setText] = useState("")
  const [type,setType] = useState("Buy")

  const searchProducts = async () => {
// setSearchResults(json.data)
router.replace(`/brokers/search?finder=${!switcher ? "name" : "location"}&${new URLSearchParams({title:text , type:type }  )}`)
router.refresh()
  }


  return (
    <div className="parent flex justify-center mt-5">
        <div className="container flex max-md:flex-col items-center gap-6 w-[90rem] max-md:w-full">
      <div className="button flex rounded-md  border border-[#ccc] dark:border-gray-600 p-0.5 ">
<button className={`px-8 font-semibold py-2.5 cursor-pointer rounded-md transition-[500ms] ${!switcher && "bg-primary/20 text-primary"}`} onClick={() => setSwitcher(() => false)}>
  Name
</button>
<button className={`px-8 font-semibold py-2.5 cursor-pointer rounded-md transition-[500ms] ${switcher && "bg-primary/20 text-primary"}`} onClick={() => setSwitcher(() => true)}>
  Location
</button>
</div>
            <SearchInput finder={switcher} placeholder={!switcher ? "Name" : "Location"} setTextSearh={setText} className=' py-6 ' />
           <div className="select flex gap-5">
            <SelectInBroker onChange={setType} Title={""} data={types} placeholder="select type" />
           </div>
                 <Button variant={"default"} className='py-5 px-8 w-[150px] cursor-pointer' onClick={() => {
                    searchProducts()
                   }}>
                <Search size={30} /> <span className='font-semibold text-sm '>Search</span>
                </Button>
        </div>
    </div>
  )
}

export default SearchBroker