import prisma from "@/lib/db";
import { userSchema } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";



export async function POST(req: Request) {
  const { email, userName, password } = await req.json();

const getData = await prisma.user.findUnique({
    where:{email}
});

if (getData){

    const token = jwt.sign({
          email,
         userName: getData?.userName,
          role:getData?.role,
          id:getData?.id,
      },process.env.JWT_SECRET_KEY as string , {expiresIn:"1d"});
  
  await (await cookies()).set("token" ,token)

    return NextResponse.json({
            message:"Login Done",
            data:{
                email,
                userName:getData?.userName,
                id:getData?.id,
                    }
        }) 

        
} else {
const result = userSchema.safeParse({
    email,
    userName,
    role: "user"
});

if (!result.success) {
    console.log(result.error)
    return NextResponse.json({ message: "Data is not valid" }, { status: 400 })
}

const user = await prisma.user.create({
    data: {
        email,
        userName,
        role: "user",
    }
});



return NextResponse.json({
    message: "user created",
    data: {
        email:user?.email,
        userName:user?.userName,
        role: "user",
    }
})
}


}