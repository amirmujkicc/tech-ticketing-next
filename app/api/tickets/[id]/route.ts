import prisma from "@/prisma/db";
import { ticketPatchSchema } from "@/validationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketPatchSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const foundTicket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!foundTicket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  if (body?.assignedToUserId) {
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: foundTicket.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedTicket);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const foundTicket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!foundTicket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  await prisma.ticket.delete({
    where: {
      id: foundTicket.id,
    },
  });

  return NextResponse.json({ message: "Ticket Deleted" });
}
