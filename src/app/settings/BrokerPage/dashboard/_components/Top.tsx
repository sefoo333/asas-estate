import React, { useEffect, useState } from 'react'
import ProTopBox from './ProTopBox'
import { useGetProducts } from '@/hooks/useGetProducts'
import { useUserStore } from '@/store/store'
import { useQuery } from '@tanstack/react-query'

function Top() {
const user = useUserStore((state) => state.user);
const {data} = useGetProducts("" , user?.id)
const [dataPro,setData]:any = useState([]);
 const {data:masseges} = useQuery({
    queryKey:["MassegesKey"],
    queryFn: async () => { 
      const res =  await fetch(`/api/Leads/Masseges?idUser=${user?.id}`)
      const json = await res.json()
      console.log("tsa",json)
      return json?.data
  },
  refetchOnWindowFocus:false,
  })

  // const setrr = () => {
  //     data?.forEach((e:any) => {
  //   setData((x:any) => [...x , {...e , leads:masseges?.filter((z) => z?.productId === e?.id)?.length}])
  //  })
  // }

  useEffect(() => {

    data?.forEach((e:any) => {
    setData((x:any) => [...x , {...e , leads:masseges?.filter((z:any) => z?.productId === e?.id)?.length}])
   })
     
  
  },[data])


  return (
        <div className="py-4 border border-gray-100  shadow rounded-xl bg-white">
 <h2 className=" px-4 font-semibold mb-0.5 border-b border-b-gray-100 pb-4 ">Top Properties</h2>
      {/* <h3 className="text-sm px-4 font-medium text-[#9fa3af] border-b border-b-gray-100 pb-3">Monthly Sales Overview</h3> */}
      <div className={`boxs px-4 mt-4 ${dataPro?.length > 6 ? "overflow-y-scroll" : ""}`}>
  {dataPro?.length > 0 ? (
    <>
    {
    dataPro?.map((e:any) => (
      <ProTopBox key={e?.id} data={e} />
    ))
  }
    </>
  ) : <h1 className='font-semibold  animate-fade-in text-center py-5'>No properties created</h1>}

      </div>
</div>
  )
}

export default Top