'use client'

import { useUserStore } from '@/store/store';
import { User } from '@/types/User';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { SessionProvider, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user,setUser] = useState<User | null>(null);

const setUser = useUserStore((state) => state.setUser);


const {data, isLoading} = useQuery({
  queryKey:["user"],
  queryFn: async () => {
      const response = await fetch("/api/authUser/me");
      const res = await response.json();
        // if (!res.ok) {
        //   throw new Error("Failed to fetch user")
        // }
      return res?.user
  },
  refetchOnWindowFocus:false
  
});
useEffect(() => {
if (data) {
    setUser(data);

  }

  },[data])



  
   

  useEffect(() => {
    const getTheme = localStorage.getItem("theme") || "light";
document.documentElement.classList.add(getTheme);
  },[])


  return (
      <>
      <SessionProvider refetchOnWindowFocus={false}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* {!isLoading && !data?.id && (
          <div className="z-999 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white dark:bg-gray-900">
  <div className="loader"></div>
</div>
        )} */}
      {children}
      </SessionProvider>
      </>
  )
}
