"use client"
import React from 'react'
import Crubchumb from '../_components/crubchumb'
import HeadS from '../_components/HeadS'
import Theme from './_components/Theme/Theme'
import Language from './_components/Language/Language'

function page() {
  return (
    <div className='px-7 py-7 md:basis-[100%]'>
          <Crubchumb />
                <HeadS title="Public" />

                <div className="options mt-10 max-md:w-full">
               <Theme />
               <Language />
                </div>
    </div>
  )
}

export default page