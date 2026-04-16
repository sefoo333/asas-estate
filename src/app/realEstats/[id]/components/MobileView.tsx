"use client"
import AddToFavourite from '@/componants/AddToFavourite'
import Product from '@/componants/Product';
import { Button } from '@/components/ui/button';
import { useGetProducts } from '@/hooks/useGetProducts';
import { featuresLabel } from '@/lib/Features';
import { useUserStore } from '@/store/store';
import { RealEstate } from '@/types/realEstate';
import { useQueries, useQuery } from '@tanstack/react-query';
import { PhoneCall, PhoneCallIcon } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BiBuildingHouse } from 'react-icons/bi';
import { FaParking } from 'react-icons/fa';
import { FaElevator } from 'react-icons/fa6';
import { GiGardeningShears } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go'
import { IoMdBuild } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import { LiaBathSolid, LiaBedSolid, LiaMapMarkedAltSolid, LiaRulerSolid } from "react-icons/lia";
import { LuBath, LuBedDouble, LuSchool } from 'react-icons/lu';
import { MdBalcony, MdFitnessCenter, MdOutlineReport, MdPool, MdSecurity } from 'react-icons/md';
import { RxDimensions } from 'react-icons/rx';
import MayProduct from './MayProduct';
import ViewMap from './ViewMap';
import Link from 'next/link';
import { SendChat } from './SendChat';
import CarsoulImages from './PageComponentsMob/CarsoulImages';
import Main from './PageComponentsMob/Main';
import AboutProduct from './PageComponentsMob/AboutProduct';
import Features from './PageComponents/Features';
// import { Link as Linker, Element } from 'react-scroll';

function MobileView({wParams}:any) {



    const [Productdata,setData]:any = useState<RealEstate | any>(null);
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

// const features = [
//     { name: "Swimming Pool", icon: MdPool },
//     { name: "Gym", icon: MdFitnessCenter },
//     { name: "Parking", icon: FaParking },
//     { name: "Elevator", icon: FaElevator },
//     { name: "Security", icon: MdSecurity },
//     { name: "Balcony", icon: MdBalcony },
//     { name: "Garden", icon: GiGardeningShears },
//     // { name: "Central Heating", icon: "MdOutlineHeatPump" },
//     // { name: "Air Conditioning", icon: "MdOutlineAir" },
//     // { name: "Pet Friendly", icon: "FaDog" },
// ]

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
  queries: nearbySchools.slice(0,5).map((school:{lat:string,lon:string}) => ({
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

useEffect(() => {
    
},[schoolsWithDistance])


const GetIcon = ({icon}:any) => {
    const getIcon = featuresLabel.find((e) => e.icon.name === icon)
const Iconer = getIcon?.icon;

return Iconer ? <Iconer size={19} className='inline mr-3' /> : null
}

const {data:mayProducts} = useGetProducts("All");

   const {data:FavouriteProduct}:any = useQuery({
    queryKey:["Favourites",Productdata?.id],
    queryFn:async () => {
      const res = await fetch(`/api/users/favourite`)
      const json = await res.json()
    //   
    
      return json?.data
    },
    refetchOnWindowFocus:false
  })

  const [IsFav,setIsFav]= useState(false)

  const user = useUserStore((state) => state.user)
  useEffect(() => {
if (user && Array.isArray(data)){
    setIsFav(FavouriteProduct?.map((e:any) => e?.id)?.includes(Productdata?.id))
}
    
  },[FavouriteProduct])

        

  return (
    <div className="paren relative">
       <CarsoulImages images={Productdata?.images || []} IsFav={IsFav} />
        <div className="content rounded-4xl bg-white w-full h-full relative bottom-8 p-6">
           <Main Productdata={Productdata} />
            <div className="description mt-7">
                <h1 className='font-semibold'>Description</h1>
                <p className='text-[#5a5a5a] text-sm mt-2'>
                    {/* This is a beautiful property located in the heart of Cairo. It features 3 bedrooms, 2 bathrooms, and a spacious living area. The property has a total area of 240,000 square feet. */}
{Productdata?.description}
                </p>
            <ViewMap setDataLocation={setDataLocation} setNearbySchools={setNearbySchools} location={Productdata?.location} />
            </div>

            <AboutProduct data={data} />
<div className='mt-5'>
    <Features Productdata={Productdata} />
</div>

                                                                <div className="schools bg-white mt-15 rounded-xl ">
<h1 className='font-semibold'>Nearby Schools</h1>
<div className="flex flex-col mt-4 gap-10">

{schoolsWithDistance.length > 0 ? schoolsWithDistance.map((e:any , i:number) => (

        <div className="school flex gap-4 items-center" key={i} >
    <div className="icon text-white p-4 bg-blue-700 rounded-full">
        <LuSchool size={25} />
    </div>
    <div className="text">
        <h1 className='font-semibold text-lg text-blue-800'>{e?.name}</h1>
        <h2 className='text-sm'>Distance: <strong>{e?.distance}KM</strong></h2>
    </div>
</div>

)) : <h3 className='font-semibold text-center animate-fade-in  text-gray-500'>No schools found 🙁</h3>}

</div>
                                            </div>

                                            <div className='bg-white mt-15 rounded-xl'>
                                                <h1 className='font-semibold'>About Agent</h1>
                                              <div className="box flex relative justify-between flex-col">
                                                  <div className="flex gap-3 items-center mt-3">
                                                    <Image src={Productdata?.user?.image} alt='' width={100} height={100} className='w-15 h-15 rounded-full' />
                                                <div className="text">
                                                    <h1 className='font-semibold'>{Productdata?.user?.userName}</h1>
                                                    <h2 className='text-sm'>Property Owner</h2>
                                                </div>
                                                </div>
                                                <div className="buttons z-99 flex fixed bottom-0 pb-5 py-3 bg-white left-0 px-2   w-full gap-3">
            <SendChat product={Productdata} type="mobile-product" />
                                                        <Link href={`tel:${Productdata?.user?.phone}`}>
                                                        <button className='flex justify-center items-center basis-[80%] gap-3 p-4  bg-primary text-white rounded-lg'>
                                                            <PhoneCall size={19} />
                                                            Call The Owner
                                                            </button>
                                                        </Link>

                                                </div>
                                               
                                              </div>
                                            </div>

                                                     <div className="second mt-15 bg-white   justify-center rounded-xl w-full flex  flex-col">
                                                            <h1 className='font-semibold'>May you like</h1>
                                                            <div className="boxs mt-8">
                                                            {mayProducts?.slice(0,4)?.map((e:any) => <Product product={e} key={e?.id}  />)}
                                                            </div>
                                                           </div>
             


        </div>
    </div>
  )
}

export default MobileView