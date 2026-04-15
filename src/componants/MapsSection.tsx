"use client"
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';

import L from 'leaflet';
import { Input } from '@/components/ui/input';
import { MapIcon, Search } from 'lucide-react';
import FlyToLocation from './Map/ToLocation';
import MapClick from './Map/TouchMap';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


function Maps({logic,open,setOpen}:{logic?: () => void , open:boolean,setOpen:any}) {
  const [location, setLocation]:any = useState([30.0444, 31.2357]);
const [getSuggestions,setGetSuggestions] = useState("");
const [name,setName] = useState("");
const route = useRouter();
const path = usePathname();


const {data,isLoading} =  useQuery({
  queryKey: ['searchLocation', name],
  queryFn: async () => {

    const res = await fetch(`/api/getLocation?q=${name}`)
  
  const data = await res.json()
  return data;
  },
  enabled: name.length > 3,
  staleTime:5 * 60 * 1000,
  refetchOnWindowFocus:false
})




  return (
  
    <div className={`parent relative basis-[40%]  transition-all  h-[90dvh] ${open && "hidden"}`}>
      {open && <div  onClick={() => setOpen((e:boolean) => !e)} className="box bg-white  rounded-full shadow-sm p-3 absolute left-0 z-9 bottom-30 border border-gray-300">
        <MapIcon size={26} />
      </div>}
      <div className="box absolute top-0 left-0 w-[70%]  z-10">
        <div className='absolute flex top-3 left-3 z-9 w-full'>
        <Input onChange={(e) => {
          setName(e.target.value)
        }} placeholder='Search Location' className='w-full mt-4  p-6 bg-white rounded-full' />
        <Search size={20} className='absolute right-3 text-gray-700 top-1/2 translate-x-[-50%]' />
      </div>
     {data && (
       <div className="window absolute overflow-y-auto left-3 top-22 w-full h-[200px] bg-white rounded-md shadow flex flex-col py-4 px-5 ">
       
      {isLoading ? (
        <div className="loading flex justify-center items-center h-full">
          <span>Loading...</span>
          </div>
          ) : (
            <>
              { data?.map((e:any) => (
                  <div className="box py-3 border-b border-b-gray-200 cursor-pointer"key={e?.name} onClick={() => {
                    setLocation([parseFloat(e.lat), parseFloat(e.lon)])
                    setGetSuggestions(e.name)
                    route.push(`/${path.split("/")[1]}?location=${e.name}`)
                    
                  }}>
                    <h2 className=' font-semibold'>{e.name}</h2>
                    <h3 className='text-sm'>{e.display_name}</h3>
                  </div>
        ))}
            </>
          )}

      </div>
     )}
      </div>
        <div className="container  top-5 shadow h-full w-[600px] max-xl:w-[400px] flex justify-center items-center">
              <MapContainer className='sticky top-0'   zoomControl={false}  center={location} zoom={13} style={{ height: '100%', width: '600px' }}>
                <ZoomControl position="topright" />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        
      />
      <Marker position={location}>
        <Popup>{getSuggestions}</Popup>
      </Marker>
            <MapClick setPosition={setLocation} />
              <FlyToLocation position={location} />
    </MapContainer>
        </div>
    </div>
  )
}

export default Maps