
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useSearchProducts = (type: string) => {

  const params:any = useSearchParams();

  const searchProducts = async () => {
   const res = await fetch(`/api/RealEstats/RealEstates/search?${new URLSearchParams(params.entries())}`)
   const json = await res.json()
   return json.data
 }

const {data:Data,isLoading} = useQuery({
  queryKey:["SearchRealEstats"],
  queryFn:searchProducts,
  enabled:params?.size > 0,
  refetchOnWindowFocus:false
})

  return { Data, isLoading }
}