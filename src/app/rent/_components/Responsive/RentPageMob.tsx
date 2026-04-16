"use client"
import { useState } from 'react'
import ProductsRent from '../ProductsSection_Rent'
import SearchBarMob from '@/componants/SearchBarMob'
import { PiMapPinAreaBold } from 'react-icons/pi'

// export const metadata:Metadata = {
//     title:"3qare - rent",
//     description:"buy and rent any real estats"
// }

function RentPageMob() {

   const [data , setData] = useState<any>({transactionType:"Rent"});
  const [searchResults , setSearchResults] = useState<any>([]);

  return (
    <div>
       <SearchBarMob setData={setData} setSearchResults={setSearchResults} data={data} />
        
            <div className="window flex relative gap-30 p-5 max-md:w-full overflow-hidden">
              <ProductsRent setSearchResults={setSearchResults} searchResults={searchResults} />
            {/* <Maps /> */}
            <div className="map  fixed right-0 bottom-10 p-3 bg-white shadow-sm text-primary rounded-full">
                <PiMapPinAreaBold size={24} className='text-primary' />
            </div>
        </div>
    </div>
  )
}

export default RentPageMob