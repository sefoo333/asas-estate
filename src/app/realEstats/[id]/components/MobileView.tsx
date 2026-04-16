"use client"
import { RealEstate } from '@/types/realEstate';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react'
import Main from './PageComponentsMob/Main';
import AboutProduct from './PageComponentsMob/AboutProduct';
import Features from './PageComponents/Features';
import dynamic from 'next/dynamic';
import CallToAction from './PageComponentsMob/CallToAction';
import MayProducts from './PageComponentsMob/MayProducts';
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import { SendChat } from './SendChat';

const CarsoulImages = dynamic(() => import('./PageComponentsMob/CarsoulImages'), {
  ssr: false,
});
const ViewMap = dynamic(() => import('./ViewMap'), {
  ssr: false,
});

const NearbySchools = dynamic(() => import("./PageComponents/NearbySchools"));

function MobileView({wParams}:any) {



    const [dataLocation,setDataLocation] = useState([]); 

const { data: Productdata } = useQuery<RealEstate | any>({
  queryKey: ["product", wParams.id],
  queryFn: async () => {
    const res = await fetch(`/api/RealEstats/${wParams.id}`);
    const json = await res.json();
    return json.data;
  },
  staleTime: 1000 * 60 * 5,
});

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
  })),
});



const schoolsWithDistance = nearbySchools.slice(0,5).map((school:object, i:number) => ({
  ...school,
  distance: schoolQueries[i]?.data,
}));






        

  return (
    <div className="paren relative">
       <CarsoulImages images={Productdata}  />
        <div className="content rounded-4xl bg-white w-full h-full relative bottom-8 p-6">
           <Main Productdata={Productdata} />
            <div className="description mt-7">
                <h1 className='font-semibold'>Description</h1>
               <p className="text-[#5a5a5a] text-sm mt-2 min-h-[80px]">
  {Productdata?.description || ""}
</p>
            <ViewMap setDataLocation={setDataLocation} setNearbySchools={setNearbySchools} location={Productdata?.location} />
            </div>

            <AboutProduct Productdata={Productdata} />
<div className='mt-5'>
    <Features Productdata={Productdata} />
</div>

                                     <div className='mt-5'>
 <NearbySchools schoolsWithDistance={schoolsWithDistance} />
                                     </div>

                                           <CallToAction Productdata={Productdata} />

  <div className="buttons z-99 flex fixed bottom-0 pb-5 py-3 bg-white left-0 px-2   w-full gap-3">
            <SendChat product={Productdata} type="mobile-product" />
                                            <Link href={`tel:${Productdata?.user?.phone}`}>
                                                        <button className='flex justify-center items-center basis-[80%] gap-3 p-4  bg-primary text-white rounded-lg'>
                                                            <PhoneCall size={19} />
                                                            Call The Owner
                                                            </button>
                                                        </Link>            

                                                </div>

                                                     <MayProducts />
             


        </div>
    </div>
  )
}

export default MobileView