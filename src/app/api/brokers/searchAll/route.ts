import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
//   const { brokerId } = await params;


const {searchParams} = new URL(req.url);
const title = searchParams.get("title") || ""; // لو null هيتحول لنص فاضي
const finder = searchParams.get("finder");
const type = searchParams.get("type");
const searchFilter = finder === "name" 
  ? { userName: { contains: title, mode: 'insensitive' as const } } 
  : { location: { contains: title, mode: 'insensitive' as const } };

let brokers;
try {
 brokers = await prisma.broker.findMany({
    where: {
      AND: [
        // فلتر البحث بالاسم أو الموقع
        searchFilter,
        
        // فلتر نوع العقار (فقط إذا كان الـ type موجود في الـ searchParams)
        type ? {
          realEstates: {
            some: {
              TransactionType: { equals: type }
            }
          }
        } : {}
      ]
    },
    include: {
      realEstates: true // عشان الداتا تظهر في الـ Response
    }
  });



    if (!brokers) {
      return NextResponse.json({ message: "search not found" }, { status: 404 });
    }

    return NextResponse.json({ data: brokers });
  } catch (err) {
    return NextResponse.json({ message: "Error fetching broker", err }, { status: 500 });
  }
}
