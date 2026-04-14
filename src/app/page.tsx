import Categories from "@/componants/Homepage/Categories/CategoriesSection";
import CTA from "@/componants/Homepage/CTA";
import { CarouselDemo } from "@/componants/Homepage/HeroSection";
import Products from "@/componants/Homepage/ProductsSection";
import Thanks from "@/componants/Homepage/Thanks";
import Navbar from "@/componants/Navbar";
import Image from "next/image";

export default function page() {
  return (
   <div>
    <CarouselDemo />
     <Products />
    <Categories />
    <Thanks />
    <CTA />
   </div>
  );
}
