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



function SelectInBroker({Title ="realEstat",data = ["house" , "villa" , "combound"],placeholder = "select estat" , onChange}:any) {
  return (
     <Select onValueChange={(e) => onChange(e)}>
      <SelectTrigger className="w-[200px] max-md:w-full !bg-white py-5">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{Title}</SelectLabel>
       {data.map((e:any) => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
       ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectInBroker