"use client"
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import {  IoSettingsOutline  } from "react-icons/io5";
import { BsHouses } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import Image from 'next/image';
import { RxDashboard } from 'react-icons/rx';
import { CgLogOut } from "react-icons/cg";
import Link from 'next/link';
import { FiHome, FiUser, FiUserPlus, FiUsers } from "react-icons/fi";
import { BsHouseAdd } from "react-icons/bs";
import { MdOutlineMarkunreadMailbox } from 'react-icons/md';
import { useUserStore } from '@/store/store';
import { User } from 'lucide-react';

function SidebarSettings() {

  const user:any = useUserStore((state) => state.user)


    

  const dark = false
    const menuItems = [
      { icon: IoSettingsOutline, label: "Public" , link:"public" },
        { icon: FiUser, label: "Account" , link:"Account" },
        // { icon: HiOutlineCreditCard, label: "Credit Cards" , link:"Cards" },
        { icon: AiOutlineHeart , label: "Favourite" , link:"Favourites" },
    ];
    const BrokerMenu = [
      { icon: RxDashboard, label: "Dashboard" , link:"dashboard" },
      {icon:MdOutlineMarkunreadMailbox  , label:"Masseges" , link:"masseges" },
              { icon: FiUser, label: "Broker" , link:"Broker" },
        { icon: BsHouses, label: "RealEstats" , link:"realestates" },
        { icon: BsHouseAdd, label: "Create New" , link:"create" },
    ]

    const AdminMenu = [
      {icon:FiUserPlus , label:"Requests" , link:"RequestsBroker"},
      {icon:FiUsers , label:"Users" , link:"users"},
      {icon:FiHome , label:"Properties" , link:"properties"}
    ]
  return (
      <Sidebar >
    <SidebarHeader className='mb-0'>
      {/* <h1 className='text-start text-3xl font-bold my-4 ml-4'>Sefoo</h1> */}
<Link href={"/"}>
      <Image className=' w-32 h-12 mt-4 object-contain rounded-xl dark:hidden ' src={"/logo-3.png"} alt='' width={100} height={100} />
      <Image className=' w-32 h-12 mt-4 object-contain rounded-xl' src={"/logo-2.png"} alt='' width={100} height={100} />
</Link>
    </SidebarHeader>
    <SidebarContent>
        <SidebarGroup>
            {/* <SidebarGroupLabel>
                General
            </SidebarGroupLabel> */}
            <SidebarGroupContent className='list-none '>
             <SidebarGroup>
              <SidebarGroupLabel className='font-semibold ml-[-4px]'>User</SidebarGroupLabel>
              <SidebarContent>
                 {menuItems.map((e:{label:string , icon:any , link:string}) => (
                <SidebarMenuItem className='focus:bg-transparent'  key={e.label}>
                     <Link href={"/settings/" + e.link}>
                      <SidebarMenuButton className=' cursor-pointer flex items-center' >
                        <e.icon size={25} className="!h-5 !w-5" />
                        <span className='font-medium ml-1.5'>{e.label}</span>
                      </SidebarMenuButton>
                     </Link>
                </SidebarMenuItem>
              ))}
              </SidebarContent>
             </SidebarGroup>
           
             { user?.role !== "user" &&
            <SidebarGroup>
              <SidebarGroupLabel className='font-semibold ml-[-4px] '>Broker</SidebarGroupLabel>
              <SidebarContent>
                 {BrokerMenu.map((e:{label:string , icon:any , link:string}) => (
                 <SidebarMenuItem  key={e.label}>
                     <Link href={"/settings/BrokerPage/" + e.link}>
                      <SidebarMenuButton className=' cursor-pointer flex items-center ' >
                        <e.icon size={25} className="!h-5 !w-5" />
                        <span className='font-medium ml-1.5'>{e.label}</span>
                      </SidebarMenuButton>
                     </Link>
                </SidebarMenuItem>
              ))}
              </SidebarContent>
             </SidebarGroup>
             
            }
            {
              user?.role === "user" &&
            <SidebarGroup>
                            <SidebarGroupLabel className='font-semibold ml-[-4px] '>Broker</SidebarGroupLabel>

              <SidebarContent>
                <SidebarMenuItem  >
                     <Link href={"/settings/cameAbroker"}>
                      <SidebarMenuButton className=' cursor-pointer flex items-center ' >
                        <User size={25} className="!h-5 !w-5" />
                        <span className='font-medium ml-1.5'>Become a Broker</span>
                      </SidebarMenuButton>
                     </Link>
                </SidebarMenuItem>
              </SidebarContent>
            </SidebarGroup>}

             {user?.role === "Admin" &&  
            (<SidebarGroup>
              <SidebarGroupLabel className='font-semibold ml-[-4px] '>Admin</SidebarGroupLabel>
              <SidebarContent>
                 {AdminMenu.map((e:{label:string , icon:any , link:string}) => (
                 <SidebarMenuItem  key={e.label}>
                     <Link href={"/settings/AdminPage/" + e.link}>
                      <SidebarMenuButton className=' cursor-pointer flex items-center ' >
                        <e.icon size={25} className="!h-5 !w-5" />
                        <span className='font-medium ml-1.5'>{e.label}</span>
                      </SidebarMenuButton>
                     </Link>
                </SidebarMenuItem>
              ))}
              </SidebarContent>
             </SidebarGroup>
            )
          }
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContent>
    <SidebarFooter className=' p-3'>
<div className="flex  my-5 items-center justify-between">
   <div className="account flex items-center  gap-3">
     <Image className="logo w-9 h-9 rounded-xl " src={user?.image} alt='' width={50} height={50} />
<div className="text">
    <h1 className='font-semibold text-sm'>{user?.userName}</h1>
    <h2 className='text-[12px]'>{user?.email}</h2>
</div>
   </div>
   <div className="logout">
<CgLogOut size={21} className='' />
   </div>
</div>
    </SidebarFooter>
   </Sidebar>
  )
}

export default SidebarSettings