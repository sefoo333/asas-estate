"use client"
import { useEffect, useState } from 'react'

import { useGetProducts } from '@/hooks/useGetProducts';
import { useSearchParams } from 'next/navigation';
import { useSearchProducts } from '@/hooks/useSearchProducts';
import Product from '@/componants/Product';
function ProductsMob({searchResults,setSearchResults}:any) {
  const params = useSearchParams();

const {data} = useGetProducts("Sale");

const searchQuery = params.get("search"); 

const { Data:searchData } = useSearchProducts("Sale");

useEffect(() => {
  
  if (searchQuery) {
    setSearchResults(searchData);
  } else {
    setSearchResults([]);
  }
}, [searchData, searchQuery]);


  return (
    <div className="parent w-full max-xl:px-4 h-screen pb-70 overflow-y-scroll" style={{scrollbarWidth:"none"}}>
        <div className="container">
            <div className="title flex justify-between items-center">
                <h1 className='font-semibold text-start text-3xl max-md:text-2xl'>Properties for sale</h1>
                {/* <Select>
                    <SelectTrigger className="w-[150px] ">
                            <SelectValue className='font-semibold' placeholder={"Popular"} />
                          </SelectTrigger>
                    <SelectContent>
<SelectGroup>
    <SelectItem value='Popular' className='font-semibold'>Popular</SelectItem>
    <SelectItem value='Newest' className='font-semibold'>Newest</SelectItem>
    <SelectItem value='Oldest' className='font-semibold'>Oldest</SelectItem>
    <SelectItem value='lPrice' className='font-semibold'>Lowest price</SelectItem>
    <SelectItem value='hPrice' className='font-semibold'>Highest price</SelectItem>
</SelectGroup>
                    </SelectContent>
                </Select> */}
            </div>
           {/* <EasySearchsTypes products={data} /> */}
            <div className="products mt-5 max-md:flex max-md:flex-col  max-xl:grid max-xl:grid-cols-2 relative">
                            {searchResults?.length > 0 && searchQuery
    ? searchResults.map((e:any) => <Product key={e.id} product={e} />)
    : data?.map((e:any) => <Product key={e.id} product={e} />)
  }
            </div>
        </div>
    </div>
  )
}

export default ProductsMob