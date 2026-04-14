"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function Crubchumb({parent , child}:{parent?:string,child?:string}) {
const pathj = usePathname();
const filtering:any = pathj?.split("/").slice(1)
useEffect(() => {
console.log(filtering.length !== (filtering[1] - 1))
},[])
  return (
    <nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-1 text-sm text-gray-700">
    <li>
      <Link href="/" className="block transition-colors hover:text-gray-900" aria-label="Home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>
    </li>

    <li className="rtl:rotate-180">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 20.247 6-16.5" />
      </svg>
    </li>

  {filtering?.map((e:any,a:any) => (
    <>
      <li>
      <Link href={`/${filtering.slice(0 ,a+1).join("/")}`} className="block transition-colors hover:text-gray-900"> {e} </Link>
    </li>

   {filtering.length !== (a + 1) &&  <li className="rtl:rotate-180">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 20.247 6-16.5" />
      </svg>
    </li>}
    </>
  ))}

 
  </ol>
</nav>
  )
}

export default Crubchumb