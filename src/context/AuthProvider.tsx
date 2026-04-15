'use client'

import { useUserStore } from '@/store/store';
import { User } from '@/types/User';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { SessionProvider, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react'

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
      {children}
      </SessionProvider>
      </>
  )
}
