"use client"
// import type { Metadata } from 'next'

import dynamic from 'next/dynamic';
import LoadingProducts from '../buy/_components/LoadingProducts';
const SwitcherMobi = dynamic(() => import("./_components/SwitcherMob"), {
      loading: () => <LoadingProducts />,
  ssr: false,
});
// export const metadata:Metadata = {
//     title:"3qare - rent",
//     description:"buy and rent any real estats"
// }

function page() {


  return (
    <>
    <SwitcherMobi />
    </>
  )
}

export default page