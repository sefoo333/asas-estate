import AddToFavourite from '@/componants/AddToFavourite'
import Image from 'next/image'

function CarsoulImages({images , IsFav}:any) {
  return (
      <div className="image relative h-[260px]">
            <AddToFavourite Type={"product_landing"} isFavourite={IsFav} />

 <div className="w-full h-full overflow-hidden relative">
  
  <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
    
    {images.map((e: any, i: number) => (
      <div
        key={i}
        className="min-w-full h-full flex-shrink-0 snap-start relative"
      >
        <Image
          src={e}
          alt="real"
          fill
          className="object-cover"
        />
      </div>
    ))}

  </div>
</div>

            <div className="images absolute bottom-10 right-5 flex gap-5 z-9">
{images?.slice(0,3)?.map((e:string) =>   <Image key={e}  src={e} alt="real" width={500} height={500} className='w-12 h-12 border-2 border-gray-300 rounded-lg' />)}

            </div>
        </div>

  )
}

export default CarsoulImages