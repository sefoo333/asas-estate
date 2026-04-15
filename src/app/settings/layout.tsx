"use client"
import React, { useEffect, useState } from 'react'
import SidebarSettings from './_components/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import NavbarUser from './_components/NavbarUser'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import { useQuery } from '@tanstack/react-query'

function layout({children}: {children: React.ReactNode}) {
const pathName = usePathname().split("/").slice(1);
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
  if (isLoading) return; // ⛔ استنى

  if (!data) {
    toast.error("You are not signed in!");
    router.replace("/login");
  }
}, [isLoading, data]);

  


  return (
    <>
    <Toaster />
    <div className='flex max-md:w-full'>
     <SidebarProvider   >
       <div className="sidebar">
         <SidebarSettings  />
       </div>
   <div className="flex flex-col w-full  ">
   <NavbarUser  who={pathName[1] !== "BrokerPage" ? "User" : "Broker"} />
        <div className="pl-5 max-md:p-0">
          {children}
        </div>
   </div>
        {/* <Cards /> */}
      </SidebarProvider>
    </div>
      </>
  )
}

export default layout