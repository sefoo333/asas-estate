
"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useGetProducts = (type?: string , id?:string | any) => {
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const res = await fetch(`/api/RealEstats/RealEstates?${type !== "" ? `type=${type}` : `idBroker=${id}`}`)
    const json = await res.json()
   return json?.data
  }
  const {data , isLoading} = useQuery({
    queryKey:["fetchProducts"],
    queryFn:fetchData,
  refetchOnWindowFocus:false
  })

  return { data, isLoading }
}