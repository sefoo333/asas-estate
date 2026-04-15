"use client"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useMediaQuery } from "react-responsive"
import SearchBrokerMob from "./SearchBrokerMob"
import SearchBroker from "./searchBat"
import BoxBrokerMob from "../../_components/BoxBrokerMob"
import BoxBroker from "../../_components/BoxBroker"
import NotFound from "@/componants/NotFound"

export function SearchContent() {
  const params = useSearchParams()
  const queryString = params.toString()

  const { data } = useQuery({
    queryKey: ["searchBroker", queryString],
    queryFn: async () => {
      const fetcher = await fetch(`/api/brokers/searchAll?${queryString}`)
      const json = await fetcher.json()
      return json.data
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  })

  const isMob = useMediaQuery({ maxWidth: 767 })

  return (
    <div className="container flex flex-col items-center w-[90rem] max-md:w-full max-md:px-5">
      {isMob ? <SearchBrokerMob /> : <SearchBroker />}
      <div className="brokers mb-5 w-full justify-start grid grid-cols-2 max-md:grid-cols-1 flex-col mt-10 gap-8">
        {data?.length > 0 ? (
          <>
            {data?.map((e: any) => (
              <>
                {isMob
                  ? <BoxBrokerMob data={e} key={e} />
                  : <BoxBroker data={e} key={e} />
                }
              </>
            ))}
          </>
        ) : (
          <div className='relative w-100% h-[400px] grid col-span-2'>
            <NotFound />
          </div>
        )}
      </div>
    </div>
  )
}