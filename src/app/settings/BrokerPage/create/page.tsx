"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input';
import { ImBold } from "react-icons/im";
import { FaItalic } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { FaListOl } from "react-icons/fa";
import { Textarea } from '@/components/ui/textarea';
import {  IoMdCheckmark } from "react-icons/io";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Head_create from './_components/Head_create'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import ImageAdd from './_components/ImageAdd'
import SelectCurrency from './_components/SelectCurrency'
import Features from './_components/Features'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'   
import Crubchumb from '../../_components/crubchumb';
import HeadS from '../../_components/HeadS';
import { useRouter } from 'next/navigation';


const AddRealEstat = async (data:any) => {
const test = await fetch(`/api/RealEstats/addRealEstate` , {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
      ...data,
      beds: data.beds || 0,
      features:data?.features.map((e:any) => ({...e , icon:e.icon.name}))
    })
})



return test.json()
}

function page() {
  
    const buildings_type_normal = ["Apartment" , "villa" , "Chalet" , "House" , "Penthouse"]
    const buildings_type_bussiness = ["Store" , "Office" , "Restaurant"]

    const icons = [ImBold,FaItalic,CiBoxList,FaListOl]
    const [showmenu , setShowmenu] = useState(false)
    const [business , setBusiness] = useState(false)
const router = useRouter();
    const [type,setType] = useState("");
    const [images,setImages] = useState([]);

    const [features,setFeatures] = useState([]);

    const mutation = useMutation({
        mutationFn: AddRealEstat,
        onSuccess: (data) => {
            
            toast.success("Property created 😀")
router.push(`/realEstats/${data.data._id}`)
        },
        onError:(error) => {
          toast.error("Error creating real estate")
        }
    })

      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const [showList , setShowList] = useState(false);
    const [index , setIndex] = useState(0);

 const currencies = [{
    label:"USD",
    value:"us"
  } , {
    label:"SUR",
    value:"sa"
  }   , {
    label:"EGP",
    value:"eg"
  }]

  
  const [TransactionType , setTransType] = useState("")

  return (
        <div className="page px-7 max-md:px-5 py-7 basis-[100%]">
          
            <Crubchumb />
            <HeadS title='Create Property' />
            <div className="window p-5 max-md:w-full rounded-xl border border-gray-200  dark:!bg-gray-800  dark:!border-gray-600 bg-white mt-7 ">
{/* <Head text='create real estate' /> */}

<div className="flex flex-col  w-1/2 max-xl:w-full max-md:w-full">
<form action="" onSubmit={handleSubmit((data) => {
    
    mutation.mutate({...data,images:images,currency:currencies[index].label,type,TransactionType,features,user:[]});
})}>
<h1 className='text-lg font-semibold'>Project Details</h1>
{/* image */}
<ImageAdd images={images} setImages={setImages} />
{/* title */}
        <div className="title mt-5  p-4 rounded-xl">
    
    <Head_create>Title</Head_create>
    <Input className='p-5 mt-2 shadow-none' placeholder='Write the title of real estate' {...register("title", { required: true })} />
</div>
       {/* price */}
        <div className="price   p-4 rounded-xl">
    
                   <label htmlFor="email" className='text-md font-semibold'>price</label>
                <div className="box relative h-full ">
                   <SelectCurrency showList={showList} setShowList={setShowList} index={index} setIndex={setIndex} currencies={currencies} />
                  <input type="text" id='price' placeholder='$500,000' className='pl-30 w-full mt-2 p-3 text-sm rounded-md border border-input outline-0' {...register("price", { required: true })} />
                </div>
</div>

{/* location */}
     <div className="location p-4 rounded-xl  relative">
    <Head_create>Location</Head_create>
    <Input className='p-5 mt-2 shadow-none' placeholder='Cairo, Egypt' onFocus={() => setShowmenu(true)} {...register("location", { required: true, onBlur: () => setShowmenu(false) })} />
{/* {showmenu && (
    <div className="menu bg-white absolute -bottom-25 left-0 w-full flex flex-col gap-4">
    <div className="span">Menu1</div>
    <div className="span">Menu2</div>
    <div className="span">Menu3</div>
</div>
)} */}
</div>
     <div className="type p-4 rounded-xl  relative">
    <Head_create>Building type</Head_create>
 <Select  onValueChange={(e) => {
  if (e.startsWith("b")){  
  setBusiness(true)
  } else {
    setBusiness(false)
  }
  setType(e)
 }}>
      <SelectTrigger className="w-full py-5 mt-3">
        <SelectValue placeholder="Select a Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Residential</SelectLabel>
        {buildings_type_normal.map((e) => (
                      <SelectItem key={e} value={e} id={e}>{e}</SelectItem>
        ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Commercial</SelectLabel>
         {buildings_type_bussiness.map((e) => (
                      <SelectItem  key={e} value={`b_${e}`} id={e}>{e}</SelectItem>
        ))}
        </SelectGroup>
      </SelectContent>
    </Select>

</div>
{/* type property */}

 <div className="location p-4 rounded-xl  relative">
    <Head_create>Transaction type</Head_create>
    <RadioGroup  defaultValue="comfortable" className="w-fit mt-3">
      <div className="flex items-center gap-3 cursor-pointer">
        <RadioGroupItem onClick={(e) => {
          setTransType("Sale")
        }} value="default" id="r1"  />
        <Label htmlFor="r1" className='font-semibold'>Sale</Label>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <RadioGroupItem   onClick={(e) => {
          setTransType("Rent")
        }}value="compact" id="r3"  />
        <Label htmlFor="r3" className='font-semibold'>Rent</Label>
      </div>
    </RadioGroup>
</div>


{/* units */}
<div className="units max-md:flex-col flex gap-5 max-md:gap-0 justify-between">
      <div className="title mt-5 max-md:mt-2  p-4 rounded-xl">
    
    <h1 className={`text-md font-semibold ${business ? "font-semibold text-[#5a5a5a]" : ""}`}>Beds</h1>
    <Input type='number' disabled={business ? true : false} className='p-5 mt-2 shadow-none' placeholder='3' {...register("beds", { required: false })} />
</div>
  <div className="title mt-5 max-md:mt-2  p-4 rounded-xl">
    
    <h1 className='text-md font-semibold'>Baths</h1>
    <Input type='number' className='p-5 mt-2 shadow-none' placeholder='4' {...register("Baths", { required: true })} />
</div>
  <div className="title mt-5 max-md:mt-2  p-4 rounded-xl">
    
    <h1 className='text-md font-semibold'>Sqft</h1>
    <Input type='number' className='p-5 mt-2 shadow-none' placeholder='500,000' {...register("Sqft", { required: true })} />
</div>

</div>
{/* description */}
<div className="description p-4 rounded-xl">
    <Head_create>Description</Head_create>
        <div className="input mt-4">
           
             <Textarea className='h-[200px] ' placeholder="Type your message here." {...register("description", { required: true })} />
        </div>
</div>

<Features edit={false} setFeatures={setFeatures} features={features} />

<div className="submit mt-3  flex justify-start">
    <Button type='submit' className='font-semibold cursor-pointer'>
                <IoMdCheckmark  />
                Confirm
                </Button>
</div>

    </form>
</div>



            </div>
</div>
  )
}

export default page