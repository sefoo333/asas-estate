"use client"

import { IoLocationSharp } from "react-icons/io5";
import React, { useEffect } from 'react'
import Image from "next/image";
import { GiLoveHowl, GiLovers } from "react-icons/gi";
import { GoHeart } from "react-icons/go";
import { IoChatboxEllipses } from "react-icons/io5";
import Head from "@/componants/Head";
import { FaBath, FaBed } from "react-icons/fa";
import Product from "@/componants/Product";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductsCarsoul from "./ProductsCarsoul";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

function Products() {

  const {data,isLoading} = useGetProducts("All");

  return (
    <div className="parent max-md:mt-35 mt-25 flex justify-center ">
        <div className="container">
            <Head>Explore New Projects</Head>
            <div className="products max-xl:hidden grid grid-cols-4 gap-3 mt-15">
            
            {data?.slice(0,4).map((e:any) => (
              
              <Product key={e?.id} product={e} />
            ))}
            
            

            </div>
<ProductsCarsoul data={data} /> 

            <div className="flex justify-center cursor-pointer" >
            <Link href={"/buy"}>
                <Button variant={"outline"} className="my-5 p-6 font-semibold bg-blue-600 text-white cursor-pointer">Explore More Projects</Button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default Products