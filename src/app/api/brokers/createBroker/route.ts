import prisma from "@/lib/db";
import { NextResponse } from "next/server";



export async function POST(req:Request){
const {userName, bio, image, company,idUser, phoneCode, phone, location, locationCode, languages} = await req.json();

if (!idUser){
    return NextResponse.json({message:"id not found"}, {status:201})

}

try {

    const createBroker = await prisma.requestBroker.create({
        data:{
            idUser: idUser,
            userName,
            bio,
            image,
            company,
            phone:`${phoneCode}${phone}`,
            location,
            locationCode,
            languages: languages || [],
        }
    })

    const editRole = await prisma.user?.update({
        where:{id:idUser},
        data:{
            role:"Broker"
        },
    })

        return NextResponse.json({message:"success create" , data:createBroker , role:editRole}, {status:200})

} catch(err){
       return NextResponse.json({message:"failed to create"}, {status:500})
 
}



}