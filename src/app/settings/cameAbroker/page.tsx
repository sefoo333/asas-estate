"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image'
import {  IoMdCheckmark } from "react-icons/io";
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import Crubchumb from '../_components/crubchumb';
import HeadS from '../_components/HeadS';
import Head_create from '../BrokerPage/create/_components/Head_create';
import { useUserStore } from '@/store/store';
import ChangeImage from '../Account/_components/ChangeImage';
import { SelectCountryT } from '../Account/_components/SelectCountryT';
import Languages from '../BrokerPage/Broker/_components/Languages';
import { Kbd } from '@/components/ui/kbd';



function page() {
    const user = useUserStore((state) => state.user);
    
    const CreateBroker = async (data:any) => {
    const test = await fetch(`/api/brokers/createBroker` , {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            idUser:user?.id,
          ...data,
        })
    })
    
    
    return test.json()
    }
    const mutation = useMutation({
        mutationFn: CreateBroker,
        onSuccess: (data) => {
            toast.success("request sent !")
        },
        onError:(error) => {
          toast.error("Error creating real estate")
        }
    })

    // , , , company, , , , , languages

      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [myData,setData] = useState({image:user?.image});
  const [select,setSelect]:any = useState({});
  return (
        <div className="page px-7 max-md:px-5 py-7 basis-[100%]">
          
            <Crubchumb />
            <HeadS title='Become a broker' />
            <div className="window p-5 max-md:w-full rounded-xl border border-gray-200 bg-white mt-7 ">
{/* <Head text='create real estate' /> */}

<div className="flex flex-col  w-1/2 max-md:w-full">
<form action="" onSubmit={handleSubmit((data) => {
    mutation.mutate({...data,...myData,location:select?.location,locationCode:select?.locationCode});
})}>
{/* <h1 className='text-lg font-semibold'>Project Details</h1> */}
{/* image */}
{/* title */}
<ChangeImage  setData={setData} image={user?.image} data={myData} broker={true} />
        <div className="title mt-5  p-4 rounded-xl">
    
    <Head_create>UserName</Head_create>
    <Input className='p-5 mt-2 shadow-none' defaultValue={user?.userName} {...register("userName", { required: true })} />
</div>
        <div className="title mt-5  p-4 rounded-xl">
    
    <Head_create>Company</Head_create>
    <Input className='p-5 mt-2 shadow-none' placeholder='company' {...register("company", { required: true })} />
</div>
       {/* phone */}
        <div className="price   p-4 rounded-xl">
    
                   <label htmlFor="email" className='text-md font-semibold'>Phone</label>
                <div className="box relative h-full ">
                    <input type='text'  {...register("phoneCode")} defaultValue={select?.phoneCode} className='country_code flex items-center justify-center w-[50px] h-fit  !outline-none  !shadonw-none  p-2  px-3  text-sm   !border-r !border-r-gray-300 left-1 absolute mr-5 top-3' />
                  <input type="text" id='phone' {...register("phone")} placeholder='Enter your phone' className='pl-15 w-full mt-2 p-3 text-sm rounded-md border border-gray-300 outline-0' />
                </div>
</div>

{/* location */}
     {/* <div className="location p-4 rounded-xl  relative">
    <Head_create>Location</Head_create>
    <Input className='p-5 mt-2 shadow-none' placeholder='Cairo, Egypt' onFocus={() => setShowmenu(true)} {...register("location", { required: true, onBlur: () => setShowmenu(false) })} />
{/* {showmenu && (
    <div className="menu bg-white absolute -bottom-25 left-0 w-full flex flex-col gap-4">
    <div className="span">Menu1</div>
    <div className="span">Menu2</div>
    <div className="span">Menu3</div>
</div>
)} 
</div> */}
<div className="box relative p-4 h-full ">
                 {/* <SelectCountry select={select} setSelect={setSelect} /> */}
<SelectCountryT setSelect={setSelect} />
                </div>

                <div className="box p-4 ">
                  <Languages setData={setData} data={myData} />
                  <p className="text-sm mt-3 text-muted-foreground">
        Press{" "}
          <Kbd>enter</Kbd>
        to create one
      </p>
                </div>


{/* description */}
<div className="description p-4 rounded-xl">
    <Head_create>Bio</Head_create>
        <div className="input mt-4">
             <Textarea className='h-[200px] ' placeholder="Type your message here." {...register("bio", { required: true })} />
        </div>
</div>



<div className="submit mt-3  flex justify-start">
    <Button type='submit' className='font-semibold cursor-pointer'>
                <IoMdCheckmark  />
                Submit
                </Button>
</div>

    </form>
</div>



            </div>
</div>
  )
}

export default page