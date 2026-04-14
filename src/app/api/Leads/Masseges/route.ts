import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(req:Request){
 const unLookCookie = (await cookies()).get("token")?.value;

    if (!unLookCookie) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const unLookToken: any = jwt.verify(unLookCookie, process.env.JWT_SECRET_KEY as string);

    if (!unLookToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }



const data = await prisma.lead.findMany({
    where:{idTo:unLookToken?.id , NOT:{massege:"review"}},
    include:{userSender:true,product:true}
})

            return NextResponse.json({massege:"success to get masseges !" , data:data}, {status:200})



}