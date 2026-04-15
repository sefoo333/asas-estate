"use client"

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc'
import { Mona_Sans } from 'next/font/google';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from "next-auth/react"
import { useUserStore } from '@/store/store';

const geistSans = Mona_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200","300", "400", "500", "600", "700", "800"],
});



function page() {
      const {data:session,status , update} = useSession();

    const sign = async (data:any) => {
    const test = await fetch(`/api/authUser/${!data?.userName && data?.provider !== "" && status === "authenticated" ? "register" : "login"}` , {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({...data , Prvoided:session?.Provided})
    })
    
    
    
    
    return test.json()
    }

const user = useUserStore((state) => state?.user);
    const mutation = useMutation({
        mutationFn: sign,
        onSuccess: (data) => {
            router.replace("/")
            
        }
    })

      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const router = useRouter();

  useEffect(() => {
if (user?.id){
router.replace("/")    
}
  },[user,session,status])


//   useEffect(() => {
// if (user){
//     mutation.mutate(() => ({userName:session?.user?.name ,provider:"google" , image:session?.user?.image , email:session?.user?.email}))
// }
// },[session?.user])

  const [switcher,setSwitch] = useState(true);

  useEffect(() => {
    
  },[session])

  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      if (session.isNewUser) {
        router.replace("/login/onboarding");
      } else {
mutation.mutate({
  userName: session?.user?.name,
  provider: "google",
  image: session?.user?.image,
  email: session?.user?.email,
});


        // router.replace("/");
        // window.open("/","_self")
      }
    }
  }, [session, status]);
  return (
 <>
 {/* <div onClick={() => {
signout()
}}>logout</div> */}
    <div className={`${geistSans.className} page flex items-center flex-row-reverse gap-20 h-screen w-full overflow-hidden`}>
    
            <div className="image h-full col-span-1 basis-[50%]  max-md:hidden relative">
            <Image src={"/cityAbove.jpg"} alt='login' width={1200} height={1200} className='w-full brightness-70 h-full object-cover'/>
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
    <h1 className=' text-4xl max-md:text-3xl mb-1'>Welcome Back! </h1>
    <p className='text-gray-500 '>Sign in your account !</p>
</div>

<div className="switch flex gap-1 p-1 w-full border font-medium cursor-pointer border-gray-300 rounded-full mt-6  ">
    <span className={`w-1/2  rounded-full p-2.5 text-gray-700 text-center transition-all duration-500 ${switcher && "bg-primary text-white"}`} onClick={() => setSwitch(true)}>Log In</span>
    <span  className={`w-1/2  rounded-full p-2.5                     text-gray-700 text-center transition-all duration-500 ${!switcher && "bg-primary text-white"}`} onClick={() => setSwitch(false)}>Register</span>
</div>

<form action="" onSubmit={handleSubmit((data) => mutation.mutate(data))} className='mt-6'>
   {!switcher &&  <div className="userName">
        <Label className='text-sm font-medium'>UserName</Label>
        <input {...register("userName" , {required:"UserName is requried"})} type="text" name='userName' id='userName' placeholder='Enter your userName' className='w-full mt-2 mb-4 px-3 py-3 border border-gray-300 rounded-md outline-none text-sm focus:border-[#333446] transition-all duration-200 '/>
    </div>}
    <div className="email">
        <Label className='text-sm font-medium'>Email</Label>
        <input {...register("email" , {required:"Email is requried"})} type="email" name='email' id='email' placeholder='Enter your email' className='w-full mt-2 mb-4 px-3 py-3 border border-gray-300 rounded-md outline-none text-sm focus:border-[#333446] transition-all duration-200 '/>
    </div>
    <div className="password">
        <Label  className='text-sm font-medium'>Password</Label>
        <div className="input relative px-3 py-3 w-full mt-2 mb-4  border border-gray-300 rounded-md outline-none text-sm group-focus:border-[#333446] transition-all duration-200">
                <input type='password' {...register("password" , {required:"Password is requried"})} name='password' id='password' placeholder='Enter your password' className='w-full group outline-none' />
            <Eye className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer' />
        </div>
        </div>

        <div className="links flex justify-between items-center mt-4">
            <div className="remember flex items-center">
                <Checkbox className='w-5 h-5 cursor-pointer' />
                <Label className='text-sm !font-medium text-gray-800 ml-2'>Remember me</Label>
            </div>
            <a href="#" className='text-sm text-gray-500'>Forget your password ?</a>
        </div>
        <input type='submit' value={!switcher ? "Register" : "Login"} className='w-full bg-primary h-13 font-semibold cursor-pointer transition-all hover:bg-primary/9  0  rounded-full text-white mt-8' />
</form>

<div className="or flex items-center gap-3 mt-10">
    <span className="h-px flex-1 bg-gray-300"></span>
    <span className="shrink-0 text-[#8a8a8a] px-4 ">OR</span>
    <span className="h-px flex-1 bg-gray-300"></span>
</div>

<div className="buttons gap-4 mt-4">
    <button onClick={() => signIn("google").then((e) => e?.ok )} className='w-full justify-center rounded-full mt-6 bg-[#f6f5f8] px-3 border border-gray-200 text-gray-800 py-3.5 md:text-lg  cursor-pointer hover:bg-[#e0e0e0] transition-all duration-200 font-semibold flex items-center  gap-5'>
        <FcGoogle size={30} />
       <span className='text-center'> Continue with Google</span>
    </button>
    <button onClick={() => signIn("facebook").then((e) => e?.ok )} className='w-full justify-center bg-[#3a5187] rounded-full mt-6 text-white px-3 border border-gray-200  py-3.5 md:text-lg  cursor-pointer hover:bg-[#e0e0e0] transition-all duration-200 font-semibold flex items-center  gap-5'>
        <FaFacebook size={30} />
       <span className=''> Continue with Facebook</span>
    </button>
</div> 

</div>


            </div>
    </div>
 </>
  )
}

export default page


/*
<div
    className={` w-[45%] max-md:w-[85%] transition-all duration-700 ease-in-out 
   mx-auto items-center`}
  >
                <div className="head mb-3 text-center">
                    <h1 className='font-bold text-4xl max-md:text-nowrap max-md:text-3xl'>Login your account</h1>
                    <h2 className='text-[16px] max-md:text-[15px] mt-1.5 text-[#8a8a8a]'>sign in to continue to chat with friends and more</h2>
                </div>
                <form action="" method="post" className='mt-6 pb-10 '>
    
    
    
    
                   
                    <div className="email">
                        <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                        <input {...register("email" , {required:"Email is requried"})} type="email" name='email' id='email' placeholder='Enter your email' className='w-full mt-2 mb-4 px-3 py-3 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#333446] transition-all duration-200'/>
                    </div>
                    
                    
                    <div className="password">
                        <label htmlFor="email" className='text-sm font-semibold'>Password</label>
                        <input {...register("password" , {required:"Password is requried"})} type="password" name='password' id='password' placeholder='Enter your password' className='w-full mt-2 mb-2 px-3 py-3 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#333446] transition-all duration-200'/>
                    </div>
                    <a href="#" className='text-[#666666] font-medium text-sm'>Forget your password ?</a>
                  
                    {/* <input type="submit" value="Sign In" className='w-full mt-5 bg-[#333446] text-white py-3 rounded-xl cursor-pointer hover:bg-[#2c2d36] transition-all duration-200 font-semibold'/> 
                    
                    <input type="submit" value="Log In" className='w-full mt-6 bg-[#4673f4] text-white py-3.5 text-lg rounded-full cursor-pointer hover:bg-[#2c2d36] transition-all duration-200 font-semibold'/>
                </form>
                <span className="flex items-center">
      <span className="h-px flex-1 bg-gray-300"></span>
    
      <span className="shrink-0 text-[#8a8a8a] px-4 ">OR</span>
    
      <span className="h-px flex-1 bg-gray-300"></span>
    </span>
    
                <div className="auth mt-6">
                    <div className="button mt-4 flex bg-[#f6f5f8] gap-3 cursor-pointer duration-500 hover:shadow font-semibold px-4   w-full rounded-full py-4 items-center justify-center ">
                           <FcGoogle size={30} />
                           <h1 className='text-md '>Continue with google</h1>
                    </div>
                </div>
                <h2 onClick={() => {
                   
                }} className='text-center max-md:text-sm mt-5 text-[#8a8a8a]'>Don't have an account ? <a href="#" className='font-bold text-[#4673f4] ' >Sign Up</a></h2>
            </div>

*/