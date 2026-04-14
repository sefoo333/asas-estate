"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { TfiFullscreen } from "react-icons/tfi";
import { useQuery } from "@tanstack/react-query";
import FlyToLocation from "./Map/ToLocation";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

type Place = {
  id: number;
  lat: number;
  lon: number;
  name?: string;
};

function MapSingle({location , setNearbySchools,setDataLocation}:{location:string,setNearbySchools:any,setDataLocation:any}) {
  const [active, setActive] = useState(false);
  const [center,setCenter] = useState<[number, number]>([0,0]); // القاهرة
  const [places, setPlaces] = useState<Place[]>([]);
  
  const {data,isLoading} =  useQuery({
    queryKey: ['searchLocation', location],
    queryFn: async () => {
      
      const res = await fetch(`/api/getLocation?q=${location}`)
      
      const data = await res.json()
      console.log("ss",data)
      // setDataLocation([data[0]?.lat || 30.0444, data[0]?.lon || 31.2357])
      setCenter([data[0]?.lat, data[0]?.lon])
  setDataLocation([data.lat ?? 30.0444, data.lon ?? 31.2357])

      return data[0];
    },
    refetchOnWindowFocus:false
  })

// useEffect(() => {
//   if (!data) return; // 👈 مهم عشان متشلش undefined

//   // setCenter([data?.lat || 30.0444, data?.lon || 31.2357])
//   setDataLocation([data.lat ?? 30.0444, data.lon ?? 31.2357])
// }, [data])

const fetchPlaces = async () => {

  console.log("tt",center)
  // console.log("tt",data)
  // استعلام Overpass API -> مدارس + مستشفيات حوالين القاهرة
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="school"](around:5000,${center[0]},${center[1]});
      node["amenity"="hospital"](around:5000,${center[0]},${center[1]});
    );
    out body;
  `;

  console.log("query",query)

  const url = "https://overpass-api.de/api/interpreter";

  const res = await fetch(url, {
    method: "POST",
    body: query,
  });

  const data = await res.json();

  const extracted: Place[] = data.elements.map((el: any) => ({
    id: el.id,
    lat: el.lat,
    lon: el.lon,
    name: el.tags?.name || "مكان غير معروف",
  }));

setNearbySchools(extracted.filter((p) => p.name?.endsWith("School")).slice(0,5));

  setPlaces(extracted);
};
useEffect(() => {

    


    if (data && center){
      fetchPlaces();
    }

  }, [data]);




  
// أيقونة المدارس (أخضر)
const schoolIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// أيقونة المستشفيات (أحمر)
const hospitalIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// const [fullScreen , setFullScreen] = useState(false);

  return (
   <>
 
      <div className="container shadow h-full w-full flex justify-center items-center">
        <MapContainer
          className="sticky top-0"
          zoomControl={false}
          center={center}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <ZoomControl position="topright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* الماركر الأساسي للقاهرة */}
          <Marker position={[data?.lat || 0,data?.lon || 0]}>
            <Popup>{location}</Popup>
          </Marker>

          {/* الأماكن المستخرجة */}
          {places.map((p) => (
            <Marker 
                icon={p.name?.includes("School") ? schoolIcon : hospitalIcon} // مثال شرط
            key={p.id} position={[p.lat, p.lon]}>
              <Popup>{p.name}</Popup>
            </Marker>
          ))}
          <FlyToLocation position={[data?.lat || 0,data?.lon || 0]} />
        </MapContainer>
      </div>

   </>
  );
}

export default MapSingle;
