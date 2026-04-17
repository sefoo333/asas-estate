"use client"

import ChangeImage from '@/app/settings/Account/_components/ChangeImage';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Mona_Sans } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
const geistSans = Mona_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200","300", "400", "500", "600", "700", "800"],
});


const sign = async (data:object) => {
const test = await fetch(`/api/authUser/register` , {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({...data,provider:"google"})
})



return test.json()
}

function page() {

      const [animate, setAnimate] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimate(true), 1500); // تأخير
    const t2 = setTimeout(() => setHide(true), 2500);    // اختفاء

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);



        const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();


    const extractData = useSession();
        const mutation = useMutation({
        mutationFn: sign,
        onSuccess: async (data) => {
         await extractData?.update({isNewUser:false})
            toast.success("account has been created !");
await window.open("/","_self")
            
        }
    })

    const [image,setImage] = useState({image:extractData?.data?.user?.image});

    useEffect(() => {
  
setImage({image:extractData?.data?.user?.image})
    },[extractData?.data])

    // const signout = async () => {
    //   await signOut()
    // }

  return (
    <div>
         {/* <div
      className={`text-2xl z-999 fixed left-0 top-0 animate-fade-in bg-slate-50 w-full h-full flex justify-center items-center font-semibold
      ${animate ? "animate-slide-up-fade" : ""}
      `}
    >
      <h1>Let's start complete profile 😀</h1>
    </div> */}
{/* <div onClick={() => {
signout()
}}>logout</div> */}
   <div className={`${geistSans.className} page flex items-center flex-row-reverse gap-20 h-screen w-full overflow-hidden`}>
            <div className="image h-full col-span-1 basis-[50%]  max-md:hidden relative">
            <Image src={"/complete.jpg"} alt='login' width={1200} height={1200} className='w-full brightness-70 h-full object-cover'/>
        {/* <div className="window w-[90%] absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/20 text-center backdrop-blur-3xl rounded-xl p-5 text-white">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam porro debitis accusamus recusandae praesentium ad autem eveniet aliquid ea voluptates! Eum facilis perferendis maxime, doloremque enim voluptates tenetur neque perspiciatis.</p>
            </div> */}
        {/* <div className="text absolute bottom-15 text-white">
            <h1 className='text-2xl font-semibold'>Find your sweet Home</h1>
            <h3 className='text-sm'>Best houses for your chooses and more gfea</h3>
            </div> */}
        </div>
            <div className="inputs flex justify-center max-md:basis-full  basis-[60%] ">
<div className="flex justify-center flex-col w-[60%] max-md:w-full max-md:px-7 max-md:py-5 ">

<Image src={"/logo-3.png"} alt='logo' width={100} height={100} className='mb-5' />
<div className="title text-start">
    <h1 className=' text-4xl max-md:text-3xl mb-1'>complete account </h1>
    <p className='text-gray-500 '>complete your account details to countinue !</p>
</div>


<form action="" onSubmit={handleSubmit((data) => mutation.mutate({...data,image:image?.image || extractData?.data?.user?.image,email:extractData.data?.user?.email,provider:"google", userName:data?.userName || extractData.data?.user?.name}))} className='mt-6'>

            <ChangeImage setData={setImage} data={image} onboarding={true} image={"/Heroo.webp"} broker={false} />
<div className="userName">
        <Label className='text-sm font-medium'>UserName</Label>
        <input {...register("userName" , {required:"UserName is requried"})} type="text" name='userName' id='userName' placeholder='Enter your userName' className='w-full mt-2 mb-4 px-3 py-3 border border-gray-300 rounded-md outline-none text-sm focus:border-[#333446] transition-all duration-200 '/>
    </div>
    <div className="password">
        <Label  className='text-sm font-medium'>Password</Label>
        <div className="input relative px-3 py-3 w-full mt-2 mb-4  border border-gray-300 rounded-md outline-none text-sm group-focus:border-[#333446] transition-all duration-200">
                <input type='password' {...register("password" , {required:"Password is requried"})} name='password' id='password' placeholder='Enter your password' className='w-full group outline-none' />
            <Eye className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer' />
        </div>
        </div>
        <input type='submit' value={"Continue"} className='w-full bg-primary h-13 font-semibold cursor-pointer transition-all hover:bg-primary/9  0  rounded-full text-white mt-8' />
</form>




</div>


            </div>
    </div>

    </div>
  )
}

export default page