
"use client"

import { useQuery } from "@tanstack/react-query"

export const useGetProducts = (type?: string , id?:string | any, limit?:string,landing?:boolean) => {

  const fetchData = async () => {
    const res = await fetch(`/api/RealEstats/RealEstates?${type !== "" ? `type=${type}` : `idBroker=${id}`}&limit=${limit || 7}&landing=${landing || false}`)
    const json = await res.json()
   return json?.data
  }
  
  const {data , isLoading} = useQuery({
    queryKey:["fetchProducts"],
    queryFn:fetchData,
  refetchOnWindowFocus:false,
  enabled:!!type || !!id,
  })

  return { data, isLoading }
}