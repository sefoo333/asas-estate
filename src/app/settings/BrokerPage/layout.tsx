"use client"
import { useUserStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { GoBell } from 'react-icons/go';
import { LuUserRound } from 'react-icons/lu';
import { toast } from 'sonner';
import NavbarUser from '../_components/NavbarUser';
import { useQuery } from '@tanstack/react-query';

function layout({children}:{children:React.ReactNode}) {

    const router = useRouter();

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
  if (isLoading) return;

  if (!data) return; 

  if (data.role !== "Broker" && data.role !== "Admin") {
    toast.error("Access Denied");
    router.replace("/");
  }
}, [isLoading, data]);



  return (
    <>
{children}
</>    
  )
}

export default layout