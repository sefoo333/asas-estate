import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export async function GET(req:Request){
const {searchParams} = new URL(req.url);
 const limit = searchParams.get("limit") || 10;
 
 const unLookCookie = (await cookies()).get("token")?.value;
 let unLookToken:any = null;
    if (unLookCookie) {
    //    return NextResponse.json({ message: "No token found" }, { status: 401 });
  unLookToken = jwt.verify(unLookCookie , process.env.JWT_SECRET_KEY as any) ;
     }
 
 
try {
    const getBrokers = await prisma.broker.findMany({
        where: unLookToken ? { NOT: { id: unLookToken.id } } : {},
        select:{id:true,languages:true,company:true,userName:true,rates:true,image:true, realEstates: {select: {id: true,price: true,}}},
        take: parseInt(limit as string)
    });




return Response.json({message:"Brokers fetched successfully",data:getBrokers}, {status:200});
} catch (err) {
    return Response.json({message:"Error fetching brokers" , err:err}, {status:500})
}
}

