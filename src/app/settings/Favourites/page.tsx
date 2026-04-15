"use client"

import React from 'react'
import Crubchumb from '../_components/crubchumb'
import HeadS from '../_components/HeadS'
import { useQuery } from '@tanstack/react-query'
import NotFound from '@/componants/NotFound'
import { useUserStore } from '@/store/store'
import { useIsMobile } from '@/hooks/use-mobile'
import { useMediaQuery } from 'react-responsive'
import Product_BRC from '@/componants/Product_BRC'
import Product from '@/componants/Product'

function Favourite() {

  const user = useUserStore((state) => state.user)

  const {data} = useQuery({
    queryKey:["Favourites"],
    queryFn:async () => {
      const res = await fetch(`/api/users/favourite`)
      const json = await res.json()
      return json?.data
    },
    refetchOnWindowFocus:false
  })

const isMob = useMediaQuery({maxWidth:767})

  
  return (
    <div className="page  px-7 max-md:px-5 py-7 basis-[100%]">
    <Crubchumb />
                <HeadS title="Favourites" />
                            <div className="window p-8 mt-10  max-md:px-0 rounded-lg border border-gray-200  ">
<div className="favourites relative flex flex-col gap-10">
  {data?.length > 0 && user ? (
    <>
    {data?.map((e:any) => (
 <>
 {isMob ?  <Product product={e} key={e} /> : <Product_BRC product={e} key={e} />}
 </>

  ))}
    </>
  ) : (
    <div className='my-10'>
      <NotFound />
    </div>
  )}
</div>
</div>

</div>
  )
}

export default Favourite