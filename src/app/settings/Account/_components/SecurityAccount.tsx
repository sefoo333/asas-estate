"use client"
import React, { useEffect, useState } from 'react'
import { SelectCountry } from './SelectCountry'
import { Input } from '@/components/ui/input'
import { SelectCountryT } from './SelectCountryT'
import { useUserStore } from '@/store/store'

function SecurityAccount({setData,select,setSelect}:any) {
  const user = useUserStore((state) => state.user)
    
  return (
<>
   <h1 className='pb-4 border-gray-300 dark:!border-gray-600 border-b mt-13 text-2xl font-bold'>Account Security</h1>
            <form action="" className='mt-6 max-md:w-full'>
               <div className="first md:w-1/2">
                   <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                  <input onChange={(x) => setData((e:any) => ({...e,email:x.target.value}))} defaultValue={user?.email} type="text" id='email' placeholder='Enter your email' className='w-full mt-2 p-3 text-sm rounded-md border border-gray-300 dark:!border-gray-600 outline-0' />
                 </div>
               <div className="first md:w-1/2 mt-8">
                   <label htmlFor="email" className='text-sm font-semibold'>Phone</label>
                <div className="box relative h-full ">
                    <input type='text' onChange={(x) => setData((e:any) => ({...e , phoneCode:x?.target.value}))} defaultValue={user?.phoneCode} className='country_code flex items-center justify-center w-[50px] h-fit  !outline-none  !shadonw-none  p-2  px-3  text-sm   !border-r !border-r-gray-300 dark:bg-gray-800 dark:!border-gray-600 left-1 absolute mr-5 top-3' />
                  <input type="text" id='phone' onChange={(x) => setData((e:any) => ({...e , phone:x.target.value}))} defaultValue={user?.phone} placeholder='Enter your phone' className='pl-15 w-full mt-2 p-3 text-sm rounded-md border border-gray-300 dark:bg-gray-800 dark:!border-gray-600 outline-0' />
                </div>
                <div className="box relative h-full mt-5 ">
<SelectCountryT setSelect={setSelect} />
                </div>

                 </div>
                  <div className="first md:w-1/2 mt-8">
                   <label htmlFor="password" className='text-sm font-semibold'>Password</label>
                  <input onChange={(x) => setData((e:any) => ({...e , password:x.target.value}))} type="text" id='password' placeholder='Enter your password' className='w-full mt-2 p-3 text-sm rounded-md border border-gray-300 dark:bg-gray-800 dark:!border-gray-600 outline-0' />
                 </div>
            </form>
</>

)
}

export default SecurityAccount