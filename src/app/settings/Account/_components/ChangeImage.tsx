import { Button } from '@/components/ui/button'
import { GiveMeImage } from '@/lib/UploadImage';
import { useUserStore } from '@/store/store';
import { Input } from '@base-ui/react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function ChangeImage({data,setData,image , broker = false , onboarding}:{onboarding?:boolean,broker:boolean,image?:string,setData:any,data:object}) {

const user = useUserStore((state) => state.user)
const [imager,setImage] = useState("");
  const uploadImage = async (event:any) => {
      const data:{secure_url:string} = await GiveMeImage(event);
      setData((e) => ({...e,image:data.secure_url}))
  toast.success("image has been added !")
} 

useEffect(() => {
  if(image) {
    console.log("set image" , image)
    setImage(image)
  }
},[image])

  return (
 <div className={`image flex max-md:flex-col ${onboarding ? "flex-col mb-4 text-center" : ""} max-md:text-center gap-5 items-center`}>
{!broker ?                 <Image className="image w-20 h-20 rounded-full bg-transparent" src={data?.image ? data?.image : user?.image} alt='' width={100} height={100} />
:                 <Image className="image w-20 h-20 rounded-full bg-transparent" src={data?.image ? data?.image : imager} alt='' width={100} height={100} />}
               <div className="edit">
                 <div className="buttons flex items-center">
                  <Button className='relative' size={"lg"}>
<Input type='file' onChange={(e) => uploadImage(e)} className='absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer' />
Change Image
                  </Button>
                  <Button size={"lg"} variant={"outline"} className='ml-2'>
Remove Image
                  </Button>
                </div>
                <h1 className='text-sm mt-3 text-gray-600'>We accept JPG, PNG and GIFS under 2MB</h1>
               </div>
              </div>  )
}

export default ChangeImage