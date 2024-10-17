import { auth } from "@/auth";
import prisma from "@/prisma/db";
import { ticketSchema } from "@/validationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}
