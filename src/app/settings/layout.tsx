"use client"
import React, { useEffect, useState } from 'react'
import SidebarSettings from './_components/Sidebar'
import Crubchumb from './_components/crubchumb'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Account from './_components/nestedPages/AccountPage/Account'
import Cards from './_components/nestedPages/CardsPags/Cards'
import Real from './_components/nestedPages/RealEstatPage/Real'
import Favourite from './_components/nestedPages/FavouritePage/Favourite'
import { GoBell } from "react-icons/go";
import { User } from 'lucide-react'
import { LuUserRound } from 'react-icons/lu'
import { Toaster } from '@/components/ui/sonner'
import NavbarUser from './_components/NavbarUser'
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@/store/store'
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