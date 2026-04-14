"use client"
import type { Metadata } from 'next'
import React, { useState } from 'react'
import Maps from '@/componants/MapsSection'
import Product from '@/componants/Product'
import Products from './_components/ProductsSection_com'
import SearchBar from '@/componants/SearchBar'
import { useMediaQuery } from 'react-responsive'
import SearchBarMob from '@/componants/SearchBarMob'
import { PiMapPinAreaBold } from 'react-icons/pi'

// export const metadata:Metadata = {
//     title:"3qare - buy",
//     description:"buy and rent any real estats"
// }

function page() {

  
     const [data , setData] = useState<any>({transactionType:"Sale"});
    const [searchResults , setSearchResults] = useState<any>([]);
    const isMob = useMediaQuery({maxWidth:920});
const [open,setOpen] = useState(false);
  return (
   <>
   {!isMob ? (
     <div className="bg-background  text-foreground dark:bg-background dark:text-foreground min-h-screen">
        <SearchBar open={open} setOpen={setOpen} transactionType="Sale" setData={setData} setSearchResults={setSearchResults} data={data} />
            <div className="window flex gap-30 pl-35 max-xl:pl-5 overflow-hidden dark:bg-background">
            <Products setSearchResults={setSearchResults} searchResults={searchResults}  />
            <Maps open={open} setOpen={setOpen} />
        </div>
    </div>
   ) : (
     <div className="bg-background  text-foreground dark:bg-background dark:text-foreground min-h-screen">
         <SearchBarMob setData={setData} setSearchResults={setSearchResults} data={data} />
        
            <div className="window flex flex-col  relative gap-30 p-5 overflow-hidden">
              <Products setSearchResults={setSearchResults} searchResults={searchResults} />
            {/* <Maps /> */}
            <div className="map  fixed right-0 bottom-10 p-3 bg-white shadow-sm text-primary rounded-full">
                <PiMapPinAreaBold size={24} className='text-primary' />
            </div>
        </div>
    </div>
   )}
   </>
  )
}

export default page