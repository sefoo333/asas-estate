import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useUserStore } from "@/store/store"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { CgClose, CgLogOut } from "react-icons/cg"

const data = [
  { name: "Buy", href: "/buy", value: "buy" },
  { name: "Rent", href: "/rent", value: "rent" },
  { name: "Commercial", href: "/commercial", value: "commercial" },
  { name: "Find agent", href: "/brokers", value: "stop", },
  {name:"Favourites" , href:"/settings/Favourites", value:"favourites"},
  {name:"Settings" , href:"/settings/Account", value:"settings"}
]

export function ToggleNavMenu() {
    const path = usePathname();
    const user = useUserStore((state) => state.user)
    const [open,setOpen] = useState(false);
  return (
    <Drawer defaultOpen={open}  direction="left">
      <DrawerTrigger asChild>
 <button
          className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
              </DrawerTrigger>
      <DrawerContent className="!w-full z-999">
        <DrawerHeader className="border-b border-b-gray-300 mb-5">
          <DrawerTitle className="flex relative gap-4 items-center justify-center" >
              <Link href={"/"}>
      <Image className='w-25 h-15 object-contain' src={"/thya_masr.png"} alt='Logo' width={100} height={100} />
     </Link>
           <DrawerClose>
             <CgClose  size={25} className="absolute left-3 top-1/2 -translate-y-1/2 " />
           </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4">
           
       <nav aria-label="Global" className=" md:block">
        <ul className="flex  flex-col font-semibold  gap-2 ">
        
        {data?.map((e) =>  
             <li className={`p-3 transition-all ${path === e.href ? "bg-primary/20 !text-primary rounded-lg" : ""} ${e.value === "stop" ? "border-t border-t-gray-200" : ""}`}>
            <Link className="text-[#4e515b] dark:text-white transition hover:text-[#3f4147]" href={e.href}> {e.name} </Link>
          </li>)}

          

          {/* <li>
            <Link className="text-[#4e515b] transition hover:text-[#3f4147]" href="/contact"> Contact </Link>
          </li> */}

         

     
        </ul>
      </nav>

        </div>

        <DrawerFooter>
           <div className="flex  my-5 items-center justify-between">
              <div className="account flex items-center  gap-3">
                <Image className="logo w-9 h-9 rounded-xl " src={user?.image} alt='' width={50} height={50} />
           <div className="text">
               <h1 className='font-semibold text-sm'>{user?.userName}</h1>
               <h2 className='text-[12px]'>{user?.email}</h2>
           </div>
              </div>
              <div className="logout">
           <CgLogOut size={21} className='' />
              </div>
           </div>
        </DrawerFooter>
       
      </DrawerContent>
    </Drawer>
  )
}
