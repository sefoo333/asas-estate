import { GoLocation } from "react-icons/go"
import { LiaBathSolid, LiaBedSolid, LiaRulerSolid } from "react-icons/lia"

function Main({Productdata}:any) {
  return (
<>
<div className="main flex justify-between items-center">
                <div className="text">
                    <h1 className='font-semibold'>{Productdata?.title}</h1>
                    <h2 className='text-sm flex items-center gap-1 dark:text-gray-300 text-[#5a5a5a] mt-1'>
                        <GoLocation size={18} className='' /> {Productdata?.location}
                     </h2>
                </div>
                <h2 className='text-primary font-semibold text-lg'>${Productdata?.price}</h2>
            </div>
            <div style={{scrollbarWidth:"none"}} className="features overflow-scroll gap-4 mt-3">
              <div className="wrapper w-full grid grid-cols-3 ">
                  <div className="box p-4 py-3 mt-5 flex items-center gap-2 border  flex-col border-gray-300   dark:!border-gray-600  rounded-lg w-fit">
                    <LiaBedSolid size={28} color='#5a5a5a' className="dark:!text-gray-300"  />
                    <span className='text-[13px] font-medium text-[#5a5a5a] dark:text-gray-300' >{Productdata?.beds} Bedroom</span>
                </div>
                <div className="box p-4 py-3 mt-5 flex items-center gap-2 border  flex-col border-gray-300  dark:!border-gray-600 rounded-lg w-fit">
                    <LiaBathSolid size={28} color='#5a5a5a' className="dark:!text-gray-300"  />
                    <span className='text-[13px] font-medium text-[#5a5a5a] dark:text-gray-300'>{Productdata?.baths} Bathroom</span>
                </div>
                <div className="box p-4 py-3 mt-5 flex items-center gap-2 border  flex-col border-gray-300  dark:!border-gray-600 rounded-lg w-fit">
                    <LiaRulerSolid size={28} color='#5a5a5a' className="dark:!text-gray-300"  />
                    <span className='text-[13px] font-medium text-[#5a5a5a] dark:text-gray-300'>{Productdata?.Sqft} Sqft</span>
                </div>
              </div>
            </div>
</>
)
}

export default Main