"use client"
import React, { useEffect, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaBath, FaBed } from 'react-icons/fa6'
import { RxDimensions } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BiHeart } from 'react-icons/bi';
import Product from '../../../componants/Product_BRC';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetProducts } from '@/hooks/useGetProducts';
import { useSearchParams } from 'next/navigation';
import { useSearchProducts } from '@/hooks/useSearchProducts';
import NotFound from '@/componants/NotFound';
import EasySearchsTypes from '@/componants/EasySearchsTypes';
function Products({searchResults,setSearchResults}:any) {
const [myData,setData]:any = useState([]);

// let myData = getProducts("buy");
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
    <div className="parent basis-[80%] h-screen pb-70 overflow-y-scroll mt-20" style={{scrollbarWidth:"none"}}>
        <div className="container">
            <div className="title flex justify-between items-center">
                <h1 className='font-semibold text-start text-3xl'>Properties for sale</h1>
                <Select>
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
                </Select>
            </div>
           <EasySearchsTypes products={data} />
            <div className="products mt-14 flex flex-col gap-9 relative">
                            {searchResults?.length > 0 && searchQuery
    ? searchResults.map((e:any) => <Product key={e.id} product={e} />)
    : data?.map((e:any) => <Product key={e.id} product={e} />)
  }
            </div>
        </div>
    </div>
  )
}

export default Products