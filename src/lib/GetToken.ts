import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function VerifyToken(){
    // 1- extract cookie
    const unLookCookie:any = (await cookies()).get("token")?.value;

const  unLookToken:any = jwt.verify(unLookCookie , process.env.JWT_SECRET_KEY as any) ;



return await unLookCookie?.id

}