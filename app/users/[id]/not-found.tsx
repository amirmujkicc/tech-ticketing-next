import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1>User Not Found</h1>
      <Link href="/tickets">Return</Link>
    </div>
  );
};

export default NotFound;
