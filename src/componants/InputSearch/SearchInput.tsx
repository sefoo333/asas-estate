import { Input } from '@/components/ui/input'
import React from 'react'
import { FaUserLarge } from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5'

function SearchInput({className , setTextSearh , setData ,placeholder = "location",finder = true}:{finder:boolean,placeholder:string,className?:string , setTextSearh?:(text:string) => void , setData?:(data:any) => void}) {
  return (
    <div className="search relative w-full bg-white dark:!bg-gray-800  h-full dark:border-gray-600">
        <Input onChange={(e) => {
          setTextSearh?.(e.target.value);
          setData?.((prevData:any) => ({ ...prevData, location: e.target.value }));
        }} type="text" className={" pl-8 py-5 w-full max-md:!text-sm h-full  bg-white dark:bg-gray-800 dark:border dark:border-gray-600" + className} placeholder={`${placeholder}`}  />
        {finder ? <IoLocationSharp size={20} className='absolute left-2  top-1/2 translate-y-[-50%] ' color='#b5b5b5' /> : <FaUserLarge size={15} className='absolute left-2 top-1/2 translate-y-[-50%] ' color='#b5b5b5' />}
</div>
  )
}

export default SearchInput