"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuUserRound } from 'react-icons/lu'
import Link from 'next/link'
import { useUserStore } from '@/store/store'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { LogIn } from 'lucide-react'
function UserSet() {
  const user:any = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

const logOutFromProvider = async () => {

  if (user?.provider === "google" || user?.provider === "facebook"){
    await signOut({ callbackUrl: "/login" })
  };
}

  const logOut = async () => {
    try {
      await fetch("/api/authUser/logout",{method:"POST"})
      
    await logOutFromProvider?.();

    await logout?.();
      toast.success("LogOut Success")
    } catch(err){
      toast.error("something went wrong")
    }
  }
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
        
      {user?.image ? <Image src={user?.image || "/images.jpg"} alt='' width={30} height={30} className='size-9 border border-gray-300 dark:border-gray-600 rounded-full' /> : (
        <div className='bg-gray-100  rounded-full border border-gray-300 dark:!bg-gray-800  dark:!border-gray-600 dark:text-gray-300 p-2'>
 {user?.id ? <LuUserRound className='cursor-pointer'  size={21} /> : <LogIn className='cursor-pointer'  size={21} />}
        </div>
      )}
  </DropdownMenuTrigger>
  <DropdownMenuContent align='end'>
    <DropdownMenuGroup className={!user?.id ? "hidden" : ""}>
      <DropdownMenuItem>
      <div className='flex flex-col text-start'>
          <h1 className='font-semibold'>{user?.userName}</h1>
        <h3 className='text-gray-700 text-[12px] dark:text-gray-400'>{user?.email}</h3>
      </div>
      </DropdownMenuItem>
          <DropdownMenuSeparator />

      <DropdownMenuItem><Link href={`/settings/Account`}>Profile</Link></DropdownMenuItem>
      <DropdownMenuItem><Link href={`/settings/public`}>Settings</Link></DropdownMenuItem>
      <DropdownMenuItem><Link href={`/settings/Favourites`}>Favourites</Link></DropdownMenuItem>
      <DropdownMenuItem onClick={() => logOut()} className='text-red-400'>Log out</DropdownMenuItem>
      <DropdownMenuGroup>
        
      </DropdownMenuGroup>
    </DropdownMenuGroup>
    <DropdownMenuGroup className={user?.id ? "hidden" : ""}>
            <DropdownMenuItem><Link href={`/login`}>Login</Link></DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default UserSet