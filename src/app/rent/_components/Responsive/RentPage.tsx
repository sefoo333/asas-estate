"use client"
import  { useState } from 'react'
import Maps from '@/componants/MapsSection'
import SearchBar from '@/componants/SearchBar'
import ProductsRent from '../ProductsSection_Rent'

// export const metadata:Metadata = {
//     title:"3qare - rent",
//     description:"buy and rent any real estats"
// }

function RentPage() {

   const [data , setData] = useState<any>({transactionType:"Rent"});
  const [searchResults , setSearchResults] = useState<any>([]);
const [open,setOpen] = useState(false)

  return (
    <div>
        <SearchBar setOpen={setOpen} open={open} transactionType="Rent" setData={setData} setSearchResults={setSearchResults} data={data} />
            <div className={`window mt-10 flex gap-30 max-xl:pl-10 max-2xl:pl-20 ${!open && "pl-35"} overflow-hidden`}>
            <ProductsRent setOpen={setOpen} open={open} setSearchResults={setSearchResults} searchResults={searchResults} />
            <Maps setOpen={setOpen} open={open} />
        </div>
    </div>
  )
}

export default RentPage