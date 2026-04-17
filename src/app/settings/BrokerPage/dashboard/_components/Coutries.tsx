import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image"
import CountryBox from "./CountryBox";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/store";
import { useEffect } from "react";


export default function Countries() {

  const user = useUserStore((state) => state?.user)

 const {data:masseges} = useQuery({
    queryKey:["MassegesKey"],
    queryFn: async () => { 
      const res =  await fetch(`/api/Leads/Masseges?idUser=${user?.id}`)
      const json = await res.json()
      
      return json?.data
  },
  refetchOnWindowFocus:false,
  })

const countriesArray = Object.entries(
  masseges?.reduce((acc:any, msg:any) => {
    const country = msg?.userSender?.location;
    const code = msg?.userSender?.locationCode;
    if (!country || !code) return acc;
    const key = `${country} (${code})`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {}
).map(([key, leads]) => {
  // ممكن تفصل الاسم والكود لو محتاج
  const match = key.match(/^(.*) \((.*)\)$/);
  return {
    location: match?.[1] || key,
    locationCode: match?.[2] || "",
    leads,
  };
});
useEffect(() => {
  
},[masseges])


  return (

    <div className="py-4 border border-gray-100 shadow rounded-xl bg-white  dark:!bg-gray-800  dark:!border-gray-600 ">
 <h2 className=" px-4 font-semibold mb-0.5 border-b border-b-gray-100 pb-4 dark:!border-gray-600 ">Area Map</h2>
      <div className="countries mt-4 px-4">
{countriesArray?.map((z,i:number) => <CountryBox data={z} key={i} />)}
      </div>
    </div>
  );
}
