import React, { useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaBath, FaBed } from 'react-icons/fa6'
import { RxDimensions } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BiHeart } from 'react-icons/bi';
import Link from 'next/link';
import AddToFavourite from './AddToFavourite';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/store';
import { RealEstate } from '@/types/realEstate';
import { ArrowLeft, ArrowRight, Heart, Share } from 'lucide-react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BsWhatsapp } from 'react-icons/bs';
import { SendChat } from '@/app/realEstats/[id]/components/SendChat';
import { ShareProfile } from '@/app/brokers/[brokerid]/_compoents/ShareProfile';

function Product_BRC({product}: {product: RealEstate | any}) {

    const user = useUserStore((state) => state?.user)

      const {data}:any = useQuery({
    queryKey:["Favourites"],
    queryFn:async () => {
      const res = await fetch(`/api/users/favourite`)
      const json = await res.json()
      return json?.data
    },
    refetchOnWindowFocus:false
  })
  
  const [index,setIndex] = useState(0);

  return (
      <div className="product w-full flex-col relative h-full mb-5 bg-white flex dark:!bg-gray-800  dark:!border-gray-600  border border-[#ccc] rounded-xl ">
                {/* <Image className="image w-20 h-13 bg-red-500 absolute right-5 top-5" alt='' src={"/logo.jpg"} width={100} height={100} /> */}
                       <div className="flex gap-5 h-[270px] ">
                         <div className="image relative h-full">
{index > 0 &&                             <IoIosArrowBack onClick={() => setIndex((a) => a - 1)} size={30} className="cursor-pointer absolute h-full left-2 top-1/2 -translate-y-1/2 text-white" />
}
                            <Image className="image w-[450px] h-full   object-cover rounded-l-xl" src={product?.images?.slice(index)[0]} width={400} height={300} alt='' />
                      
                         {/* {user && <AddToFavourite isFavourite={user?.id && data?.map((e) => e?.id).includes(product?.id)} product={product} />} */}
                            <div className="points absolute bottom-4 left-1/2 translate-x-[-50%] items-center flex gap-3">
                            {product?.images?.map((e:string,a:number) =>                         <div key={a} className={`w-2 h-2 bg-white rounded-full transition-all ${index === a && "w-3 h-3"}`} onClick={()  => setIndex(a)}></div>)}
                              
                            </div>
                            {index + 1 !== product?.images?.length &&      <IoIosArrowForward onClick={() => setIndex((a) => a + 1)} size={30} className="cursor-pointer absolute h-full right-2 top-1/2 -translate-y-1/2 text-white" />
}
                        </div>
                                        <Link href={`/realEstats/${product?.id}`}>

                        <div className="text p-7">
                            <h1 className='text-[15px]'>{product?.type.startsWith("b_") ? product?.type?.slice(2) : product?.type}</h1>
                            <h1 className='font-bold text-3xl mb-4 mt-3'>${product?.price}</h1>
                            <p className='text-[16px] text-gray-700 dark:text-gray-400'>{product?.description?.slice(0,20)}</p>
                                                        <div className="location flex gap-1.5 items-center mt-7 mb-3">
                                                            <IoLocationSharp size={22} />
                                                            <span className='text-sm font-semibold'>{product?.location}</span>
                                                        </div>
                             <div className="props flex gap-4 my-1.5">
                                                            <div className="bed flex gap-2 items-center text-[#474747] dark:text-gray-400">
                                                                <h1>{product?.beds}</h1>
                                                                <FaBed size={17} color="#474747" className='dark:!text-gray-400' />
                                                            </div>
                                                                                                                   <span className='text-gray-300'>|</span>
                                                            <div className="bed flex gap-2 items-center text-[#474747] dark:!text-gray-400">
                                                                <h1>{product?.Baths}</h1>
                                                                <FaBath size={17} color="#474747" className='dark:!text-gray-400' />
                                                            </div>
                                                            <span className='text-gray-300'>|</span>
                                                            <div className="bed flex gap-2 items-center text-[#474747] dark:!text-gray-400">
                                                                <h1>{product?.Sqft}</h1>
                                                                <RxDimensions size={17} color="#474747" className='dark:!text-gray-400' />
                                                            </div>
                                                        </div>
                                                        
                        </div>
</Link>
                       </div> 

                        <div className="boxes bg-gray-100 dark:!bg-gray-800 dark:border-t  dark:!border-gray-600 p-3 rounded-b flex items-center justify-end gap-3 ">
                                                         <div className="contact flex justify-end gap-4 pr-3 border-r border-r-gray-300 ">
   <Link href={`https://wa.me/${product?.user?.phone}?text=مرحبا ${product?.user?.userName} , هل يمكنني الاستفسار عن  العقار الخاص بك ؟`}>
                                                            <Button variant={"outline"} size={"lg"} className='  px-5 py-3 flex gap-2 items-center font-semibold rounded-md cursor-pointer'>
    <BsWhatsapp size={20} />
    <span >WhatsApp</span>
                                                            </Button>
   </Link>
   <Link href={`tel:${product?.user?.phone}`}>
                                                            <Button variant={"outline"} size={"lg"} className=' cursor-pointer  px-5 py-3 flex gap-2 items-center font-semibold rounded-md'>
    <FaPhoneAlt  size={20}  />
    <span>Call</span>
                                                            </Button>
   </Link>
                                                          
                                                            <SendChat product={product} type={"box-on"} />
                                                        </div>

                                                        <div className="loves flex gap-3">
                                                            
                                                            <AddToFavourite  isFavourite={user?.id && Array.isArray(data) && data?.map((e) => e?.id).includes(product?.id) || false} product={product} /> 
                                                                <ShareProfile Type="" link={`${location.origin}/realEstats/${product?.id}`} />
                                                           
                                                        </div>
                                                        

                        </div>
                    </div>
  )
}

export default Product_BRC