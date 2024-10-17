import { Ticket, User } from "@prisma/client";
import Link from "next/link";
import DeleteButton from "../DeleteButton";
import AssignTicket from "@/components/AssignTicket";

interface Props {
  ticket: Ticket;
  users: User[];
}

const TicketDetail = ({ ticket, users }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          border: "1px solid cyan",
          backgroundColor: "lightcyan",
        }}
      >
        <h2>{ticket.title}</h2>
        <div>{ticket.description}</div>
        <div>{ticket.status}</div>
        <div>{ticket.priority}</div>
        <div>{ticket.createdAt.toLocaleDateString()}</div>
        <div>{ticket.updatedAt.toLocaleDateString()}</div>
      </div>

      <AssignTicket ticket={ticket} users={users} />

      <div>
        <Link href={`/tickets/edit/${ticket.id}`}>Edit</Link>
        <div style={{ padding: "5px", display: "inline" }} />
        <DeleteButton ticketId={ticket.id} />
      </div>

      <Link href="/tickets">Return</Link>
    </div>
  );
};

export default TicketDetail;
