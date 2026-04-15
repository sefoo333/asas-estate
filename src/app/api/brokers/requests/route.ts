import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import prisma from "@/lib/db";

export async function GET(req:Request){
const unLookCookie = (await cookies()).get("token")?.value;

   if (!unLookCookie) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }
const  unLookToken:any = jwt.verify(unLookCookie , process.env.JWT_SECRET_KEY as string);
if (!unLookToken){
    return NextResponse.json({message:"Unauthorized"}, {status:401})
}
const getUser = await prisma.user.findUnique({
    where:{id:unLookToken?.id},
})

if (getUser?.role !== "Admin"){
        return NextResponse.json({message:"Access denied"}, {status:401})

}

try {

    const getDataRequests = await prisma.requestBroker.findMany();
        return NextResponse.json({message:"success fetch",data:getDataRequests}, {status:200})
} catch (err){
        return NextResponse.json({message:"failed to get"}, {status:500})
}


}