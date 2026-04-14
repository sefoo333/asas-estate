"use client"
import { useUserStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

function layout({children}:{children:React.ReactNode}) {

    const router = useRouter();
    const user = useUserStore((state) => state.user);
    useEffect(() => {
      console.log(user);
      console.log(user?.role)
if (user?.role !== "Admin" && user?.role !== undefined) {
    toast.error("Access Denied")
router.back()
}
    },[user?.role])

  return (
    <>
{children}
</>    
  )
}

export default layout