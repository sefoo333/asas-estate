import React from 'react'
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



function SelectEstat({Title ="realEstat",data = ["Apartment" , "villa" , "Chalet" , "House" , "Penthouse"],placeholder = "select estat" , setSelectHero , setData}:general) {
  return (


     <Select onValueChange={(e) => {
            setSelectHero?.(e);
            setData?.((prevData:any) => ({ ...prevData, estateType: e }));
          }}>
      <SelectTrigger className="w-full py-5 border !border-[#e5e5e5] shadow-sm !bg-white">
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