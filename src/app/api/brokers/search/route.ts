import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { userSchema } from "@/models/user";
import { BrokerSchema } from "@/models/Broker";
import { GetRole } from "@/modules/GetRole";

const updateBrokerSchema = BrokerSchema.partial().refine(data => Object.keys(data).length > 0, {
    message: "one field is required to edit",
  });

export async function GET(req: Request) {
//   const { brokerId } = await params;


const {searchParams} = new URL(req.url);
const brokerId = searchParams.get("brokerId");

if (!brokerId) {
  return NextResponse.json({ message: "brokerId is required" }, { status: 400 });
}



try {
    const getBroker = await prisma.broker.findUnique({
      where: { id: brokerId }, // ✅ استخدم المتغير
      include:{rates:{include:{User:true}}}
    });

    if (!getBroker) {
      return NextResponse.json({ message: "Broker not found" }, { status: 404 });
    }

    return NextResponse.json({ data: getBroker });
  } catch (err) {
    return NextResponse.json({ message: "Error fetching broker", err }, { status: 500 });
  }
}


export async function PATCH(req:Request){
    const body = await req.json();
    // extract cookie
    const unLookCookie = (await cookies()).get("token")?.value;
    
    
    if (!unLookCookie) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    
    const  unLookToken:any = jwt.verify(unLookCookie , process.env.JWT_SECRET_KEY as any) ;
    
    if (!unLookToken){
      return NextResponse.json({message:"Unauthorized"}, {status:401})
    }
    
    const isHaveArole = GetRole(unLookToken?.id,"broker")


if (!isHaveArole){
          return NextResponse.json({ message: "Access denied" }, { status: 400 }); 
}


// validation

const result = updateBrokerSchema.safeParse({...body})



  if (!result.success) {
      return NextResponse.json(
          { error: result.error },
          { status: 400 }
        )
    }
    
    
    
    // strip undefined
    
    const data = Object.fromEntries(
        Object.entries(result.data).filter(([, v]) => v !== undefined)
    )
    
    if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 })
  }


//   update Data


const user = await prisma.broker.update({
    where: { id: unLookToken?.id },
    data,
    select: { id: true, userName: true,company:true,languages:true,location:true,bio:true,image:true,locationCode:true,},
})
  return NextResponse.json(user)

}