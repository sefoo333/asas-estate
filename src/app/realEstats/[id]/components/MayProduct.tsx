import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { TbMoneybag } from 'react-icons/tb'

function MayProduct({product}:any) {
  return (
                     <Link href={`/realEstats/${product?.id}`}>
                 <div className="box flex gap-4 mb-6 items-center justify-between">
 <div className="first flex gap-4">
                            <Image src={product?.images[0] || "/Heroo.webp"} alt='' width={100} height={100} className='w-15 h-15 rounded-xl' />
                        <div className="text">
                            <h1 className='text-md font-semibold'>{product?.title}</h1>
                            <h2 className='text-[#5a5a5a] text-sm flex items-center'><TbMoneybag size={16}  className='mr-1' /> ${product?.price}</h2>
                        </div>
                </div>      
                                <div className="second cursor-pointer">
                                    <MdKeyboardArrowRight size={19} color='#4d4d4d' />
                                </div>
                                    </div>
                        </Link>
            
            )
}

export default MayProduct