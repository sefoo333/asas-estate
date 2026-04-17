import { Element } from 'react-scroll'
import ImagesProduct from '../ImagesProduct'
import { TbMoneybag } from 'react-icons/tb'
import { GoLocation } from 'react-icons/go'
import { Bath, Bed } from 'lucide-react'
import { CiRuler } from 'react-icons/ci'

import { RealEstate } from '@/types/realEstate'

function Main({Productdata}:{Productdata:RealEstate | any}) {

    
 const currencies = [{
    label:"USD",
    value:"$"
  } , {
    label:"SUR",
    value:"sur"
  }   , {
    label:"EGP",
    value:"EG"
  }]


  return (
        <>
          <ImagesProduct Productdata={Productdata} />
               <div className="flex flex-col gap-3 mt-5 ">
             
                                                                <h1 className='font-semibold text-2xl'>{Productdata?.title }</h1>
<div className="price flex items-center gap-3">
    <TbMoneybag size={22} color='#7c9a76' />
    <h1 className='text-[18px]'>{Productdata?.price || 0} {Productdata?.TransactionType === "Rent" && "Month/"}{currencies?.find((a) => a.label === Productdata?.currency)?.value}</h1>
</div>
<div className="price flex items-center gap-3">
    <GoLocation size={21} color='#d46060' />
    <h1 className='text-[18px]'>{Productdata?.location}</h1>
</div>

<div className="property flex gap-3">
<div className="box border border-gray-200 dark:border-gray-600 rounded-xl py-1.5 px-4 flex gap-2 items-center">
         <Bed size={20} />   <span className="">{Productdata?.beds || 0} Bedroom</span>
</div>
<div className="box border border-gray-200 dark:border-gray-600 rounded-xl py-1.5 px-4 flex gap-2 items-center">
         <Bath size={20} />   <span className="">{Productdata?.Baths || 0} Bathroom</span>
</div>
<div className="box border border-gray-200 dark:border-gray-600 rounded-xl py-1.5 px-4 flex gap-2 items-center">
         <CiRuler size={21} />   <span className="">{Productdata?.Sqft || 0} <span className='font-medium'>m<sup>2</sup></span></span>
</div>
</div>
               </div>
          
        </>
  
                            
           )
}

export default Main