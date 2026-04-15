import HeadS from '@/app/settings/_components/HeadS'
import { Input } from '@/components/ui/input'
import React from 'react'

function Languages({setData,data}:any) {
  return (
 <div className=''>
 <h1 className="text-sm font-semibold" >Languages</h1>
    <div className='relative mt-2 h-fit'>
        <div className="boxes absolute left-2 top-1/2 flex gap-2 -translate-y-1/2">
{data?.languages?.map((e:any) => (
            <div key={e}  className='py-1 px-3 text-[13px] rounded-full bg-white border border-gray-300'>{e}</div>
))}
        </div>
        <Input className={`!py-5 !pl-${data?.languages?.length * 20}`} placeholder='write your languages' type='text' onKeyDown={(x:any) => {
            if (x.target.value !== "" && x.code === "Enter"){
                setData((e:any) => ({...e, languages:[...e?.languages || [] , x.target.value]}));
                x.target.value = ""
            }
            console.log(x.code)
            console.log(data)
        }}  />
    </div>
 </div>
  )
}

export default Languages