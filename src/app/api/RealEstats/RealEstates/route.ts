import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request:Request){
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "Sale";
    const limit:any = searchParams.get("limit") || 4;
    const landing:any = searchParams.get("landing") || false;

    
    let realEstates;

    const id = searchParams.get("idBroker")

    if (id && id !== undefined) {
        realEstates = await prisma.realEstate.findMany({
               where:{userId:id},
               include:{user:true},
                                         take:limit ? parseInt(limit) : 4
           });
    
        }


if (!id){
    if (type === "All"){
 realEstates = await prisma.realEstate.findMany({
        where:{TransactionType:{in:["Sale","Rent"]}},
         omit:landing ?{images:true,description:true,features:true} : {}, 
                       include:{user:true},
                                                 take:limit ? parseInt(limit) : 4
    });
    
}else if (type === "com"){
    realEstates = await prisma.realEstate.findMany({
           where:{type:{startsWith:"b_"}},
           
                          include:{user:true},
                          take:limit ? parseInt(limit) : 4

       });

} else {
 realEstates = await prisma.realEstate.findMany({
        where:{TransactionType:type},
                       include:{user:true},
                                                 take:limit ? parseInt(limit) : 4

    });
}
}



return NextResponse.json({message:"Real estates fetched successfully",data:realEstates}, {status:200})

}


export async function DELETE(req:Request ){
const {ids} = await req.json();

const realEstates = await prisma.realEstate.deleteMany({
    where: {
    id:{in:ids}   
    },
    
});

return NextResponse.json({message:"Real estate fetched successfully",data:realEstates}, {status:200})

}
