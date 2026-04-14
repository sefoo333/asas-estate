"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
    const router= useRouter();
    useEffect(() => {
router.replace("/settings/BrokerPage/dashboard")
    },[])
  return (
    <div></div>
  )
}

export default page