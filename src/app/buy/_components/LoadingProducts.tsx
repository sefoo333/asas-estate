import { Skeleton } from '@/components/ui/skeleton'

function LoadingProducts() {
  return (
    <div className="window flex justify-center my-10">
   <div className="container">
         <div className="sear">
          <div className="flex">
              <Skeleton className='w-full h-15 rounded-lg'></Skeleton>
              <Skeleton className='w-45 h-15 rounded-lg ml-5'></Skeleton>
          </div>
            <div className="grid grid-cols-4 gap-5 mt-5">
                            <Skeleton className='w-full h-13 rounded-lg'></Skeleton>
                            <Skeleton className='w-full h-13 rounded-lg'></Skeleton>
                            <Skeleton className='w-full h-13 rounded-lg'></Skeleton>
                            <Skeleton className='w-full h-13 rounded-lg'></Skeleton>

            </div>
        </div>
        <div className="products_map grid grid-cols-3 gap-5 mt-10">
            <div className="products flex flex-col gap-5 col-span-2">
                <Skeleton className='w-full h-55 rounded-lg'></Skeleton>
                <Skeleton className='w-full h-55 rounded-lg'></Skeleton>
                <Skeleton className='w-full h-55 rounded-lg'></Skeleton>
                <Skeleton className='w-full h-55 rounded-lg'></Skeleton>
            </div>
            <Skeleton className='w-full  h-screen rounded-lg'></Skeleton>
        </div>
   </div>
    </div>
  )
}

export default LoadingProducts