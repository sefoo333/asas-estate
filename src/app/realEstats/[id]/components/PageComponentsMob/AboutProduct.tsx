import { useMemo } from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { IoMdBuild } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { LuBath, LuBedDouble } from "react-icons/lu";
import { RxDimensions } from "react-icons/rx";

function AboutProduct({Productdata}:any) {
    
const isTodayOrNot = useMemo(() => {
  if (!Productdata?.createdAt) return "";
  const shared = new Date().getDate() - new Date(Productdata.createdAt).getDate();
  return shared === 0 ? "Today" : `${shared} days ago`;
}, [Productdata]);

    
        const data = [
            {name:"Building type" , value:Productdata?.type.startsWith("b_") ? Productdata?.type.substring(2) : Productdata?.type, icon:BiBuildingHouse},
            {name:"Building Status" , value:"in prograss" , icon:IoMdBuild},
            {name:"Baths" , value:Productdata?.Baths || "N/A", icon:LuBath},
            {name:"Beds" , value:Productdata?.beds || "N/A", icon:LuBedDouble},
            {name:"Area" , value:`${Productdata?.Sqft || "N/A"} sqft` , icon:RxDimensions},
    {name:"Time Shared" , value:`${isTodayOrNot}` , icon:IoTimeOutline},
        ]

  return (
  <div className="about_estate mt-15  bg-white rounded-xl dark:!bg-gray-800  ">
                <h1 className='font-semibold'>
                    About Property</h1>
                                                            <div className="features grid grid-cols-1 mt-4">
                                                                {data.map((e:any , a:number) => (
                                                                    <div className={`box flex gap-2 justify-between items-center ${a !== data.length -1 ? "border-b border-gray-300/40" : ""}`} key={a}>
                                                                        <div className="title flex items-center py-5">
                                                                        <e.icon size={22} className='inline mr-3' />
                                                                        <h1>{e.name}</h1>
                                                                    </div>
                                                                    <div className="flex justify-start basis-[55%] ">
                                                                        <h2 className='font-semibold'>{e.value}</h2>
                                                                    </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                          )
}

export default AboutProduct