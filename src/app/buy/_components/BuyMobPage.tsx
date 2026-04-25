"use client"
import{ useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import SearchBarMob from '@/componants/SearchBarMob'
import ProductsMob from '../_components/ProductsSectionMob'
import { PiMapPinAreaBold } from 'react-icons/pi'

// export const metadata:Metadata = {
//     title:"3qare - buy",
//     description:"buy and rent any real estats"
// }



/*
1- location
2- price 
3- beds & baths 
4- estate type
5- features 
6- Sale or Rent

*/


interface Data {
  location:string;
  price:number;
  beds:number;
  baths:number;
  estateType:string;
  features:string[];
  transactionType:string;
}


function BuyMobPage() {

  const params:any = useSearchParams();
  const [data , setData] = useState<Data | any>({});
const [searchResults , setSearchResults] = useState<any>([]);

const searchProducts = async () => {
    const res = await fetch(`/api/RealEstats/RealEstates/search?${new URLSearchParams(params.entries())}`)
    const json = await res.json()
    
    if (json?.data?.length === 0){
      toast.error("No results for your search 🙁")
    }
setSearchResults(json.data)
    
  }

  useEffect(() => {
searchProducts()
  },[params])


  return (
   <>
      
        <SearchBarMob setData={setData} setSearchResults={setSearchResults} data={data} />
        
            <div className="window w-full flex relative gap-30 p-5 overflow-hidden">
              <ProductsMob setSearchResults={setSearchResults} searchResults={searchResults} />
            {/* <Maps /> */}
            <div className="map  fixed right-0 bottom-10 p-3 bg-white shadow-sm text-primary rounded-full">
                <PiMapPinAreaBold size={24} className='text-primary' />
            </div>
        </div>
   </>
  )
}

export default BuyMobPage