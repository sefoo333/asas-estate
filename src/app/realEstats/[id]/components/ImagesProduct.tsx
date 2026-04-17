import { Camera } from 'lucide-react'
import Image from 'next/image'
import React, {  useState } from 'react'
import { ImagesCar } from './ImagesCar';
import { IoClose } from 'react-icons/io5';

function ImagesProduct({ Productdata }: any) {
  const [open, setOpen] = useState(false);

  return (
<>
 <div className="images gap-5 relative  grid grid-cols-3 items-center  ">
      <div className="flex flex-col gap-4 h-fit">
                    <Image src={Productdata?.images[0]} alt='' width={500}  height={500}                     className="rounded-2xl w-full h-1/2 object-cover" />
                    <Image src={Productdata?.images[1]} alt='' width={500}  height={500}                     className="rounded-2xl w-full h-1/2 object-cover" />
                </div>
      <div className="col-span-2 h-full">
                <Image src={Productdata?.images[2]} alt='' width={500}  height={500}           className="rounded-2xl w-full h-full object-cover" />
</div>
<div onClick={() => setOpen((e) => !e)} className="button border px-4  border-gray-300 cursor-pointer transition hover:bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-600 rounded-xl p-2 flex items-center bg-white  justify-center absolute right-3 bottom-3 ">
    <Camera size={18} className='inline mr-2' />
    <span>{Productdata?.images?.length}</span>
</div>


            </div>
{open && (
  <div
    className='fixed flex items-center justify-center left-0 top-0 w-full h-full bg-black/20 z-99'
    onClick={() => setOpen(false)}
  >
    <IoClose size={35} className='text-black absolute right-5 top-5' />
    
    <div onClick={(e) => e.stopPropagation()}>
      <ImagesCar images={Productdata?.images} />
    </div>
  </div>
)}
</>
              )
}

export default ImagesProduct