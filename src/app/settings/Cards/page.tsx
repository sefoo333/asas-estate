import React from 'react'
import Crubchumb from '../_components/crubchumb'
import HeadS from '../_components/HeadS'
import { RiVisaLine } from "react-icons/ri";
import Payment_box from '../_components/Payment_box';
import { Button } from '@/components/ui/button';

function Cards() {
  return (
    <div className="page px-7 py-7 basis-[100%]">
        <Crubchumb />
            <HeadS title="Cards Settings" />
            <div className="window p-8 mt-10 rounded-lg border border-gray-200 w-full ">
                <div className="payments grid grid-cols-2 gap-8">
                  <Payment_box />
                  <Payment_box />
                  <Payment_box />
                  <Payment_box />
                </div>
                <div className="add mt-10 justify-end flex">
                    <Button className='px-5 py-6 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>Add New Card</Button>
                </div>
            </div>
    </div>
  )
}

export default Cards