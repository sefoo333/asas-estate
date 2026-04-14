"use client"
import type { Metadata } from 'next'
import React, { useState } from 'react'
import ProductsRent from './_components/ProductsSection_Rent'
import Maps from '@/componants/MapsSection'
import SearchBar from '@/componants/SearchBar'
import SearchBarMob from '@/componants/SearchBarMob'
import { useMediaQuery } from 'react-responsive'
import RentPageMob from './_components/Responsive/RentPageMob'
import RentPage from './_components/Responsive/RentPage'

// export const metadata:Metadata = {
//     title:"3qare - rent",
//     description:"buy and rent any real estats"
// }

function page() {

   const [data , setData] = useState<any>({transactionType:"Rent"});
  const [searchResults , setSearchResults] = useState<any>([]);
const isMob = useMediaQuery({maxWidth:1016})

  return (
    <>
        {isMob ? <RentPageMob /> : <RentPage />}
    </>
  )
}

export default page