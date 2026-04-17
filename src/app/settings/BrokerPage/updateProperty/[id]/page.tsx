"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { ImBold } from "react-icons/im";
import { FaItalic } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { FaListOl } from "react-icons/fa";
import { Textarea } from '@/components/ui/textarea';
import { IoMdCheckmark } from "react-icons/io";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'   
import { useParams, useRouter } from 'next/navigation';
import Crubchumb from '@/app/settings/_components/crubchumb';
import HeadS from '@/app/settings/_components/HeadS';
import ImageAdd from '../../create/_components/ImageAdd';
import Head_create from '../../create/_components/Head_create';
import SelectCurrency from '../../create/_components/SelectCurrency';
import Features from '../../create/_components/Features';
import { RealEstate } from '@/types/realEstate';


const AddRealEstat = async (data:any) => {

//     const isEmpty = (value: any) => {
//   return value === null || value === undefined || value.toString().trim() === "";
// };

// const filteredData = data.filter((item) => {
//   return !Object.values(item).some(isEmpty);
// });

const test = await fetch(`/api/RealEstats/${data.id}` , {
    method:"PATCH",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
      ...data,
      price:parseInt(data?.price),
      images:data?.images,
    })
})


return test.json()
}

function page() {

    const params = useParams();
const [data,setData] = useState<RealEstate | any>({});
    
    const getData = async () => {
            const getData = await fetch(`/api/RealEstats/${params?.id}`);
            const data = await getData.json();
            setImages(data.data.images);
            setType(data.data.type);
            setTransType(data.data.TransactionType);
            setFeatures(data.data.features);
            setData(data.data)
        }
    
        useEffect(() => {
            getData()
        },[params])

  
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
        onSuccess: () => {
            toast.success("Property Updated 😀")
router.push(`/realEstats/${data?.id}`)
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
  
  
  const [TransactionType , setTransType] = useState("");

const tt = type?.startsWith("b_") ? type?.slice(2) : type.toString()

  return (
        <div className="page px-7 max-md:px-5 py-7 basis-[100%]">
          
            <Crubchumb />
            <HeadS title='Create Property' />
            <div className="window p-5 max-md:w-full rounded-xl border border-gray-200  dark:!bg-gray-800  dark:!border-gray-600 bg-white mt-7 ">
{/* <Head text='create real estate' /> */}

<div className="flex flex-col  w-1/2 max-xl:w-full max-md:w-full">
<form action="" onSubmit={handleSubmit((dataer) => {
    mutation.mutate({...dataer , id:data?.id,images:images,currency:currencies[index].label || data?.currency,type:data?.type || type,TransactionType:data?.TransactionType || TransactionType,features:features});
})}>
<h1 className='text-lg font-semibold'>Project Details</h1>
{/* image */}
<ImageAdd images={images} setImages={setImages} />
{/* title */}
        <div className="title mt-5  p-4 rounded-xl">
    
    <Head_create>Title</Head_create>
    <Input className='p-5 mt-2 shadow-none' defaultValue={data?.title} placeholder='Write the title of real estate' {...register("title")} />
</div>
       {/* price */}
        <div className="price   p-4 rounded-xl">
    
                   <label htmlFor="email" className='text-md font-semibold'>price</label>
                <div className="box relative h-full ">
                   <SelectCurrency showList={showList} setShowList={setShowList} index={index} setIndex={setIndex} currencies={currencies} />
                  <input defaultValue={data?.price} type="text" id='price' placeholder='$500,000' className='pl-30 w-full mt-2 p-3 text-sm rounded-md border border-input outline-0' {...register("price")} />
                </div>
</div>

{/* location */}
     <div className="location p-4 rounded-xl  relative">
    <Head_create>Location</Head_create>
    <Input defaultValue={data?.location} className='p-5 mt-2 shadow-none' placeholder='Cairo, Egypt' onFocus={() => setShowmenu(true)} {...register("location", { onBlur: () => setShowmenu(false) })} />
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
 <Select   onValueChange={(e) => {
  if (e.startsWith("b")){
    setBusiness(true);
  } else {
    setBusiness(false);
  }
    setType(e)
 }}>
      <SelectTrigger className="w-full py-5 mt-3">
        <SelectValue placeholder={tt} />
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
        <RadioGroupItem defaultChecked={data?.TransactionType === "Sale" ? true : false} onClick={(e) => {
          setTransType("Sale")
        }} value="default" id="r1"  />
        <Label htmlFor="r1" className='font-semibold'>Sale</Label>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <RadioGroupItem  defaultChecked={data?.TransactionType === "Rent" ? true : false}  onClick={(e) => {
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
    <Input defaultValue={data?.beds} type='number' disabled={business ? true : false} className='p-5 mt-2 shadow-none' placeholder='3' {...register("beds", { required: false })} />
</div>
  <div className="title mt-5 max-md:mt-2  p-4 rounded-xl">
    
    <h1 className='text-md font-semibold'>Baths</h1>
    <Input defaultValue={data?.Baths} type='number' className='p-5 mt-2 shadow-none' placeholder='4' {...register("Baths")} />
</div>
  <div className="title mt-5 max-md:mt-2  p-4 rounded-xl">
    
    <h1 className='text-md font-semibold'>Sqft</h1>
    <Input defaultValue={data?.Sqft} type='number' className='p-5 mt-2 shadow-none' placeholder='500,000' {...register("Sqft",)} />
</div>

</div>
{/* description */}
<div className="description p-4 rounded-xl">
    <Head_create>Description</Head_create>
        <div className="input mt-4">
            {/* <div className="tools flex gap-6 p-5 py-3 border border-gray-200 border-b-0 bg-slate-100/80">
{icons.map((E,i:number) =>(
    <E key={i} className='cursor-pointer duration-300 hover:text-gray-600' />
))}
            </div> */}
             <Textarea defaultValue={data?.description} className='h-[200px] ' placeholder="Type your message here." {...register("description")} />
        </div>
</div>

<Features edit={true} setFeatures={setFeatures} features={features} />

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