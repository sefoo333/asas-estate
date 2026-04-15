
import prisma from '@/lib/db';
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers';


/**
 * ==== step Register ===
 * 1- check email is valid and not found in any accounts
 * 2- check password is valid
 * 3- hash password
 * 4- create new user in database
 * 5- sign {
 * userName,
 * email,
 * admin,
 * id,
 * }
 * 6- send email to user with link to verify email (optional)
 * 7- send Response with token and user data
 * 8- hadnle errors
 */


export async function POST(req:Request) {

    const {email,password,provider} = await req.json();
    

    const saltRounds = 10;

    
    const getUser = await prisma.user.findUnique({
        where:{
            email,
        }
    })

    if (provider){
 const token = jwt.sign({
        email,
       userName: getUser?.userName,
        role:getUser?.role,
        id:getUser?.id,
    },process.env.JWT_SECRET_KEY as string , {expiresIn:"1d"});

await (await cookies()).set("token" ,token)

    return NextResponse.json({
        message:"Login Done",
        data:{
            email,
            userName:getUser?.userName,
            id:getUser?.id,
                }
    })
    }
    
    const hash = await bcrypt.compare(password , getUser?.password || "");
    // check email is valid and not found in any accounts (not now)
    
    
    if (!getUser){
        return NextResponse.json({message:"Invalid email or password"}, {status:400})
    }
    
    if (!hash) {
        return NextResponse.json({message:"Invalid email or password"}, {status:400})
    }
    
    
    
    const token = jwt.sign({
        email,
       userName: getUser?.userName,
        role:getUser?.role,
        id:getUser?.id,
    },process.env.JWT_SECRET_KEY as string , {expiresIn:"1d"});

await (await cookies()).set("token" ,token)

    return NextResponse.json({
        message:"Login Done",
        data:{
            email,
            userName:getUser?.userName,
            id:getUser?.id,
                }
    })

}


