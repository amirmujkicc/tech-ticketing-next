import React from "react";

import MainNavLinks from "./MainNavLinks";
import { auth } from "@/auth";
import Link from "next/link";

const MainNav = async () => {
  const session = await auth();

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <MainNavLinks role={session?.user.role} />
      <div>
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </div>
    </div>
  );
};

export default MainNav;
