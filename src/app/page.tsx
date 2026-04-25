"use client"
import Categories from "@/componants/Homepage/Categories/CategoriesSection";
import CTA from "@/componants/Homepage/CTA";
import { CarouselDemo } from "@/componants/Homepage/HeroSection";
import Products from "@/componants/Homepage/ProductsSection";
import Thanks from "@/componants/Homepage/Thanks";
import { useState } from "react";

export default  function Page() {
 const [test,setTe] = useState("")
 const [tesxt,setTe2] = useState("")
 const [tesxt2,setTe32] = useState("")
 const [tesst,setT3e] = useState("")
 const [test2,setTse] = useState("")

  return (
   <main>
    <CarouselDemo />
    <Products />
    <Categories />
    <Thanks />
    <CTA />
   </main>
  );
}