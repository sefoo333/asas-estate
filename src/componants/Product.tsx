"use client"
import React from 'react'
import Image from "next/image";
import { MdOutlineBed } from 'react-icons/md';
import { LuBath } from 'react-icons/lu';
import { CiRuler } from 'react-icons/ci';

import Link from 'next/link';
import AddToFavourite from './AddToFavourite';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/store';

interface Product {
    badge:string,
    image:string,
    title:string,
    price:number,
    Baths:number,
    beds:number,
    location:string,
    id:string,
    images:string[],
    Sqft:number,
}

// {badge,image,Title,price,baths,beds,location,id}:Product
function Product({product , screen = false,className}:{product:Product ,screen?:boolean , className?:string}) {

    const user = useUserStore((state) => state?.user)


     const {data}:any = useQuery({
    queryKey:["Favourites"],
    queryFn:async () => {
      const res = await fetch(`/api/users/favourite`)
      const json = await res.json()
//         if (!res.ok) {
//     throw new Error("Failed to fetch favourite")
//   }
      return json?.data
    },
    refetchOnWindowFocus:false
  })

  return (
      <div className={`product p-3 rounded-xl relative flex-shrink-0 snap-start ${screen ? "max-md:w-screen" : "max-md:w-full"} ${className}`}>
        {user && Array.isArray(data) &&                          <AddToFavourite Type="product_landing" product={product} isFavourite={user?.id && Array.isArray(data) && data?.map((e) => e?.id).includes(product?.id) || false} />}

        <Link href={`/realEstats/${product?.id}`}>
                       <div className="image  w-full h-[200px] max-xl:h-[170px]  relative">
                        {/* <span className="rounded-full text-white px-3 py-0.5 text-[13px] whitespace-nowrap bg-blue-500 absolute right-2 top-2">
      New - 5 hours
    </span> */}
    
                         <Image  className="image rounded-t-xl rounded-xl w-full h-full bg-transparent " src={product?.images[0]} alt="" width={300} height={200} />
                       </div>
                        <div className="box py-4 px-1">
                            <div className="flex justify-between items-center mt-1 max-xl:flex-col-reverse max-xl:items-start">
                                <h1 className="font-bold text-xl max-w-[60%] max-md:max-w-full">{product?.title}</h1>
                        <h1 className="font-semibold text-2xl max-xl:text-[15px] max-xl:mb-1">${product?.price}</h1>
                            </div>
                        <div className="location flex text-gray-600 dark:text-gray-500 gap-2 mb-2 items-center text-[15px]">
                             {/* <IoLocationSharp size={18} />  */}
                            <h3>{product?.location}</h3>
                        </div>
                             <div className="props flex gap-4 my-1.5">
                                <div className="bed flex gap-2 max-xl:h-fit rounded-full bg-gray-50 border border-gray-200 dark:!bg-gray-800  dark:!border-gray-600 items-center text-[#474747]">
                                    <MdOutlineBed className='bg-white w-[30px] border border-gray-200 dark:!text-gray-300 dark:!bg-gray-800  dark:!border-gray-600 p-[4px] rounded-full h-full' size={15} color="#474747" />
                                    <h1 className='pr-[9px] dark:text-gray-400'>{product?.beds}</h1>
                                </div>
                                <div className="bed flex gap-2 max-xl:h-fit rounded-full bg-gray-50 border dark:!bg-gray-800  dark:!border-gray-600 border-gray-200 items-center text-[#474747]">
                                    <LuBath  className='bg-white w-[30px] border border-gray-200 p-[5px] dark:!text-gray-300 dark:!bg-gray-800  dark:!border-gray-600 rounded-full h-full' size={15} color="#474747" />
                                    <h1 className='pr-[9px] dark:text-gray-400'>{product?.Baths}</h1>
                                </div>
                                <div className="bed flex gap-2 max-xl:h-fit rounded-full bg-gray-50 border dark:!bg-gray-800  dark:!border-gray-600 border-gray-200 items-center text-[#474747]">
                                    <CiRuler  className='bg-white w-[30px] border border-gray-200 p-[4px] dark:!text-gray-300 dark:!bg-gray-800  dark:!border-gray-600 rounded-full h-full' size={16} color="#474747" />
                                    <h1 className='pr-[9px] dark:text-gray-400'>{product?.Sqft} <span className='font-medium max-md:hidden '>m<sup>2</sup></span></h1>
                                </div>
                              
                            </div>
                      
                           {/* <button
      className="flex w-full items-center justify-center gap-2 rounded-sm border bg-blue-600 px-12 py-3 text-sm font-semibold text-white cursor-pointer  mt-3 focus:ring-3 focus:outline-hidden"
    >
      <IoChatboxEllipses size={16} /> Chat Now 
    </button> */}
                        </div>
    </Link>
                    </div>
  )
}

export default Product




/*

    <div className="product shadow rounded-xl">
                       <div className="image  w-full h-[200px]  relative">
                        <span className="rounded-full text-white px-3 py-0.5 text-[13px] whitespace-nowrap bg-blue-500 absolute right-2 top-2">
      New - 5 hours
    </span>
    
                         <Image className="image rounded-t-xl w-full h-full bg-red-500 " src={"/Hero.jpg"} alt="" width={300} height={200} />
    <div className="icon rounded-full bg-white p-2 absolute left-1 top-2  ">
                             <GoHeart size={20} className="cursor-pointer" color="black" />
    </div>
                       </div>
                        <div className="box p-4">
                            <div className="flex justify-between items-center mt-1">
                                <h1 className="font-bold text-xl">House Name</h1>
                        <h1 className="font-semibold text-2xl ">$500</h1>
                            </div>
                            <div className="props flex gap-4 my-1.5">
                                <div className="bed flex gap-2 items-center text-[#474747]">
                                    <h1>3</h1>
                                    <FaBed size={17} color="#474747" />
                                </div>
                                <div className="bed flex gap-2 items-center text-[#474747]">
                                    <h1>2</h1>
                                    <FaBath size={17} color="#474747" />
                                </div>
                            </div>
                        <div className="location flex gap-2 my-3 items-center text-[15px]">
                            <IoLocationSharp size={18} />
                            <h3>Cairo - Nasr City</h3>
                        </div>
                        {/* <h3>Appartment</h3> 
                           <button
      className="flex w-full items-center justify-center gap-2 rounded-sm border bg-blue-600 px-12 py-3 text-sm font-semibold text-white cursor-pointer  mt-3 focus:ring-3 focus:outline-hidden"
    >
      <IoChatboxEllipses size={16} /> Chat Now 
    </button>
                        </div>
                    </div>

*/
/*

 <div className="product shadow rounded-xl">
                       <div className="image  w-full h-[200px]  relative">
                        <span className="rounded-full text-white px-3 py-0.5 text-[13px] whitespace-nowrap bg-blue-500 absolute right-2 top-2">
      New - 5 hours
    </span>
    
                         <Image className="image rounded-t-xl w-full h-full bg-red-500 " src={"/Hero.jpg"} alt="" width={300} height={200} />
    <div className="icon rounded-full bg-white p-2 absolute left-1 top-2  ">
                             <GoHeart size={20} className="cursor-pointer" color="black" />
    </div>
                       </div>
                        <div className="box p-4">
                            <div className="flex justify-between items-center mt-1">
                                <h1 className="font-bold text-xl">House Name</h1>
                        <h1 className="font-semibold text-2xl ">$500</h1>
                            </div>
                        <div className="location flex text-gray-600 gap-2 mb-2 items-center text-[15px]">
                            {/* <IoLocationSharp size={18} /> 
                            <h3>Cairo - Nasr City</h3>
                        </div>
                             <div className="props flex gap-4 my-1.5">
                                <div className="bed flex gap-2 rounded-full bg-gray-50 border border-gray-200 items-center text-[#474747]">
                                    <MdOutlineBed className='bg-white w-[30px] border border-gray-200 p-[4px] rounded-full h-full' size={15} color="#474747" />
                                    <h1 className='pr-[9px]'>3</h1>
                                </div>
                                <div className="bed flex gap-2 rounded-full bg-gray-50 border border-gray-200 items-center text-[#474747]">
                                    <LuBath  className='bg-white w-[30px] border border-gray-200 p-[5px] rounded-full h-full' size={15} color="#474747" />
                                    <h1 className='pr-[9px]'>3</h1>
                                </div>
                                <div className="bed flex gap-2 rounded-full bg-gray-50 border border-gray-200 items-center text-[#474747]">
                                    <CiRuler  className='bg-white w-[30px] border border-gray-200 p-[4px] rounded-full h-full' size={15} color="#474747" />
                                    <h1 className='pr-[9px]'>420 <span className='font-medium'>m<sup>2</sup></span></h1>
                                </div>
                              
                            </div>
                      
                           <button
      className="flex w-full items-center justify-center gap-2 rounded-sm border bg-blue-600 px-12 py-3 text-sm font-semibold text-white cursor-pointer  mt-3 focus:ring-3 focus:outline-hidden"
    >
      <IoChatboxEllipses size={16} /> Chat Now 
    </button>
                        </div>
                    </div>

 */



                    /*
                     <div className="product  rounded-xl p-3">
                       <div className="image  w-full h-[300px]  relative">
                        <span className="rounded-full text-black px-3 py-0.5 text-[13px] whitespace-nowrap bg-white absolute left-2 font-semibold top-2">
      Premium
    </span>
    
                         <Image className="image rounded-2xl relative before:w-30 before:absolute before:left-0 before:top-0 before:h-33 before:rounded-2xl before:bg-black before:z-9 w-full h-full bg-red-500 " src={"/Hero.jpg"} alt="" width={300} height={200} />
    <div className="icon rounded-full flex gap-2 p-2 absolute right-2 top-2 bg-white  ">
                             <BiHeart  size={20} className="cursor-pointer " color="black" />
    </div>
                       </div>
                        <div className="box p-4">
                            <div className="flex flex-col items-start mb-1 mt-1">
                             <div className="flex justify-between w-full items-center">
                                   <h1 className="font-semibold text-xl">House Name</h1>
                                <h3 className="font-semibold text-xl">2,470,000 $</h3>
                             </div>
                                                            <h3 className='text-[#9e9e9e] text-sm my-0.5'>Cairo - Nasr City</h3>
                                                            
                        {/* <h1 className="font-semibold text-2xl ">$500</h1> 
                            </div>
                            <div className="props flex gap-4 my-1.5">
                                <div className="bed flex gap-2 rounded-full bg-gray-50 border border-gray-200 items-center text-[#474747]">
                                    <MdOutlineBed className='bg-white w-[30px] border border-gray-200 p-[4px] rounded-full h-full' size={15} color="#474747" />
                                    <h1 className='pr-[9px]'>3</h1>
                                </div>
                                <div className="bed flex gap-2 rounded-full bg-gray-50 border border-gray-200 items-center text-[#474747]">
                                    <LuBath  className='bg-white w-[30px] border border-gray-200 p-[5px] rounded-full h-full' size={15} color="#474747" />
                                    <h1 className='pr-[9px]'>3</h1>
                                </div>
                                <div className="bed flex gap-2 rounded-full bg-gray-50 border border-gray-200 items-center text-[#474747]">
                                    <CiRuler  className='bg-white w-[30px] border border-gray-200 p-[4px] rounded-full h-full' size={15} color="#474747" />
                                    <h1 className='pr-[9px]'>420 <span className='font-medium'>m<sup>2</sup></span></h1>
                                </div>
                              
                            </div>
                      
                        {/* <h3>Appartment</h3> 
                           {/* <button
      className="flex w-full items-center justify-center gap-2 rounded-sm border bg-blue-600 px-12 py-3 text-sm font-semibold text-white cursor-pointer  mt-3 focus:ring-3 focus:outline-hidden"
    >
      <IoChatboxEllipses size={16} /> Chat Now 
    </button> 
                        </div>
                    </div>
                    */