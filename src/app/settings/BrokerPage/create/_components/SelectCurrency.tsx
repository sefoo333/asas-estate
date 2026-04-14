"use client"
import Image from 'next/image'
import  { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import "flag-icons/css/flag-icons.min.css";

function SelectCurrency({showList , setShowList,index , setIndex , currencies}:{showList:boolean , setShowList:Function,index:number , setIndex:Function , currencies:any[]}) {

   

  return (
      <div className="country_code  gap-2 flex items-center w-27 justify-between  p-2  px-3  text-sm  bg-white border-r border-gray-300 left-1 absolute mr-5 top-3">
        <div className="value flex items-center gap-1 cursor-pointer" onClick={() => setShowList(!showList)}>
           <span className={`fi fi-${currencies[index].value} rounded-sm`}></span>
                                    <span className='text-sm'>{currencies[index].label}</span>
        </div>
        <IoIosArrowDown onClick={() => setShowList(!showList)} />

                           <div className={`list absolute flex flex-col gap-1 -bottom-30 z-9 transition-all left-1/2 -translate-x-1/2 w-full bg-white rounded-md shadow-lg p-2 ${showList ? "block" : "hidden"}`}>

                            {currencies.map((e,a) => (
                                <div className="item flex cursor-pointer transiton-all hover:bg-slate-50 p-1  items-center gap-2" onClick={() => {
                                    setIndex(a)
                                    setShowList(false)
                                }}>
                                    <span className={`fi fi-${e.value} rounded-sm`}></span>
                                    <span className='text-sm'>{e.label}</span>
                                </div>
                            ))}
                           </div>
                           </div>
          )
}

export default SelectCurrency