"use client"

import dynamic from "next/dynamic";
import LoadingProducts from "../buy/_components/LoadingProducts";

const SwitcherMobile = dynamic(() => import("./_components/SwitcherMob"), {
      loading: () => <LoadingProducts />,
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