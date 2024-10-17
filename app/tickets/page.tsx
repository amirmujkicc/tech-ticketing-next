import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status, Ticket } from "@prisma/client";

export interface SearchParams {
  status: Status;
  page: string;
  orderBy: keyof Ticket;
}

const PAGE_SIZE = 10;

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt";

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  if (status) {
    where = {
      status,
    };
  } else {
    where = {
      NOT: [{ status: "CLOSED" }],
    };
  }

  const tickets = await prisma.ticket.findMany({
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    where,
    orderBy: {
      [orderBy]: "desc",
    },
  });

  const ticketCount = await prisma.ticket.count({
    where,
  });

  return (
    <div style={{ marginTop: 20 }}>
      <Link
        href="/tickets/new"
        style={{
          padding: "5px",
          border: "1px solid black",
          textDecoration: "none",
          backgroundColor: "wheat",
        }}
      >
        Create ticket +
      </Link>
      <div style={{ marginTop: "20px" }} />
      <StatusFilter />
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination currentPage={page} itemCount={ticketCount} pageSize={10} />
    </div>
  );
};

export default Tickets;
