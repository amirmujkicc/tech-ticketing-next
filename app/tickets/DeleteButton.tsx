"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  ticketId: number;
}

const DeleteButton = ({ ticketId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async (ticketId: number) => {
    try {
      await axios.delete("/api/tickets/" + ticketId);
      setIsOpen(false);
      router.refresh();
    } catch {
      setError("Unknown error occured.");
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Delete</button>
      <dialog open={isOpen}>
        <p>Are you sure you want to delete this ticket?</p>
        {error ? <span>{error}</span> : null}
        <form method="dialog">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={() => handleDelete(ticketId)}>OK</button>
        </form>
      </dialog>
    </>
  );
};

export default DeleteButton;
