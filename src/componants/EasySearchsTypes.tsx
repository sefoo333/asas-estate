import { useRouter } from 'next/navigation'
import React from 'react'

function EasySearchsTypes({products , isCommercial}:any) {
    const getProductsTypes = products?.map((e:{type:string}) => e?.type).filter((v:any) => isCommercial ? v.startsWith("b_") : !v.startsWith("b_"))
    const data = [...new Set(getProductsTypes)].filter((v): v is string => !!v)
const router = useRouter();
  return (
   <div className="collections flex justify-start mt-5 gap-4">
              {data.map((e) => (
                <div onClick={() => router.push(`?estateType=${e}&search=true`)}  className=' bg-white transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-900 dark:!bg-gray-800  dark:!border-gray-600 text-sm border flex flex-col items-center gap-2 border-gray-300 rounded-xl w-25  px-4 py-3 font-semibold'  key={e}>
                  {/* <IoHomeOutline size={32} /> */}
                  {e.startsWith("b_") ? e.slice(2) : e}
                </div>
              ))}
              {/* {data.map((e) => (
                <Button onClick={() => router.push(`?estateType=${e}&search=true`)} variant={"outline"} className='rounded-full py-4 font-semibold' size={"lg"} key={e}>
                  
                  {e.startsWith("b_") ? e.slice(2) : e}
                </Button>
              ))} */}
            </div>
              )           
}

export default EasySearchsTypes