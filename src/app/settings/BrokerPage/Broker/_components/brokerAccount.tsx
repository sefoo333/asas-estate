import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import Languages from './Languages'

function BrokerAccount({setData,data}:any) {
  return (
<>
            <form action="" className='mt-6'>
           
                   <div className="first md:w-1/2 mt-10">
                   <label htmlFor="location" className='text-sm font-semibold'>Location</label>
                  <input defaultValue={data?.location} onChange={(e) => setData((x:object) => ({...x , location:e.target.value}))} type="text" id='location' placeholder='Enter your Location' className='w-full mt-2 p-3 text-sm rounded-md border border-gray-300 outline-0' />
                 </div>
               <div className="first md:w-1/2 mt-8">
                   <label htmlFor="phone" className='text-sm font-semibold'>Phone</label>
                <div className="box relative h-full ">
                     <div className="country_code flex items-center justify-center  p-2  px-3  text-sm   border-r border-gray-300 left-1 absolute mr-5 top-3">
                    +20
                   </div>
                  <input  defaultValue={data?.phone} type="text" id='phone' onChange={(x) => setData((e:any) => ({...e , phone:x.target.value}))} placeholder='Enter your phone' className='pl-15 w-full mt-2 p-3 text-sm rounded-md border border-gray-300 outline-0' />
                </div>
                <div className='mt-10'>
<Languages setData={setData} data={data} />
                </div>
                 </div>
                   <div className="first md:w-1/2 mt-10">
                   <label htmlFor="bio" className='text-sm font-semibold'>Bio</label>
                  <Textarea  defaultValue={data?.bio} onChange={(e) => setData((x:object) => ({...x , bio:e.target.value}))}  id='bio' placeholder='Enter your bio' className='w-full mt-2 p-3 h-40 text-sm rounded-md border border-gray-300 outline-0' />
                 </div>

            </form>
</>

)
}

export default BrokerAccount