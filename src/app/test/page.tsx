"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'


async function getPosts() {
  const res = await fetch('/api/test')
  return await res.json()
}


 function page() {

useEffect(() => {
    const fetchPosts = async () => {
      console.log(await getPosts());
    };
    fetchPosts();
},[])
  return (
  //  <div className="grid grid-cols-3 gap-4 h-[400px] w-[90%]">
  //     {/* العمود الأول (صورتين فوق بعض) */}
  //     <div className="flex flex-col gap-4">
  //       <Image
  //         src="/Hero.jpg"
  //          width={500}
  //         height={500}
  //         alt="Image 1"
  //         className="rounded-lg w-full h-1/2 object-cover"
  //       />
  //       <Image
  //         src="/Hero.jpg"
  //         alt="Image 2"
  //         width={500}
  //         height={500}
  //         className="rounded-lg w-full h-1/2 object-cover"
  //       />
  //       <Image
  //         src="/Hero.jpg"
  //         alt="Image 2"
  //         width={500}
  //         height={500}
  //         className="rounded-lg w-full h-1/2 object-cover"
  //       />
  //     </div>

  //     {/* العمود الثاني (صورة كبيرة) */}
  //     <div className="col-span-2">
  //       <Image
  //         src="/Hero.jpg"
  //         alt="Image 3"
  //          width={500}
  //         height={500}
  //         className="rounded-lg w-full h-full object-cover"
  //       />
  //     </div>
  //   </div>
  <div className="test">
    <h1>hello world</h1>
  </div>
  )
}

export default page