import prisma from "@/lib/db";
import { GetRole } from "@/modules/GetRole";
import { NextResponse } from "next/server";


export async function POST(req:Request){
    const {id,massege,idTo,idProduct,title,linkNoti,description} = await req.json();

    if (!id) {
        return NextResponse.json({massege:"user id reqiured" , who:"sys"}, {status:404})
    }
    
  
    try {
          const sendMassege = await prisma.lead.create({
        data:{
            senderId:id,
            massege:massege,
            idTo:idTo,
 productId:idProduct
        },
        include:{userSender:true,product:true}
    })


    const sendNotifaction = await prisma.notfication.create({
        data:{
            From:id,
            To:idTo,
            Content:{
                title:title,
                description:description
            },
            linkNotifaction:`${linkNoti}/${sendMassege?.id}`,
        }
    })

            return NextResponse.json({massege:"success to send !" , data:sendMassege , notifcation:sendNotifaction}, {status:200})

    } catch (err){
                return NextResponse.json({massege:"something went wrong",err:err}, {status:400})
    }


}
export async function PUT(req:Request){
    const {id,status , userId} = await req.json();
const getRole = await GetRole(userId,"Broker");

if (!id) {
    return NextResponse.json({massege:"user id reqiured"}, {status:404})
}


if (!getRole){
    return NextResponse.json({massege:"Access denied"}, {status:400})
}

  
    try {
          const sendMassege = await prisma.lead.update({
            where:{id:id},
        data:{
          status:status,
        }
    })
            return NextResponse.json({massege:"success to edit !" , data:sendMassege}, {status:200})

    } catch (err){
                return NextResponse.json({massege:"something went wrong",err:err}, {status:400})
    }


}
export async function DELETE(req:Request){
    const {id} = await req.json();

if (!id) {
    return NextResponse.json({massege:"user id reqiured"}, {status:404})
}
  
    try {
          const sendMassege = await prisma.lead.delete({
            where:{id:id},
    })
            return NextResponse.json({massege:"success to delete !" , data:sendMassege}, {status:200})

    } catch (err){
                return NextResponse.json({massege:"something went wrong",err:err}, {status:400})
    }


}