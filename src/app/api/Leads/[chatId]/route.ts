import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const id = context.params?.chatId;

  if (!id) {
    return NextResponse.json(
      { message: "id is required" },
      { status: 400 }
    );
  }

  const getChat = await prisma.lead.findUnique({
    where: { id },
    include: { userSender: true, product: true },
  });

  return NextResponse.json(
    { message: "success fetch chat", data: getChat },
    { status: 200 }
  );
}