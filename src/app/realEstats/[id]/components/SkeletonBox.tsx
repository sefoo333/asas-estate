import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonBox({big}:any) {
  return (
  <div className="w-full min-h-[200px] p-5 rounded-xl bg-white shadow-sm">
   <div className="image grid grid-cols-2 gap-5">
    <Skeleton className="rounded-xl w-full min-h-[200px]"></Skeleton>
    <Skeleton className="rounded-xl w-full row-span-2 min-h-[200px]"></Skeleton>
    <Skeleton className="rounded-xl w-full min-h-[200px]"></Skeleton>
   </div>
   <div className="text">
                    <Skeleton className='w-60 h-5 mt-4'></Skeleton>
                    <Skeleton className='w-40 h-5 mt-4'></Skeleton>
                    <Skeleton className='w-30 h-5 mt-4'></Skeleton>

<div className="boxs flex gap-5 mt-5">
  <Skeleton className="w-30 h-10 rounded-lg"></Skeleton>
  <Skeleton className="w-30 h-10 rounded-lg"></Skeleton>
  <Skeleton className="w-30 h-10 rounded-lg"></Skeleton>
</div>
   </div>
   <div className="description mt-15">
  
        <Skeleton className="h-4 w-full mt-4" />
        <Skeleton className="h-4 w-full mt-4" />
        <Skeleton className="h-4 w-full mt-4" />
        <Skeleton className="h-4 w-full mt-4" />
        <Skeleton className="h-4 w-full mt-4" />
        <Skeleton className="h-70 mt-4 w-full" />
   </div>
           <Skeleton className="h-70 mt-15 w-full" />

<div className="boxs">
<div className="grid grid-cols-3 gap-5">
          <div className="box">
            <Skeleton className="h-40 mt-15 w-full" />
            <div className="text">
                 <Skeleton className='w-60 h-5 mt-4'></Skeleton>
                    <Skeleton className='w-40 h-5 mt-4'></Skeleton>
                    <Skeleton className='w-30 h-5 mt-4'></Skeleton>
            </div>
          </div>
          <div className="box">
            <Skeleton className="h-40 mt-15 w-full" />
            <div className="text">
                 <Skeleton className='w-60 h-5 mt-4'></Skeleton>
                    <Skeleton className='w-40 h-5 mt-4'></Skeleton>
                    <Skeleton className='w-30 h-5 mt-4'></Skeleton>
            </div>
          </div>
          <div className="box">
            <Skeleton className="h-40 mt-15 w-full" />
            <div className="text">
                 <Skeleton className='w-60 h-5 mt-4'></Skeleton>
                    <Skeleton className='w-40 h-5 mt-4'></Skeleton>
                    <Skeleton className='w-30 h-5 mt-4'></Skeleton>
            </div>
          </div>
</div>
</div>
  </div>
  )
}
