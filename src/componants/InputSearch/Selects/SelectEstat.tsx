import React, { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { general } from './Types'



function SelectEstat({Title ="realEstat",openar,setOpener,data = ["Apartment" , "villa" , "Chalet" , "House" , "Penthouse"],placeholder = "select estat" , setSelectHero , setData}:general) {

  return (


     <Select  onValueChange={(e) => {
            setSelectHero?.(e);
            setData?.((prevData:any) => ({ ...prevData, estateType: e }));
          }}>
      <SelectTrigger className="w-full py-5 border !border-[#e5e5e5] shadow-sm !bg-white dark:!bg-gray-800  dark:!border-gray-600">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{Title}</SelectLabel>
       {data.map((e) => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
       ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectEstat