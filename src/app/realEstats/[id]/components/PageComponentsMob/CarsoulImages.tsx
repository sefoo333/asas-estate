import AddToFavourite from '@/componants/AddToFavourite'
import { useGetProducts } from '@/hooks/useGetProducts';
import { useUserStore } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'
import { useEffect, useState } from 'react';

function CarsoulImages({Productdata}:any) {

  
  
  
     const {data:FavouriteProduct}:any = useQuery({
      queryKey:["Favourites",Productdata?.id],
      queryFn:async () => {
        const res = await fetch(`/api/users/favourite`)
        const json = await res.json()
  
      
        return json?.data
      },
      refetchOnWindowFocus:false
    })
  
    const [IsFav,setIsFav]= useState(false)
  
    const user = useUserStore((state) => state.user)
    useEffect(() => {
  if (user && Array.isArray(FavouriteProduct)){
      setIsFav(FavouriteProduct?.map((e:any) => e?.id)?.includes(Productdata?.id))
  }
      
    },[FavouriteProduct])

  return (
      <div className="image relative h-[260px]">
            <AddToFavourite Type={"product_landing"} isFavourite={IsFav} />

 <div className="w-full h-full overflow-hidden relative">
  
  <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
    
    {Productdata?.images.map((e: any, i: number) => (
      <div
        key={i}
        className="min-w-full h-full flex-shrink-0 snap-start relative"
      >
        <Image
          src={e}
          alt="real"
          fill
          loading="lazy"
          className="object-cover"
        />
      </div>
    ))}

  </div>
</div>

            <div className="images absolute bottom-10 right-5 flex gap-5 z-9">
{Productdata?.images?.slice(0,3)?.map((e:string) =>   <Image loading="lazy" key={e}  src={e} alt="real" width={500} height={500} className='w-12 h-12 border-2 border-gray-300 rounded-lg' />)}

            </div>
        </div>

  )
}

export default CarsoulImages