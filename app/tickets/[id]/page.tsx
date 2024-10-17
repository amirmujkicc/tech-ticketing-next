import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import TicketDetail from "./TicketDetail";

interface Props {
  params: {
    id: string;
  };
}

const ViewTicket = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  const users = await prisma.user.findMany();

  if (!ticket) {
    notFound();
  }

  return <TicketDetail ticket={ticket} users={users} />;
};

export default ViewTicket;
