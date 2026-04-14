"use client"
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import BuyMobPage from './_components/BuyMobPage'
import BuyPage from './_components/BuyPage'
import { Toaster } from 'sonner'

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


function page() {



const isMob = useMediaQuery({maxWidth:980})

  return (
   <>
   <Toaster />
    <div className='overflow-y-hidden'>
      
    {isMob ? <BuyMobPage /> : <BuyPage />}
    </div>
   </>
  )
}

export default page