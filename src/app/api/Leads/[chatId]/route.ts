import prisma from "@/lib/db";
import { NextResponse } from "next/server";

 


 export async function GET(req:Request , { params }: { params: { chatId: string } }){
    const id =  params?.chatId;


    if (!id){
        return NextResponse.json({massege:"id is reqirued"} , {status:404})
    }

    const getChat = await prisma.lead.findUnique({
        where:{id:params?.chatId},
        include:{userSender:true,product:true}
    })

    return NextResponse.json({massege:"succes fetch chat" , data:getChat} , {status:200})

 }