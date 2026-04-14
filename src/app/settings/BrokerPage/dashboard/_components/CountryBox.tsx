import { ArrowUp } from 'lucide-react'
import React from 'react'
import "flag-icons/css/flag-icons.min.css";
import { useUserStore } from '@/store/store';
function CountryBox({data}:any) {
  const user = useUserStore((state) => state?.user)
  
  return (
 <div className="country mt-4 flex justify-between">
          <div className="first flex items-center gap-2">
            {/* <Image src={"/pal.png"} alt="" width={30} height={30} className="" /> */}
            
<span className={`fi fi-${data?.locationCode.toLowerCase()} rounded-full fis text-3xl`}></span>
            <h1>{data?.location}</h1>

          </div>
          <div  className="money flex items-center gap-1">
            <span  className="text-md">{data?.leads}</span>
            <ArrowUp color={"green"} size={19} />
          </div>
        </div>
          )
}

export default CountryBox