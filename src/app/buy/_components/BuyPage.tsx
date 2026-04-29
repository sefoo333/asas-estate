"use client"
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import SearchBar from '@/componants/SearchBar'
import Products from './ProductsSection'
import Maps from '@/componants/MapsSection'

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


function BuyPage() {

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



const [open,setOpen] = useState(false);

  return (
    <>
   {/* from-black via-zinc-900 to-zinc-800 text-white */}
        <SearchBar setOpen={setOpen} setData={setData} setSearchResults={setSearchResults} data={data} />
  
            <div className="window flex relative gap-30 pl-35 max-2xl:pl-20 max-xl:pl-5 overflow-hidden">
             <Suspense fallback={<div>Loading Products...</div>}>
        <Products setSearchResults={setSearchResults} searchResults={searchResults} />
      </Suspense>
              
             <Suspense fallback={<div>Loading Users...</div>}>
  <Suspense fallback={<div className='bg-red'>Loading Users...</div>}>
       <Maps open={open} setOpen={setOpen} />
      </Suspense>
      </Suspense>
        </div>
   </>
  )
}

export default BuyPage