"use client"
import Crubchumb from '@/app/settings/_components/crubchumb'
import MapSingle from '@/componants/MapSingle'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RxDimensions } from 'react-icons/rx'
import { BiBuildingHouse } from "react-icons/bi";
import { IoCall, IoChatbox, IoMail, IoTimeOutline } from "react-icons/io5";
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { PiShareFatLight } from "react-icons/pi";
import { MdBalcony, MdFitnessCenter, MdMoney, MdOutlineReport, MdPool, MdSecurity } from "react-icons/md";
import { IoMdBuild } from "react-icons/io";
import { FaParking } from 'react-icons/fa'
import { FaElevator } from 'react-icons/fa6'
import { GiGardeningShears, GiPriceTag } from 'react-icons/gi'
import { Bath, Bed, Camera, Car, MessageCircleMore, MoreHorizontal, Phone, SquareTerminal } from 'lucide-react'
import { LuSchool } from "react-icons/lu";
import Product from '@/componants/Product'
import Head from '../components/Head'
import { TbMoneybag } from "react-icons/tb";
import { GoLocation } from "react-icons/go";
import { Badge } from '@/components/ui/badge'
import { CiRuler } from 'react-icons/ci'
import { BsWhatsapp } from 'react-icons/bs'
import { useParams } from 'next/navigation'
import { useQueries, useQuery } from '@tanstack/react-query'
import { featuresLabel } from '@/lib/Features'
import { FeaturesDialog } from '../components/FeaturesDialog'
import Link from 'next/link'
import { Link as Linker, Element } from 'react-scroll';
import { useGetProducts } from '@/hooks/useGetProducts'
import MayProduct from '../components/MayProduct'
import AddToFavourite from '@/componants/AddToFavourite'
import { ShareProfile } from '@/app/brokers/[brokerid]/_compoents/ShareProfile'
import Map from '@/componants/Map'
import { SendChat } from '../components/SendChat'
import { useUserStore } from '@/store/store'
import ImagesProduct from '../components/ImagesProduct'
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

const features = [
    { name: "Swimming Pool", icon: MdPool },
    { name: "Gym", icon: MdFitnessCenter },
    { name: "Parking", icon: FaParking },
    { name: "Elevator", icon: FaElevator },
    { name: "Security", icon: MdSecurity },
    { name: "Balcony", icon: MdBalcony },
    { name: "Garden", icon: GiGardeningShears },
    // { name: "Central Heating", icon: "MdOutlineHeatPump" },
    // { name: "Air Conditioning", icon: "MdOutlineAir" },
    // { name: "Pet Friendly", icon: "FaDog" },
]

    const [active,setActive] = React.useState(false)

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




const GetIcon = ({icon}:any) => {
    const getIcon = featuresLabel.find((e) => e.icon.name === icon)
const Iconer = getIcon?.icon;

return Iconer ? <Iconer size={22} className='inline mr-3' /> : null
}

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

 const currencies = [{
    label:"USD",
    value:"$"
  } , {
    label:"SUR",
    value:"sur"
  }   , {
    label:"EGP",
    value:"EG"
  }]


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
          <ImagesProduct Productdata={Productdata} />
               <div className="flex flex-col gap-3 mt-5 ">
             
                                                                <h1 className='font-semibold text-2xl'>{Productdata?.title }</h1>
<div className="price flex items-center gap-3">
    <TbMoneybag size={22} color='#7c9a76' />
    <h1 className='text-[18px]'>{Productdata?.price || 0} {Productdata?.TransactionType === "Rent" && "Month/"}{currencies?.find((a) => a.label === Productdata?.currency)?.value}</h1>
</div>
<div className="price flex items-center gap-3">
    <GoLocation size={21} color='#d46060' />
    <h1 className='text-[18px]'>{Productdata?.location}</h1>
</div>

<div className="property flex gap-3">
<div className="box border border-gray-200 rounded-xl py-1.5 px-4 flex gap-2 items-center">
         <Bed size={20} />   <span className="">{Productdata?.beds || 0} Bedroom</span>
</div>
<div className="box border border-gray-200 rounded-xl py-1.5 px-4 flex gap-2 items-center">
         <Bath size={20} />   <span className="">{Productdata?.Baths || 0} Bathroom</span>
</div>
<div className="box border border-gray-200 rounded-xl py-1.5 px-4 flex gap-2 items-center">
         <CiRuler size={21} />   <span className="">{Productdata?.Sqft || 0} <span className='font-medium'>m<sup>2</sup></span></span>
</div>
</div>
               </div>
           </Element>
          
   

                                             <Element name='About' className="description bg-white shadow-sm rounded-xl mt-10 p-5">
                                                <Head text='Description' />
                                                {/* <p className='mt-5'>
                                                    🏢 Luxury Apartment for Sale in the Heart of Cairo<br /> <br />
✨ Enjoy living in a prime location that combines comfort, convenience, and proximity to all essential services.<br />
📍 Location: Cairo – a vibrant area close to schools, hospitals, and shopping malls.<br />
🏠 Features:<br /> <br />

- Area: 120 m²<br />

- 3 Bedrooms + Spacious Reception<br />

- Fully equipped kitchen + 2 Bathrooms<br />

- Super Lux finishing, ready to move in<br />

🚗 Private parking – 24/7 security<br />
🌳 Overlooking a main street with nearby green areas<br />

💰 Special price with flexible payment plans<br />

📞 Contact us now for details and viewing!<br />
                                                </p> */}

<p className='my-5'>
{Productdata?.description}

</p>

                                                                                                        <Element name='location' className="map mt-2">
                                                                                                            <Map setDataLocation={setDataLocation} setNearbySchools={setNearbySchools} location={Productdata?.location} />
                                                                                                        </Element>

                                                </Element>           


                                            <div className="about_estate mt-15 shadow-sm bg-white rounded-xl p-5">
<Head text='About Real Estate' />
                                                <div className="features grid grid-cols-2 mt-4">
                                                    {data.map((e , a:number) => (
                                                        <div className={`box flex justify-between items-center ${a !== data.length -1 ? "border-b border-gray-300/40" : ""}`} key={a}>
                                                            <div className="title flex items-center py-5">
                                                            <e.icon size={22} className='inline mr-3' />
                                                            <h1>{e.name}</h1>
                                                        </div>
                                                        <div className="flex justify-start basis-[55%] ">
                                                            <h2 className='font-semibold'>{e.value}</h2>
                                                        </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <Element name="Features" className="features bg-white mt-15 shadow-sm rounded-xl p-5">
<Head text='features' />
                                                 <div className="features grid grid-cols-2 mt-4">
                                                    {Productdata?.features?.map((e:any , a:number) => (
                                                        <div className={`box flex justify-between items-center`} key={a}>
                                                            <div className="title flex items-center py-5">
                                                            <GetIcon icon={e.icon}/>
                                                            <h1>{e.label}</h1>
                                                        </div>
                                                      
                                                        </div>
                                                    ))}
                                                </div>
                                                    {Productdata?.features?.length >= 6 ? (
                                                       <FeaturesDialog featuresData={Productdata?.features} GetIcon={GetIcon} />
                                                    ) : null}
                                            </Element>

                                            <Element name='Nearby schools' className="schools bg-white mt-15 shadow-sm rounded-xl p-5">
<Head text='Nearby Schools' />
<div className="flex flex-col mt-4 gap-10">
{schoolsWithDistance.length > 0 && schoolsWithDistance.map((e:any) => (
        <div key={e?.id} className="school flex gap-4 items-center">
    <div className="icon text-white p-4 bg-blue-700 rounded-full">
        <LuSchool size={30} />
    </div>
    <div className="text">
        <h1 className='font-semibold text-xl text-blue-800'>{e?.name}</h1>
        <h2 className='text-sm'>Distance: <strong>{e.distance}KM</strong></h2>
    </div>
</div>
))}

</div>
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
                                              <div className="w-full  flex gap-5">
                                                   
                                           {mayProducts?.slice(0,2).map((e:any , i:number) => <Product product={e} key={i}  />)}
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
                     <Image src={Productdata?.user?.image || "/Heroo.jpg"} alt='' width={150} height={150} className='w-20 h-20 mb-2 rounded-full bg-white' />
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