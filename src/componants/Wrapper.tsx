"use client"
import Footer from "./Homepage/Footer";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function Wrapper({children}: {children: React.ReactNode}) {
    const path = usePathname();
  const isDashboard = path.startsWith("/settings") || path.startsWith("/login");

  return (
       <>
        {!isDashboard && <Navbar />}
        {children}
        {!isDashboard && <Footer />}
       </>
  );
}