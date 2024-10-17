import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1>Ticket not found</h1>
      <Link href="/tickets">Return</Link>
    </div>
  );
};

export default NotFound;
