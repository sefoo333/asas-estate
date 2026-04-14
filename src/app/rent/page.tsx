"use client"
// import type { Metadata } from 'next'
import React from 'react'

import { useMediaQuery } from 'react-responsive'
import RentPageMob from './_components/Responsive/RentPageMob'
import RentPage from './_components/Responsive/RentPage'

// export const metadata:Metadata = {
//     title:"3qare - rent",
//     description:"buy and rent any real estats"
// }

function page() {

const isMob = useMediaQuery({maxWidth:1016})

  return (
    <>
        {isMob ? <RentPageMob /> : <RentPage />}
    </>
  )
}

export default page