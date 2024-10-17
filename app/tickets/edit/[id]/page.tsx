import TicketFrom from "@/components/TicketFrom";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const EditTicket = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    notFound();
  }

  return (
    <div>
      <TicketFrom ticket={ticket} />
    </div>
  );
};

export default EditTicket;
