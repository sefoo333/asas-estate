"use client"

import dynamic from "next/dynamic";

const SwitcherMobile = dynamic(() => import("./_components/SwitcherMob"), {
  ssr: false,
});

function page() {
  return (
    <>
    <SwitcherMobile />
    </>
  )
}

export default page