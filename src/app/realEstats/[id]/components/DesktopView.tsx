"use client"
import Crubchumb from '@/app/settings/_components/crubchumb'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RxDimensions } from 'react-icons/rx'
import { BiBuildingHouse } from "react-icons/bi";
import { IoTimeOutline } from "react-icons/io5";
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import {  MdOutlineReport, } from "react-icons/md";
import { IoMdBuild } from "react-icons/io";
import {  Phone } from 'lucide-react'
import Product from '@/componants/Product'
import Head from '../components/Head'
import { BsWhatsapp } from 'react-icons/bs'
import { useQueries, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Link as Linker, Element } from 'react-scroll';
import { useGetProducts } from '@/hooks/useGetProducts'
import MayProduct from '../components/MayProduct'
import AddToFavourite from '@/componants/AddToFavourite'
import { ShareProfile } from '@/app/brokers/[brokerid]/_compoents/ShareProfile'
import Map from '@/componants/Map'
import { SendChat } from '../components/SendChat'
import { useUserStore } from '@/store/store'
import Main from './PageComponents/Main'
import About from './PageComponents/About'
import AboutEstate from './PageComponents/AboutEstate'
import Features from './PageComponents/Features'
import NearbySchools from './PageComponents/NearbySchools'
function DesktopView({wParams}:any) {

    const [Productdata,setData]:any = useState(null);
    const [dataLocation,setDataLocation] = useState([]); 

    const getData = async () => {
        const getData = await fetch(`/api/RealEstats/${wParams.id}`);
        const data = await getData.json();
        setData(data.data)
    }

    useEffect(() => {
        getData()
    },[])

    const shared = new Date().getDate() - new Date(Productdata?.createdAt)?.getDate();
    const isTodayOrNot = shared === 0 ? "Today" : `${shared} days ago`

    const data = [
        {name:"Building type" , value:Productdata?.type.startsWith("b_") ? Productdata?.type.substring(2) : Productdata?.type, icon:BiBuildingHouse},
        {name:"Building Status" , value:"in prograss" , icon:IoMdBuild},
        {name:"Baths" , value:Productdata?.Baths || "N/A", icon:LuBath},
        {name:"Beds" , value:Productdata?.beds || "N/A", icon:LuBedDouble},
        {name:"Area" , value:`${Productdata?.Sqft || "N/A"} sqft` , icon:RxDimensions},
{name:"Time Shared" , value:`${isTodayOrNot}` , icon:IoTimeOutline},
    ]

    const actions = [
        {name:"Report" , icon:MdOutlineReport},
    ]

    const sections = ["Overview","About","Features" , "Nearby schools","Agent"];


    const [active,setActive] = useState(false)

    useEffect(() => {
       window.onscroll =(e) => {
        if (window.scrollY >= 500){
            setActive(true)
        }else{
            setActive(false)
        }
       }
    },[])

    const [nearbySchools,setNearbySchools] = useState<any>([])


const schoolQueries = useQueries({
  queries: nearbySchools.slice(0,5).map((school:{lon:string,lat:string}) => ({
    queryKey: ["distance", school.lon, school.lat],
    queryFn: async () => {
      const url = `https://router.project-osrm.org/route/v1/driving/${dataLocation[1]},${dataLocation[0]};${school.lon},${school.lat}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const json = await res.json();
      return json.routes[0].distance;
    },
    refetchOnWindowFocus:false,
    enabled:nearbySchools.length <= 5
  })),
});



const schoolsWithDistance = nearbySchools.slice(0,5).map((school:object, i:number) => ({
  ...school,
  distance: schoolQueries[i]?.data,
}));






const {data:mayProducts} = useGetProducts("All");

   const {data:FavouriteProduct}:any = useQuery({
    queryKey:["Favourites",Productdata?.id],
    queryFn:async () => {
      const res = await fetch(`/api/users/favourite`)
      const json = await res.json()
      return json?.data
    },
    refetchOnWindowFocus:false
  })

  const [IsFav,setIsFav]= useState(false)

  const user = useUserStore((state) => state.user)
  useEffect(() => {
if (user && Array.isArray(FavouriteProduct)){
    setIsFav(FavouriteProduct?.map((e) => e?.id)?.includes(Productdata?.id))
}
    
  },[FavouriteProduct])


  return (
   <>
     <div className={`window flex-col w-full pt-8 pb-4  items-center bg-white shadow-md fixed top-0 left-0 z-8 duration-300 flex ${!active ? "top-[-300px]" : "top-0"} `}>
<div className="first_section border-b px-20  border-b-[#ccc] pb-5 flex w-full items-center justify-between">
    <div className="return flex gap-1 items-center">
        <IoIosArrowBack size={25} />
        <span className='font-semibold'>Search</span>
    </div>
    {/* <Image src={"/aqare-edited.png"} alt='' width={251} height={109} className=' rounded-lg w-[100px]  object-cover' /> */}
    <div className="actions flex gap-6">
        <AddToFavourite Type={"product_onsite"} product={Productdata} isFavourite={IsFav} />
        <ShareProfile Type={"on-product"}  />
        {actions.map((e) => (
            <div className="box flex items-center cursor-pointer" key={e.name}>
                <e.icon size={27} />
                <span className='text-sm ml-2'>{e.name}</span>
            </div>
        ))}
    </div>
</div>
<div className="second_section w-full flex pt-5 items-center justify-center">
{sections.map((e) => (
    <Linker offset={-300} to={e} smooth={true} duration={500} className="box mx-5 relative cursor-pointer before:absolute before:opacity-0 before:duration-200 hover:before:opacity-100 before:left-0 before:bottom-[-17px] before:rounded-t-xl before:h-[3px] before:w-full before:bg-blue-500" key={e}>
        <span className=' text-lg'>{e}</span>
    </Linker>
))}
</div>
   </div>
    <div className="parent flex justify-center mt-9 ">
        <div className="container  flex gap-5 ">
           <div className="flex flex-col basis-[70%]">
             <Crubchumb parent={Productdata?.TransactionType === "Sale" ? "Buy" : "Rent"} child={Productdata?.title} />
          <div className="flex flex-col">
                       <Element name='Overview' className="flex bg-white flex-col mt-5 shadow-sm rounded-md p-5">
          <Main Productdata={Productdata} />
</Element>          
   

                                             <Element name='About' className="description bg-white shadow-sm rounded-xl mt-10 p-5">
                                        <About par={Productdata?.description} />
                                                                                                        <Element name='location' className="map mt-2">
                                                                                                            <Map setDataLocation={setDataLocation} setNearbySchools={setNearbySchools} location={Productdata?.location} />
                                                                                                        </Element>

                                                </Element>           

<AboutEstate data={data} />
                                          
                                            <Element name="Features" className="features bg-white mt-15 shadow-sm rounded-xl p-5">
<Features Productdata={Productdata} />
                                            </Element>

                                            <Element name='Nearby schools' className="schools bg-white mt-15 shadow-sm rounded-xl p-5">
<NearbySchools schoolsWithDistance={schoolsWithDistance} />
                                            </Element>

                                            <Element name='Agent' className="owner bg-white mt-15 shadow-sm rounded-xl p-5">
<Head text='Owner' />
                                               <div className="box mt-4 p-8 rounded-xl flex justify-between items-center bg-blue-50 gap-5">
                                              <div className="fitst flex items-center gap-4">
                                                   <Image src={"/Hero.jpg"} alt='' width={500}  height={500}           className="rounded-full w-[80px] h-[80px] object-cover" />
                                                <div className="second flex flex-col">
                                                <h1 className='font-bold text-2xl'>{Productdata?.user?.userName}</h1>
                                                    <span className='text-sm text-gray-500'>Member since {(new Date(Productdata?.user?.createdAt) as any).getFullYear()}</span>
                                                </div>
                                              </div>
                                                <div className="third">
                                                    <Button  className='px-8 py-5 border text-blue-600 border-blue-600  font-bold rounded-lg hover:bg-blue-700 hover:text-white cursor-pointer transition' variant={"outline"}>
                                                    <Link href={`/brokers/${Productdata?.userId}`}>
                                                    Contact Now
                                                    </Link>
                                                    </Button>
                                                </div>
                                               </div>
                                            </Element>
                                            <div className="recommends mb-10 bg-white mt-15 shadow-sm rounded-xl p-5">
<Head text='May you like' />
                                           <div className="w-full flex gap-5">
    {mayProducts?.slice(0, 2).map((e: any, i: number) => (
        <Product product={e} />
    ))}
</div>
                                            </div>
         </div>
           </div>
         <div className="action basis-[30%]">
<div className="box  justify-center sticky top-45  w-full flex items-center flex-col">
   {/* <Button type="submit" className="py-7 flex flex-col font-bold text-md bg-blue-600 px-7 rounded-md mt-2 cursor-pointer hover:bg-blue-700 hover:text-white text-white w-full" variant="outline">
        Request a tour
        <span className='mt-[-8px] font-medium text-[12px]'>as early today as 10:00 PM</span>
      </Button>
   {/* <button className="py-4 items-center justify-center flex font-semibold text-md bg-green-600 px-7 transition rounded-md mt-2 cursor-pointer hover:bg-green-700 hover:text-white text-white w-full" >
<IoCall size={22} className='mr-2' /> <span className='font-bold'> Call</span>
            </button> 
   <button className="py-4 items-center justify-center flex font-semibold text-md text-blue-600 border border-blue-600 px-7 duration-[200ms] rounded-md mt-2 cursor-pointer hover:bg-blue-700 hover:text-white w-full" >
                {/* <IoMail size={22} className='mr-2' /> 
                   <span className='font-bold'> Send Massege</span>
                  </button> */}

               <div className="first bg-white  justify-center  shadow-sm rounded-xl p-5 w-full items-center flex flex-col">
                {/* <Head text='Agent Details' /> */}
    {/* <div className="flex flex-col items-center mt-4"> */}
                      <div className="account flex flex-col items-center">
                     <Image src={Productdata?.user?.image || "/Heroo.webp"} alt='' width={150} height={150} className='w-20 h-20 mb-2 rounded-full bg-white' />
                  <div className="text text-xl font-semibold text-center">
                    <h1>{Productdata?.user?.userName}</h1>
                    <h2 className='text-sm text-[#5e5e5e] font-medium'>{Productdata?.user?.company}</h2>
                  </div>
                 </div>
    <div className="social flex gap-5 mt-3">
<div className="icon p-2  rounded-full bg-white border border-gray-200">
          <Link href={`https://wa.me/${Productdata?.user?.phone}?text=مرحبا ${Productdata?.user?.userName} , هل يمكنني الاستفسار عن  العقار الخاص بك ؟`}>
            <BsWhatsapp color='#2cd46b'  size={21} />
          </Link>
</div>
<div className="icon p-2  rounded-full bg-white border border-gray-200">
         <Link href={`tel:${Productdata?.user?.phone}`}>
            <Phone   size={21} />
         </Link>
</div>
<div className="icon p-2  rounded-full bg-white border border-gray-200">
            <SendChat product={Productdata} />
</div>

    {/* </div> */}
    </div>
               </div>
               <div className="second mt-10 bg-white   justify-center shadow-sm rounded-xl my-5 p-5 w-full flex  flex-col">
                <Head text='May you like' />
                <div className="boxs mt-8">
                {mayProducts?.slice(0,3).map((e:any) => <MayProduct product={e} key={e?.id}  />)}
                </div>
               </div>
</div>
         </div>
       </div>
        </div>
    </>
  )
}

export default DesktopView