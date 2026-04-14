import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

export function ImagesCar({images}:any) {
  return (
    <Carousel className="w-full max-w-[16rem] sm:max-w-2xl relative !z-999">
      <CarouselContent>
     {images ?   (
<>
 {images.map((e:any,a:number) => (
          <CarouselItem key={a}>
            <div className="p-1">
                  <Image src={e} alt="Image" width={400} height={400} className="h-full w-full rounded-md object-cover" />
            </div>
          </CarouselItem>
        ))}
</>
     ) : <Skeleton className="w-[800px] h-[400px] rounded-md"></Skeleton>}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
