import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export async function GET(req:Request){
const {searchParams} = new URL(req.url);
 const limit = searchParams.get("limit") || 10;
 
//  const unLookCookie = (await cookies()).get("token")?.value;
 
//     if (!unLookCookie) {
//        return NextResponse.json({ message: "No token found" }, { status: 401 });
//      }
 
//  const  unLookToken:any = jwt.verify(unLookCookie , process.env.JWT_SECRET_KEY as any) ;
 
 
 
//  if (!unLookToken){
//      return NextResponse.json({message:"Unauthorized"}, {status:401})
//  }
 
 
try {
    const getBrokers = await prisma.broker.findMany({
        // where:{NOT:{id:unLookToken.id}},
        include:{realEstates:true},
        take:Number(limit)
    });




return Response.json({message:"Brokers fetched successfully",data:getBrokers}, {status:200});
} catch (err) {
    console.log(err)
    return Response.json({message:"Error fetching brokers" , err:err}, {status:500})
}
}

