"use client";

import { Ticket, User } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

interface Props {
  ticket: Ticket;
  users: User[];
}

const AssignTicket = ({ ticket, users }: Props) => {
  const [error, setError] = useState("");

  const assignTicket = async (userId: string) => {
    try {
      setError("");
      await axios.patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === "0" ? null : userId,
      });
    } catch {
      setError("Unable to assign ticket");
    }
  };

  return (
    <div>
      <label>
        Assign
        <select
          onChange={(e) => assignTicket(e.target.value)}
          defaultValue={ticket.assignedToUserId?.toString() || "0"}
        >
          <option value="0">Unnasign</option>
          {users
            .filter((user) => user.role === "TECH")
            .map((user) => (
              <option key={user.id} value={user.id.toString()}>
                {user.name}
              </option>
            ))}
        </select>
      </label>
      {error ? <span>{error}</span> : null}
    </div>
  );
};

export default AssignTicket;
