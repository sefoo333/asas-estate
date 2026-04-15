import prisma from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(req:Request , context:any){
  const id = context.params?.id;



if (!id){
    return NextResponse.json({message:"id not found"}, {status:201})

}

try {
    const getNotifactions = await prisma.notfication.findMany({
    where:{
        To:id
    },
    include:{
        UserFrom:true,
        UserTo:true
    }
})

return NextResponse.json(getNotifactions);

} catch (err) {
    
    return NextResponse.json({message:"Error fetching notifactions"}, {status:500})
}
}