"use client";
import { useState } from "react";

import L from "leaflet";
import MapSingle from "./MapSingle";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";



L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


type Place = {
  id: number;
  lat: number;
  lon: number;
  name?: string;
};

function Map({location , setNearbySchools,setDataLocation}:{location:string,setNearbySchools:any,setDataLocation:any}) {
  const [active, setActive] = useState(false);
  

  return (
   <>
    <div className="parent relative w-full my-2 h-[250px]">
        <div onClick={() => setActive(true)} className="butt p-3 rounded-full bg-white dark:!bg-gray-800  dark:!border-gray-600 absolute left-3 cursor-pointer top-3 z-3">
            <GoScreenFull  size={22} />
        </div>
         <MapSingle setDataLocation={setDataLocation} setNearbySchools={setNearbySchools} location={location} />
    </div>

    {active && <div className="w-full  left-0 flex justify-center items-center top-0 z-999 h-full bg-black/30 fixed">
            <div className="w-[900px] animate-fade-in relative h-[450px]">
    <div onClick={() => setActive(false)} className="butt p-3 rounded-full bg-white dark:!bg-gray-800  dark:!border-gray-600 absolute left-3 cursor-pointer top-3 z-9">
            <GoScreenNormal  size={22} />
        </div>
                 <MapSingle setDataLocation={setDataLocation} setNearbySchools={setNearbySchools} location={location} />
            </div>
    </div>}
   </>
  );
}

export default Map;
