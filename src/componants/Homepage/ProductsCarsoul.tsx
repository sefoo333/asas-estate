import React, { useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Product from '../Product';

function ProductsCarsoul({data}:any) {
    const re:any = useRef(null);
  return (
  <div className="wrapper relative xl:hidden">
               <div onClick={() => {
      re.current.scrollBy(350,0)
    }} className="icon xl:hidden absolute right-0 bg-white dark:!bg-gray-800 dark:text-gray-300  dark:!border-gray-600 top-1/2 z-9 translate-y-[-50%] flex justify-center items-center p-2 cursor-pointer border border-[#ccc]  text-black w-fit rounded-full text-xl">
      <IoIosArrowForward />
    </div>

      <div
  ref={re}
  // "categories  relative max-md:left-1/2 max-md:right-1/2 max-md:-ml-[50vw] max-md:-mr-[50vw] max-md:w-screen flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 mt-13"
  className="categories relative flex max-md:right-1/2 max-md:-ml-[50vw] max-md:-mr-[50vw] max-md:w-screen  overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 mt-13 w-full"
  style={{scrollBehavior:"smooth" , scrollbarWidth:"none"}}
>
  {data?.slice(0,4).map((e:any) => (
    <Product key={e?.id} product={e} />
  ))}
</div>
                  <div onClick={() => {
      re.current.scrollBy(-300 ,0)
    }} className="icon xl:hidden absolute left-0 bg-white dark:!bg-gray-800 dark:text-gray-300  dark:!border-gray-600 top-1/2 z-9 translate-y-[-50%] flex justify-center items-center p-2 cursor-pointer border border-[#ccc]  text-black w-fit rounded-full text-xl">
  <IoIosArrowBack />
            </div>
        </div>
          )
}

export default ProductsCarsoul