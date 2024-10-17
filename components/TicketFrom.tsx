"use client";

import { ticketSchema } from "@/validationSchemas/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Form = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}

const TicketFrom = ({ ticket }: Props) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<Form>({
    resolver: zodResolver(ticketSchema),
    defaultValues: ticket
      ? ticket
      : {
          title: "",
          description: "",
          priority: "",
          status: "",
        },
  });

  const onSubmit = async (values: Form) => {
    try {
      setError("");

      if (ticket) {
        await axios.patch("/api/tickets/" + ticket.id, values);
      } else {
        await axios.post("/api/tickets", values);
      }

      router.push("/tickets");
      router.refresh();
    } catch (err) {
      console.log(err);
      setError("Unknown error occured");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "flex-start",
      }}
    >
      <label>
        Title
        <input {...register("title")} />
      </label>
      {errors.title ? <span>{errors.title.message}</span> : null}
      <label>
        Description
        <textarea {...register("description")} />
      </label>
      {errors.description ? <span>{errors.description.message}</span> : null}
      <label>
        Status
        <select {...register("status")}>
          <option value="" disabled hidden />
          <option value="OPEN">Open</option>
          <option value="STARTED">Started</option>
          <option value="CLOSED">Closed</option>
        </select>
      </label>
      {errors.status ? <span>{errors.status.message}</span> : null}
      <label>
        Priority
        <select {...register("priority")}>
          <option value="" disabled hidden />
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </label>
      {errors.priority ? <span>{errors.priority.message}</span> : null}
      {error ? <span>{error}</span> : null}
      <button disabled={isSubmitting} type="submit">
        {ticket ? "Update Ticket" : "Create Ticket"}
      </button>
    </form>
  );
};

export default TicketFrom;
