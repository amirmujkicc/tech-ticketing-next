import { Ticket } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { SearchParams } from "./page";

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const DataTable = ({ tickets, searchParams }: Props) => {
  return (
    <div style={{ width: "100%", marginTop: 50 }}>
      <table>
        <thead>
          <tr>
            <th>
              <Link href={{ query: { ...searchParams, orderBy: "title" } }}>
                Title
              </Link>
              {searchParams.orderBy === "title" && <span>▾</span>}
            </th>
            <th>
              <Link href={{ query: { ...searchParams, orderBy: "status" } }}>
                Status
              </Link>
              {searchParams.orderBy === "status" && <span>▾</span>}
            </th>
            <th>
              <Link href={{ query: { ...searchParams, orderBy: "priority" } }}>
                Priority
              </Link>
              {searchParams.orderBy === "priority" && <span>▾</span>}
            </th>
            <th>
              <Link href={{ query: { ...searchParams, orderBy: "createdAt" } }}>
                Created At
              </Link>
              {searchParams.orderBy === "createdAt" && <span>▾</span>}
            </th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              <td>
                {ticket.createdAt.toLocaleDateString("en-US", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td>
                <Link href={`/tickets/${ticket.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
