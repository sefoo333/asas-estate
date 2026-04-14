import React from 'react'
import { RiVisaLine } from 'react-icons/ri'
import { IoIosMore } from "react-icons/io";

function Payment_box() {
  return (
  <div className="payment flex gap-5 items-center justify-between p-5 border border-gray-200 rounded-lg ">
<div className="informations flex gap-8 items-center">
    <div className="icon px-5 py-2 border border-gray-200 rounded-xl">
    <RiVisaLine size={40} color='#02138d' />
</div>
<div className="text">
    <h1 className='text-lg font-semibold '>***** **** *123</h1>
    <h2 className='text-gray-600 text-sm'>Expires on 09/25</h2>
</div>
</div>
<div className="more border border-gray-200 bg-gray-100 rounded-xl flex items-center justify-center px-4 py-3 cursor-pointer duration-500 hover:bg-gray-200 text-xl">
    <span><IoIosMore /></span>
</div>
                    </div>  )
}

export default Payment_box