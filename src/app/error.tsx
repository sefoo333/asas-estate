"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'

function error({error ,reset }:any) {
  return (
    <div className="parent absolute w-full h-full z-9 bg-white top-0 flex justify-center items-center text-center flex-col">
            <Image src={"/notFound.jpg"} alt='' width={400} height={400} className='object-contain' />
                <h1 className='font-bold text-3xl'> Error Data 404</h1>
                <h2 className=' text-lg'>Something went wrong , try again</h2>
                <Button variant={"default"} className='mt-4 font-semibold' size={"lg"} onClick={() => reset}>
Try Again
                </Button>
        </div>
  )
}

export default error