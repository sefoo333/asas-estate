import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request,context: any){
      const id = (await context.params).id;

    if (!id){
            return NextResponse.json({message:"id not found"}, {status:400})
    }

    try {

        const getRequest = await prisma.requestBroker.findUnique({where:{id:id}});
            return NextResponse.json({message:"success",data:getRequest}, {status:200})
    
    }catch(err){
                return NextResponse.json({message:"failed to get"}, {status:500})
    }



}


export async function POST(req:Request, context:any){
      const id = (await context.params).id;

    if (!id){
            return NextResponse.json({message:"id not found"}, {status:400})
    }

    try {


        const getRequest:any = await prisma.requestBroker.findUnique({where:{id:id}});
        
        const createBroker = await prisma.broker.create({
            data: {
                id: getRequest?.idUser,
                userName: getRequest?.userName,
                company: getRequest?.company,
                languages: getRequest?.languages,
                image: getRequest?.image,
                phone: getRequest?.phone,
                location: getRequest?.location,
                bio: getRequest?.bio,
                locationCode: getRequest?.locationCode,
                propertiesCount: 0,
                reviewsCount: 0,
                ratingSum: 0,
            }
        })
        

            const editRole = await prisma.user?.update({
                where:{id:getRequest?.idUser},
                data:{
                    role:"Broker"
                },
            })

        if (createBroker){
              await prisma.requestBroker.delete({where:{id:id}});
        }
        
            return NextResponse.json({message:"success",data:createBroker,role:editRole}, {status:200})
    
    }catch(err){
                return NextResponse.json({message:"failed to get"}, {status:500})
    }



}


export async function DELETE(req:Request, context:any){
      const id = (await context.params).id;

    if (!id){
            return NextResponse.json({message:"id not found"}, {status:400})
    }

    try {

        const getRequest = await prisma.requestBroker.delete({where:{id:id}});
            return NextResponse.json({message:"success",data:getRequest}, {status:200})
    
    }catch(err){
                return NextResponse.json({message:"failed to get"}, {status:500})
    }



}