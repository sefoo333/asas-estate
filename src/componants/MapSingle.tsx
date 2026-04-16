"use client";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import { useQuery } from "@tanstack/react-query";
import FlyToLocation from "./Map/ToLocation";

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

function MapSingle({location , setNearbySchools,setDataLocation}:{location:string,setNearbySchools:any,setDataLocation:any}) {
  const [active, setActive] = useState(false);
  const [center,setCenter] = useState<[number, number]>([0,0]); 
  const [places, setPlaces] = useState<Place[]>([]);
  
  const {data} =  useQuery({
    queryKey: ['searchLocation', location],
    queryFn: async () => {
      
      const res = await fetch(`/api/getLocation?q=${location}`)
      
      const data = await res.json()
      // setDataLocation([data[0]?.lat || 30.0444, data[0]?.lon || 31.2357])
      setCenter([data[0]?.lat, data[0]?.lon])
  setDataLocation([data.lat ?? 30.0444, data.lon ?? 31.2357])

      return data[0];
    },
    refetchOnWindowFocus:false
  })



const fetchPlaces = async () => {

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="school"](around:5000,${center[0]},${center[1]});
      node["amenity"="hospital"](around:5000,${center[0]},${center[1]});
    );
    out body;
  `;


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
    name: el.tags?.name || "unknown",
  }));

setNearbySchools(extracted.filter((p) => p.name?.endsWith("School")).slice(0,5));

  setPlaces(extracted);
};
useEffect(() => {

    


    if (data && center){
      fetchPlaces();
    }

  }, [data]);




const schoolIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


const hospitalIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


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

          <Marker position={[data?.lat || 0,data?.lon || 0]}>
            <Popup>{location}</Popup>
          </Marker>

          {places.map((p) => (
            <Marker 
                icon={p.name?.includes("School") ? schoolIcon : hospitalIcon} 
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
