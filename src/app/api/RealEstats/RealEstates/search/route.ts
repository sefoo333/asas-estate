import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const featuresArray = searchParams.get("features")
    ? (searchParams.get("features") as string).split(",")
    : [];

  try {
    if (searchParams.size === 1 && searchParams.get("estateType")) {
      const realEstates = await prisma.realEstate.findMany({
        where: {
          type: searchParams.get("estateType")!,
        },
      });
      
      return NextResponse.json(
        { message: "Real estates fetched successfully", data: realEstates },
        { status: 200 }
      );
    }

    let realEstates = await prisma.realEstate.findMany({
      where: {
        AND: [
          searchParams.get("transactionType")
            ? { TransactionType: searchParams.get("transactionType")! }
            : {},

          searchParams.get("beds")
            ? { beds: parseInt(searchParams.get("beds")!) }
            : {},

          searchParams.get("baths")
            ? { Baths: parseInt(searchParams.get("baths")!) }
            : {},

          searchParams.get("min") && searchParams.get("max")
            ? {
                price: {
                  gte: parseFloat(searchParams.get("min")!),
                  lte: parseFloat(searchParams.get("max")!),
                },
              }
            : {},

          searchParams.get("estateType")
            ? { type: searchParams.get("estateType")! }
            : {},

          searchParams.get("location")
            ? { location: searchParams.get("location")! }
            : {},
        ],
      },
    });

    if (featuresArray.length > 0) {
      realEstates = realEstates.filter((estate) =>
        featuresArray.every((f) =>
          (estate.features as { label: string }[]).some(
            (feature) => feature.label === f
          )
        )
      );
    }

    

    return NextResponse.json(
      { message: "Real estates fetched successfully", data: realEstates },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "failed to search", err },
      { status: 500 }
    );
  }
}