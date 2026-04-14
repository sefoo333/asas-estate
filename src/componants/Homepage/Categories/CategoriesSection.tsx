"use client"
import React, { useRef } from 'react'
import Head from '../../Head'
import Image from 'next/image'
import Category from './Category'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Categories() {
  const re:any = useRef(null);
  return (
    <div className="parent flex justify-center mt-30 max-2xl:my-10">
        <div className="container">
            <Head>Explore Real Estats</Head>
        <div className="wrapper relative">
               <div onClick={() => {
      re.current.scrollBy(420,0)
    }} className="icon absolute 2xl:hidden right-0 bg-white top-1/2 z-9 translate-y-[-50%] flex justify-center items-center p-2 cursor-pointer border border-[#ccc]  text-black w-fit rounded-full text-xl">
      <IoIosArrowForward />
    </div>
            <div ref={re} style={{scrollBehavior:"smooth",scrollbarWidth:"none"}} className="categories relative grid grid-cols-4 overflow-scroll w-full max-2xl:gap-97 max-2xl:px-6 gap-6 mt-13">
                <Category Title="Villa" image="/villa.jpg" Description='Explore Villas' />
                <Category Title='House' Description='Explore Houses' />
                <Category value={"commercial"} Title='Store' image="/store.jpg" Description='Explore Stores' />
                <Category Title='Combound' image='/Heroo.jpg' Description='Explore Combounds' />

    </div>
                  <div onClick={() => {
      re.current.scrollBy(-300 ,0)
    }} className="icon 2xl:hidden absolute left-0 bg-white top-1/2 z-9 translate-y-[-50%] flex justify-center items-center p-2 cursor-pointer border border-[#ccc]  text-black w-fit rounded-full text-xl">
  <IoIosArrowBack />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Categories


//  <div className="wrapper relative ">
//     <div onClick={() => {
//       re.current.scrollBy(300,0)
//     }} className="icon absolute right-[-20px] bg-white top-1/2 z-9 translate-y-[-50%] flex justify-center items-center p-2 cursor-pointer border border-[#ccc]  text-black w-fit rounded-full text-xl">
//       <IoIosArrowForward />
//     </div>
//   <div ref={re} className="wrapper overflow-x-hidden" style={{scrollBehavior:"smooth"}}>
//   <div className="cards mt-7 flex gap-4 w-[2000px]">
//     <div className="card border max-xl:h-fit border-[#ccc] rounded-xl w-fit">
//       <Image src={"/card_special.png"} className="max-xl:w-[300px]" alt="" width={400} height={200} />
//       <div className="text p-[20px]">
//         <h1 className="font-semibold text-xl">Pay Special Day!</h1>
//         <p>Enjoy up to 12% OFF</p>
//       </div>

//     </div>
//     <div className="card border max-xl:h-fit border-[#ccc] rounded-xl w-fit">
//     <Image src={"/card_special.png"} className="max-xl:w-[300px]" alt="" width={400} height={200} />
//     <div className="text p-[20px]">
//         <h1 className="font-semibold text-xl">Pay Special Day!</h1>
//         <p>Enjoy up to 12% OFF</p>
//       </div>

//     </div>
//     <div className="card border max-xl:h-fit border-[#ccc] rounded-xl w-fit">
//     <Image src={"/card_special.png"} className="max-xl:w-[300px]" alt="" width={400} height={200} />
//     <div className="text p-[20px]">
//         <h1 className="font-semibold text-xl">Pay Special Day!</h1>
//         <p>Enjoy up to 12% OFF</p>
//       </div>

//     </div>
//     <div className="card border max-xl:h-fit border-[#ccc] rounded-xl w-fit">
//     <Image src={"/card_special.png"} className="max-xl:w-[300px]" alt="" width={400} height={200} />
//     <div className="text p-[20px]">
//         <h1 className="font-semibold text-xl">Pay Special Day!</h1>
//         <p>Enjoy up to 12% OFF</p>
//       </div>

//     </div>
//     <div className="card border max-xl:h-fit border-[#ccc] rounded-xl w-fit">
//     <Image src={"/card_special.png"} className="max-xl:w-[300px]" alt="" width={400} height={200} />
//     <div className="text p-[20px]">
//         <h1 className="font-semibold text-xl">Pay Special Day!</h1>
//         <p>Enjoy up to 12% OFF</p>
//       </div>

//     </div>
//   </div>
//   </div>
//   <div onClick={() => {
//       re.current.scrollBy(-300 ,0)
//     }} className="icon absolute left-[-20px] bg-white top-1/2 z-9 translate-y-[-50%] flex justify-center items-center p-2 cursor-pointer border border-[#ccc]  text-black w-fit rounded-full text-xl">
//   <IoIosArrowBack />
//     </div>
//   </div>
// </div>
// </div>