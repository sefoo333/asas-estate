import { PrismaClient } from "@/generated/prisma/client";
import prisma from "@/lib/db";
import  jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



/*
1- validate data
2- create new real estate in database
3- send response with created real estate data
4- handle errors

*/


export async function POST(request: Request) {
  try {
    const { images, title, description, price, location, beds, Baths, Sqft, type, features, currency, TransactionType } = await request.json();

    const unLookCookie = (await cookies()).get("token")?.value;

    if (!unLookCookie) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const unLookToken: any = jwt.verify(unLookCookie, process.env.JWT_SECRET_KEY as string);

    if (!unLookToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ تأكد إن الـ required fields موجودة
    if (!title || !description || !price || !location || !type || !currency || !TransactionType) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

	console.log(unLookToken)
	

    const realEstate = await prisma.realEstate.create({
      data: {
        title,
        description,
        userId: unLookToken?.id,
        price: parseFloat(price),        // ✅ parseFloat أأمن من +price
        location,
        beds: +beds || 0,                // ✅ fallback لـ 0 لو undefined
        Baths: +Baths || 0,
        Sqft: +Sqft || 0,
        type,
        currency,
        features: features || [],        // ✅ fallback لـ array فاضي
        images: images || [],            // ✅ مش undefined
        TransactionType,
      },
   include: { user: true }
    });

    return NextResponse.json({ message: "Real estate created successfully", data: realEstate }, { status: 201 });

  } catch (error) {
    console.error("Error creating real estate:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}