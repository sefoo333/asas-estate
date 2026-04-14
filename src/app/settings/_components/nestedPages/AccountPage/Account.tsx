import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Crubchumb from '../../crubchumb'
import HeadS from '../../HeadS'
function Account() {
  return (
     <div className="page mt-9 px-7 py-7 basis-[100%]">
          <Crubchumb />
            <HeadS title="Account Settings" />
            <div className="window p-8 mt-10 rounded-lg border border-gray-200 w-full ">
              <div className="image flex gap-5 items-center">
                <Image className="image w-20 h-20 rounded-full bg-red-500" src={"/Hero.jpg"} alt='' width={100} height={100} />
               <div className="edit">
                 <div className="buttons flex items-center">
                  <Button size={"lg"}>
Change Image
                  </Button>
                  <Button size={"lg"} variant={"outline"} className='ml-2'>
Remove Image
                  </Button>
                </div>
                <h1 className='text-sm mt-3 text-gray-600'>We accept JPG, PNG and GIFS under 2MB</h1>
               </div>
              </div>
                <form action="" className='flex gap-6 items-center mt-8 w-full'>
                 <div className="first w-full">
                   <label htmlFor="first" className='text-sm font-semibold'>First Name</label>
                  <input type="text" id='first' placeholder='Enter your FirstName' className='w-full mt-2 p-3 rounded-md border border-gray-300 outline-0' />
                 </div>
                 <div className="last w-full">
                   <label htmlFor="last" className='text-sm font-semibold'>Last Name</label>
                  <input type="text" id='last' placeholder='Enter your LastName' className='w-full mt-2 p-3 rounded-md border border-gray-300 outline-0' />
                 </div>
                </form>

                <h1 className='pb-4 border-gray-300 border-b mt-13 text-2xl font-bold'>Account Security</h1>
            <form action="" className='mt-6'>
               <div className="first w-1/2">
                   <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                  <input type="text" id='email' placeholder='Enter your email' className='w-full mt-2 p-3 text-sm rounded-md border border-gray-300 outline-0' />
                 </div>
               <div className="first w-1/2 mt-8">
                   <label htmlFor="email" className='text-sm font-semibold'>Phone</label>
                <div className="box relative h-full ">
                     <div className="country_code flex items-center justify-center  p-2  px-3  text-sm  bg-white border-r border-gray-300 left-1 absolute mr-5 top-3">
                    +20
                   </div>
                  <input type="text" id='email' placeholder='Enter your phone' className='pl-15 w-full mt-2 p-3 text-sm rounded-md border border-gray-300 outline-0' />
                </div>
                 </div>
                  <div className="first w-1/2 mt-8">
                   <label htmlFor="password" className='text-sm font-semibold'>Password</label>
                  <input type="text" id='password' placeholder='Enter your password' className='w-full mt-2 p-3 text-sm rounded-md border border-gray-300 outline-0' />
                 </div>
            </form>

           <div className="delete flex justify-between items-center mt-10">
          <div className="text">
              <h1 className='text-red-700 text-lg font-semibold'>
              Delete Account
            </h1>
            <h2 className='text-[13px] text-gray-600 font-medium'>Danger ! , after you click the button , the data will be deleted</h2>
          </div>
             <Button variant={"secondary"} className='mt-8 cursor-pointer' size={"lg"}>
Delete Your Account
            </Button>
           </div>
            </div>
        </div>
  )
}

export default Account