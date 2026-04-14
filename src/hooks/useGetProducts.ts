
"use client"

import { useEffect, useState } from "react"

export const useGetProducts = (type?: string , id?:string | any) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/RealEstats/RealEstates?${type !== "" ? `type=${type}` : `idBroker=${id}`}`)
      const json = await res.json()
      console.log("tsae",json , id)
      setData(json.data)
      setLoading(false)
    }

    fetchData()
  }, [type , id])

  return { data, loading }
}