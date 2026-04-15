"use client"
import React from 'react'
import Crubchumb from '../_components/crubchumb'
import HeadS from '../_components/HeadS'
import dynamic from 'next/dynamic';
const Themer = dynamic(() => import("./_components/Theme/Theme"), {
  ssr: false,
});
const Languager = dynamic(() => import("./_components/Language/Language"), {
  ssr: false,
});

function page() {
  return (
    <div className='px-7 py-7 md:basis-[100%]'>
          <Crubchumb />
                <HeadS title="Public" />

                <div className="options mt-10 max-md:w-full">
               <Themer />
               <Languager />
                </div>
    </div>
  )
}

export default page