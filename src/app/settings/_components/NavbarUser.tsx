"use client"
import { useUserStore } from '@/store/store'
import React from 'react'
import { GoBell } from 'react-icons/go'
import { LuUserRound } from 'react-icons/lu'
import UserSet from './NavBarSettings/UserSet'
import Notfications from './NavBarSettings/Notfications'
import { Menu, PanelRight } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'

function NavbarUser({who}:{who:string}) {
  const user = useUserStore((state) => state.user);
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
    return (
     <div className="navbar items-center shadow flex w-full bg-[#ffffff] justify-between px-10 max-md:px-5 py-5">
      <div className="box flex gap-3 items-center">
      <PanelRight onClick={toggleSidebar} className='' size={19} />
         <h1 className='font-semibold text-lg'>{who} Panel</h1>
      </div>
   <div className="icons flex gap-3">
     <Notfications />
<UserSet />
   </div>
       </div>
  )
}

export default NavbarUser