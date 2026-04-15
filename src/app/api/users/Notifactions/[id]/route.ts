import prisma from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(req:Request , context:any){
  const id = context.params?.id;

console.log("this id from not",id)

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
    console.log(err);
    return NextResponse.json({message:"Error fetching notifactions"}, {status:500})
}
}