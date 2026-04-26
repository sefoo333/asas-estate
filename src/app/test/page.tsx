"use client"

import { useEffect } from "react"

function page() {

    const createFFF = async () => {
        await fetch("/api/RealEstats/addRealEstate",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                images:["https://res.cloudinary.com/dj2rasyos/image/upload/w_800,q_auto,f_auto/v1776327035/unmghahrb7yjfj26vnmn.jpg","https://res.cloudinary.com/dj2rasyos/image/upload/w_800,q_auto,f_auto/v1776327052/znjf8udt2pqi3iburb5u.webp"],
          title:"Test page",
description:"This is a test page",
price:100000,
location:"Cairo",
beds:3,
Baths:2,
Sqft:1500,
type:"Apartment",
features:["Balcony","Swimming Pool"],
currency:"USD",
TransactionType:["Sale","Rent"][Math.floor(Math.random() * 2)],

            })
            
        }).then((res) => console.log(res.json()));
    }

    useEffect(() => {
for (let i = 0; i < 50; i++) {
    createFFF();
}
    },[])

  return (
    <div>page</div>
  )
}

export default page