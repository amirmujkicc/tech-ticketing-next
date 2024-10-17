import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <p>NotFound</p>
      <Link href="/tickets">Return</Link>
    </div>
  );
};

export default NotFound;
