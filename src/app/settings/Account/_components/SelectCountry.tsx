import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { countries } from "countries-list";
import { useRef, useState } from "react";
import Fuse from "fuse.js";

export function SelectCountry({select,setSelect}:any) {
    const [suges , setSuges]:any = useState([]);
    const countr = Object.entries(countries).map(([code,country]) => ({
        locationCode:code ,
        location:country?.name,
        phoneCode:country?.phone
    }))


    const fuse = new Fuse(countr, {
  keys: ["location"], // الحقول اللي تبحث فيها
  threshold: 0.3, // كل ما يقل = دقة أعلى
});

const refer:any = useRef(null);

  return (
    <div className="mt-5">
        <h1 className="font-semibold">Location</h1>
<div className="flex items-center gap-2">
    <Select onValueChange={(e:any) => setSelect({locationCode:e?.locationCode , location:e?.location , phoneCode:e?.phoneCode})} value={select?.locationCode}>
      <SelectTrigger className="w-20 py-5">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="!w-20">
        <SelectGroup>
          {countr?.map((e) => (
              <SelectItem key={e?.locationCode}  value={e?.locationCode}>
                        {/* <span className={`fi fi-${e?.code.toLowerCase()}`}></span> */}
                        {e?.locationCode}
                        </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
        <div className="relative">
  <Input
    onChange={(e) => {
      setSuges(fuse.search(e.target.value))
      
    }}
    type="text"
    ref={refer}
    placeholder="search for countries"
    className="w-full py-5 my-4"
  />

  {suges?.length > 0 && (
    <div className="absolute top-[80%] mt-2 left-0 w-full bg-white border border-gray-300 flex flex-col p-3 rounded-md shadow-md z-50">
      {suges.map((e:any) => (
        <span
          key={e.item.locationCode}
         onClick={() => {
  setSelect(e.item);

  if (refer?.current) {
    refer.current.value = e?.item?.location;
  }

  setSuges([]);
}}
          className="cursor-pointer hover:bg-slate-100 rounded-md p-2 transition-all"
        >
          <span className={`fi fi-${e.item.locationCode.toLowerCase()} mr-2`} />
          {e.item.location}
        </span>
      ))}
    </div>
  )}
</div>
</div>
    </div>
  )
}
