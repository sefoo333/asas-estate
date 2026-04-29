"use client"
import React from 'react'
import { Toaster } from 'sonner'
import dynamic from 'next/dynamic'
import LoadingProducts from './_components/LoadingProducts';

// ✅ dynamic فقط بدون import عادي لـ SwitcherMob
const SwitcherMob = dynamic(() => import("./_components/SwitcherMob"), {
    loading: () => <LoadingProducts />,
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Toaster />
      <div className='overflow-y-hidden'>
        <SwitcherMob />
        {/* <LoadingProducts /> */}
      </div>
    </>
  )
}