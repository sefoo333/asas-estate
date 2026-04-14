"use client"
import React, { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetProducts } from '@/hooks/useGetProducts';
import EasySearchsTypes from '@/componants/EasySearchsTypes';
import { useSearchParams } from 'next/navigation';
import { useSearchProducts } from '@/hooks/useSearchProducts';
import { useMediaQuery } from 'react-responsive';
import Product_BRC from '@/componants/Product_BRC';
import Product from '@/componants/Product';
function ProductsRent({searchResults,setSearchResults ,setOpen ,open }:any) {
  
const {data} = useGetProducts("Rent");

const params = useSearchParams();
const searchQuery = params.get("search"); 

const { Data:searchData } = useSearchProducts("Rent");

useEffect(() => {
  console.log("searching", searchQuery, searchData);
  if (searchQuery) {
    setSearchResults(searchData);
  } else {
    setSearchResults([]);
  }
}, [searchData, searchQuery]);
const isMob = useMediaQuery({maxWidth:920}); 

return (
    <div className={`parent flex justify-center w-full max-md:basis-full h-screen pb-70 overflow-y-scroll mt-20`} style={{scrollbarWidth:"none"}}>
        <div className="container w-[80rem] h-screen">
            <div className="title flex justify-between items-center">
                <h1 className='font-semibold text-start text-3xl'>Properties for Rent</h1>
                <Select>
                    <SelectTrigger className="w-[150px] max-md:hidden ">
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
                </Select>
            </div>
                      <EasySearchsTypes products={data} />

            
            <div className="products pb-30 mt-14 max-md:flex max-md:flex-col  max-md:w-full gap-9 relative">
            {searchResults?.length > 0 && searchQuery ? searchResults.map((e:any) => (
<>
{isMob ?  <Product product={e} key={e} /> : <Product_BRC product={e} key={e} />}
</>

              )) :
              (
                data?.map((e:any) => (
<>
{isMob ?  <Product product={e} key={e} /> : <Product_BRC product={e} key={e} />}
</>
                ))
              )
              }

            </div>
        </div>
    </div>
  )
}

export default ProductsRent