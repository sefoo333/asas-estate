import prisma from "@/lib/db"
import { NextResponse } from "next/server";

export const GetRole = async (id:string , role:string) =>{

    const getUser = await prisma.user.findUnique({
        where:{id:id}
    })

    if (!getUser){
          return false; 
        }
        
        if (getUser?.role !== role && getUser?.role !== "Admin"){
        return false; 
    }
    return true

      

}