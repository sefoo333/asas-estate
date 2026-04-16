
import prisma from '@/lib/db';
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers';
import { userSchema } from '@/models/user';


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

    const {email,password,userName,provider,image} = await req.json();
    
    const checkEmail = await prisma.user.findUnique({
        where:{email},
    })

   const result = userSchema.safeParse({
    email,
    password,
    userName,
    role:"user"
   });


   if (!result.success){
            return NextResponse.json({message:"Data is not valid" , reason:"validation"}, {status:401})
   }

    if (checkEmail){
        return NextResponse.json({message:"Email already exists",reason:"email"}, {status:400})
    }

    const saltRounds = 10;

    const hash = await bcrypt.hash(password,saltRounds);
   const user = await prisma.user.create({
        data:{
            email,
            password:hash,
            userName,
            role:"user",
            image:image || null,
            provider:provider || null
        }
    })
    // check email is valid and not found in any accounts (not now)

    const token = jwt.sign({
        email,
        userName,
id:user?.id,
        role:"user",
    },process.env.JWT_SECRET_KEY as string , {expiresIn:"1d"});

await (await cookies()).set("token" ,token)

    return NextResponse.json({
        message:"user created",
        pass:true,
        data:{
            email,
            userName,
            role:"user",
        }
    })

}