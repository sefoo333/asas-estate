import prisma from "@/lib/db";
import { VerifyToken } from "@/lib/GetToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";


export async function POST(req: Request) {
  const { productId } = await req.json()  // بس productId من الـ body

  // الـ userId من الـ token مش من الـ body
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: string }

  // تحقق إن المنتج موجود
  const product = await prisma.realEstate.findUnique({ where: { id: productId } })
  if (!product) {
    return NextResponse.json({ message: "المنتج مش موجود" }, { status: 404 })
  }


  // toggle — لو محفوظ اشيله، لو مش محفوظ احفظه
  const existing = await prisma.favourites.findUnique({
    where: {
      userId_productId: {
        userId: payload.id,
        productId
      }
    },
  })

  if (existing) {
    await prisma.favourites.delete({ where: { id: existing.id } })
    return NextResponse.json({ saved: false })
  }

  const saved = await prisma.favourites.create({
    data: { userId: payload.id, productId },
  })

  return NextResponse.json({ saved: true, data: saved })
}

export async function GET(req: Request) {
const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: string }

  const saved = await prisma.favourites.findMany({
    where: { userId: payload?.id },
    include: { RealEstate: true },   // بيجيب بيانات المنتج كمان
    orderBy: { createdAt: "desc" },
  })

  

  return NextResponse.json({massege:"succes" , data:saved.map(s => s.RealEstate)} , {status:200})
}