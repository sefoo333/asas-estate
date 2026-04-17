"use client"
import { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import UserSet from '@/app/settings/_components/NavBarSettings/UserSet';
import { ToggleNavMenu } from './ToggleNavMenu';
import { useUserStore } from '@/store/store';
import { LogIn } from 'lucide-react';

function Navbar() {

      const [active,setActive] = useState(false)
  const path = usePathname();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (["/commercial" , "/rent" , "/buy"].includes(path)) {
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }
  },[path])

      useEffect(() => {
         window.onscroll =(e) => {
          if (window.scrollY >= 100){
              setActive(true)
          }else{
              setActive(false)
          }
         }
      },[])

        const {data} = useQuery({
    queryKey:["Favourites"],
    queryFn:async () => {
      const res = await fetch(`/api/users/favourite`)
      const json = await res.json()
      return json
    },
    refetchOnWindowFocus:false
  })

  return (
 <header className={`bg-[#ffffffab] dark:bg-gray-800 dark:border-b dark:border-b-gray-700 backdrop-blur-xl sticky duration-500 z-50 w-full  ${["/" , "/brokers" , "/contact"].includes(path) ? `${!active ? "top-[-300px]" : "top-0"} ` : ""}`}>
  <div className="mx-auto flex h-26 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
    <a className="block text-teal-600" href="#">
      {/* <span className="sr-only">Home</span>
      <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
          fill="currentColor"
        />
      </svg> */}
     <Link href={"/"}>
      <Image className='w-25 h-15 object-contain dark:absolute dark:hidden' src={"/thya_masr.png"} alt='Logo' width={100} height={100} />
      <Image className='w-25 h-15 object-contain absolute dark:relative' src={"/logo-2.png"} alt='Logo' width={100} height={100} />
     </Link>
     
    </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        <ul className="flex items-center  font-semibold gap-6 text-sm">
          <li>
            <Link className="text-[#4e515b] dark:text-white transition hover:text-[#3f4147]" href="/buy"> Buy </Link>
          </li>

          <li>
            <Link className="text-[#4e515b] dark:text-white transition hover:text-[#3f4147]" href="/rent"> Rent </Link>
          </li>

          <li>
            <Link className="text-[#4e515b] dark:text-white transition hover:text-[#3f4147]" href="/commercial"> commercial </Link>
          </li>
          <li>
            <Link className="text-[#4e515b] dark:text-white transition hover:text-[#3f4147]" href="/brokers"> Brokers </Link>
          </li>

          {/* <li>
            <Link className="text-[#4e515b] transition hover:text-[#3f4147]" href="/contact"> Contact </Link>
          </li> */}

         

     
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4 items-center flex-row-reverse relative">
        {/* <div className='size-10 rounded-full bg-red-300'></div> */}
       {/* <Image src={"/images.jpg"} alt='' width={30} height={30} className='size-10 rounded-full' /> */}
       {user?.id ? <UserSet /> :  <Link href={"/login"}>
       <div className='bg-gray-100 rounded-full border border-gray-300 dark:!bg-gray-800  dark:!border-gray-600 p-2'>
 <LogIn className='cursor-pointer'  size={21} />
        </div>
       </Link> }

{/* <div className="cart flex gap-2">
     <IoCartOutline size={25} />
     <span>30.00$</span>
</div> */}
       <Link  href={user ? "/settings/Favourites" : ""} className="text-gray-600 max-md:hidden dark:text-gray-300  relative transition hover:text-gray-600/75">
      {data?.length > 0 &&  <div className='w-3 h-3 absolute -left-1.5 -top-1 flex justify-center items-center text-sm bg-red-400 rounded-full text-white'>
       </div>}
          <FaRegHeart size={25} />
        </Link>
{/* <div className="search relative flex items-center transition">
    <BiSearch size={20} className='z-1 left-3 absolute' />
    <input type="text" placeholder='Search Any Products' className=' w-[300px] pl-10 text-sm p-3 transition outline-0 bg-[#eeeeee] rounded-full' />
</div> */}
        </div>



        <ToggleNavMenu />
      </div>
    </div>
  </div>
</header>
  )
}

export default Navbar
