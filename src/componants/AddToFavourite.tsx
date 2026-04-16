"use client"
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/store'
import { useMutation } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
function AddToFavourite({Type = true,product,isFavourite}:any) {
    const user = useUserStore((state) => state.user)
    const Favourite = async (product:any) => {
      
      const test = await fetch(`/api/users/favourite` , {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({productId:product?.id , userId:user?.id})
      })  
      
      return test.json()
    }
    const AddToFavourite = useMutation({
        mutationFn:Favourite,

    })

    const [fav,setFav] = useState(false);


    useEffect(() => {
      setFav(isFavourite)
    },[isFavourite])

  return (
 <>
 {Type === "product_landing" ?  <div onClick={() => {AddToFavourite.mutate(product);setFav((e) => !e)}} className="favourite p-2 absolute top-5 left-5 cursor-pointer bg-white rounded-full z-1 text-black">
                               {fav ?  <IoHeart  size={21} className='text-red-500' /> :  <IoHeartOutline   size={21} className='' />}
                            </div>
                          : Type === "product_onsite" ?
                             <div className="box flex items-center cursor-pointer" onClick={() => {AddToFavourite.mutate(product);setFav((e) => !e)}}>
                               {fav ?  <IoHeart  size={27} className='text-red-500' /> :  <IoHeartOutline  size={27} className='' />}
                <span className='text-sm ml-2'>{fav ? "Loved" : "Love"}</span>
            </div>  : <Button onClick={() => {AddToFavourite.mutate(product);setFav((e) => !e)}} variant={"outline"} size={"icon-lg"} className='p-2 border cursor-pointer transition-all hover:bg-slate-50 border-gray-300 bg-white rounded-lg '>
                                                                  {fav ?  <IoHeart  size={27} className='text-red-500' /> :  <IoHeartOutline  size={27} className='' />}
                                                                </Button>
                          }
 </>
                              )
}

export default AddToFavourite