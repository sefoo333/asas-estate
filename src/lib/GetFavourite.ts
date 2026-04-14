import { useQuery } from "@tanstack/react-query"

export const data = useQuery({
    queryKey:["Favourites"],
    queryFn:async () => {
      const res = await fetch(`/api/users/favourite`)
      const json = await res.json()
      return json
    },
    refetchOnWindowFocus:false
  })