"use client"
import React from 'react'
import { Toaster } from 'sonner'
import dynamic from 'next/dynamic'

// ✅ dynamic فقط بدون import عادي لـ SwitcherMob
const SwitcherMob = dynamic(() => import("./_components/SwitcherMob"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Toaster />
      <div className='overflow-y-hidden'>
        <SwitcherMob />
      </div>
    </>
  )
}