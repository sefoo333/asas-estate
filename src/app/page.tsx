import Categories from "@/componants/Homepage/Categories/CategoriesSection";
import CTA from "@/componants/Homepage/CTA";
import { CarouselDemo } from "@/componants/Homepage/HeroSection";
import Products from "@/componants/Homepage/ProductsSection";
import Thanks from "@/componants/Homepage/Thanks";

export default  function Page() {


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