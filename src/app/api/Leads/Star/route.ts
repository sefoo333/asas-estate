import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request:Request) {
    const {rating, BrokerId, userId}:any = await request.json();

 try {
    const createStar = await prisma.rate.create({
    data:{
userId,
        BrokerId,
rating,
createdAt:new Date(),
    },
    include:{
        User:true,
        Broker:true
    }
 })   

 

 const updateBroker = await prisma.broker.update({
     where: {
         id: BrokerId
     },
     data: {
        reviewsCount:{increment:1},
        ratingSum:{increment:+rating},
     }
 })

 
 return NextResponse.json({message:"Rate created successfully", rate:createStar,broker:updateBroker},{status:200})
 
} catch (err){
    console.log(err)
    return NextResponse.json({message:"Error creating rate",err}, {status:500})
 }
}