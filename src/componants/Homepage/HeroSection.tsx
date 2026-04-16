import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import HeroInputSearch from "@/componants/InputSearch/HeroInputSearch"

export function CarouselDemo() {
  return (
    <div className="parent flex justify-center max-md:p-0">
      <div className="landing w-full container before:rounded-3xl max-md:before:rounded-none flex items-center justify-center relative p-14 max-md:p-0 h-[550px] max-md:h-[280px] ">
        <Image priority  src={"/Heroo.webp"} alt="" fill className=" object-cover rounded-3xl w-full h-full fixed z-[-1] max-md:rounded-none" />
   <div className="relative z-9 w-full flex flex-col gap-20 max-md:gap-10 items-center">
    <div className="text font-bold text-center mt-10 max-md:mt-0 text-white">
      <h1 className="text-6xl animate-fade-in max-md:text-3xl max-md:leading-9 max-md:text-nowrap leading-18">
      Find your home <br/>Anywhere in egypt
     </h1>
     {/* <p className="font-medium text-[13px]">Discover all properties you need</p> */}
     {/* <p className="font-medium text-[20px] mt-3">houses , villa , commercial , real estate , more</p> */}
   </div>
   <HeroInputSearch />
   </div>
      </div>
    </div>
  )
}


