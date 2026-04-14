
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useSearchProducts = (type: string) => {
  const [Data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const params:any = useSearchParams();

  useEffect(() => {
   const searchProducts = async () => {
    console.log(params.entries())
    const res = await fetch(`/api/RealEstats/RealEstates/search?${new URLSearchParams(params.entries())}`)
    const json = await res.json()
    setData(json.data)
  }

if (params.size > 0){
        searchProducts()
}
}, [type])

  return { Data, loading }
}