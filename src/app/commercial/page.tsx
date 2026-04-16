
"use client"
// import type { Metadata } from 'next'

import dynamic from 'next/dynamic';
const SwitcherMobi = dynamic(() => import("./_components/SwitcherMob"), {
  ssr: false,
});
// export const metadata:Metadata = {
//     title:"Asas - commercial",
//     description:"buy and rent any real estats"
// }

function page() {

  
   
  return (
   <SwitcherMobi />
  )
}

export default page