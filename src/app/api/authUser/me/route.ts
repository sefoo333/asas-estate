import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import prisma from "@/lib/db";


export async function GET(request:Request) {
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



return NextResponse.json({message:"User fetched successfully",user:getUser}, {status:200})

}