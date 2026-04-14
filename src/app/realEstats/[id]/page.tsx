"use client"
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import DesktopView from './components/DesktopView';
import { useParams } from 'next/navigation';
import MobileView from './components/MobileView';

function page({params}:any) {
  const isMob = useMediaQuery({maxWidth:767});
      const wParams = useParams();
  
    return (
    <>
    {isMob ? <MobileView wParams={wParams} /> : <DesktopView wParams={wParams} />}
    </>
  )
}

export default page