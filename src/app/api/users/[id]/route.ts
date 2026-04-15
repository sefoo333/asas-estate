import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { userSchema } from "@/models/user";
import bcrypt from 'bcrypt'


const updateUserSchema = userSchema.partial().refine(data => Object.keys(data).length > 0, {
    message: "one field is required to edit",
  });

export async function GET(request:Request,context:any) {
  const id = context.params?.id;

   if (!id) {
      return NextResponse.json({ message: "No user found" }, { status: 401 });
    }



const getUser = await prisma.user.findUnique({
    where:{id:id},
})


return NextResponse.json({message:"User fetched successfully",user:getUser}, {status:200})

}


export async function PATCH(req:Request , context:any){
    const body = await req.json();
      const id = context.params?.id;

    // extract cookie
    const unLookCookie = (await cookies()).get("token")?.value;
    

       if (!unLookCookie) {
          return NextResponse.json({ message: "No token found" }, { status: 401 });
        }
    
    const  unLookToken:any = jwt.verify(unLookCookie , process.env.JWT_SECRET_KEY as any) ;
   
    if (!unLookToken){
    return NextResponse.json({message:"Unauthorized"}, {status:401})
}



let hashedPassword: string | undefined = undefined

if (body?.password) {
  hashedPassword = await bcrypt.hash(body?.password, 10)
}


// validation

console.log("tktkt",{...body,password:body?.password})

const result = updateUserSchema.safeParse({...body,password:hashedPassword})



  if (!result.success) {
      console.log(result.error)
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
      console.log("s2")
    return NextResponse.json({ error: "No fields to update" }, { status: 400 })
  }


//   update Data


const user = await prisma.user.update({
    where: { id: id },
    data,
    select: { id: true, userName: true,location:true,locationCode:true,phone:true, email: true,role:true , password:true},
})

const createToken = jwt.sign({
        email :data.email,
        userName:data.userName,
id:user?.id,
        role:user?.role,
    },process.env.JWT_SECRET_KEY as string , {expiresIn:"1d"});

    await (await cookies()).set("token" ,createToken)
  return NextResponse.json(user)

}



export async function DELETE(req:Request){
    const {id,role} = await req.json();

if (!id){
    return NextResponse.json({ error: "No fields found" }, { status: 401 })
}

  const user = await prisma.user.delete({
    where: { id: id },
  })

  return NextResponse.json({massege:"Delete Success" , user:user} , {status:200})
}