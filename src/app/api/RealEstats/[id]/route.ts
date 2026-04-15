import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { GetRole } from "@/modules/GetRole";

export async function GET(req:Request , context: any){

  const id = context.params?.id;

const realEstates = await prisma.realEstate.findUnique({
    where: {
        id: id
    },
                   include:{user:true}
});

return NextResponse.json({message:"Real estate fetched successfully",data:realEstates}, {status:200})

}

export async function PATCH(req:Request , context: any){
const body = await req.json();

const cleanData = Object.fromEntries(
  Object.entries(body).filter(([_, value]) => {
    return value !== "" && value !== null && value !== undefined;
  })
);
// extract cookie
try {
    const unLookCookie = (await cookies()).get("token")?.value;
    

    
    if (!unLookCookie) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    console.log("that's",cleanData);
    
    const  unLookToken:any = jwt.verify(unLookCookie , process.env.JWT_SECRET_KEY as any) ;
    
    if (!unLookToken){
      return NextResponse.json({message:"Unauthorized"}, {status:401})
    }
    
    const isHaveArole = GetRole(unLookToken?.id,"broker")


if (!isHaveArole){
          return NextResponse.json({ message: "Access denied" }, { status: 400 }); 
}

    
    

    
const realEstates = await prisma.realEstate.update({
    where: {
        id: context.params?.chatId,

    },
    data:cleanData,
                   include:{user:true}
});

return NextResponse.json({message:"Real estate fetched successfully",data:realEstates}, {status:200})
} catch(err){
    console.log("ohm",err)
    return NextResponse.json({message:"err fetch",err:err}, {status:500})

}


}




