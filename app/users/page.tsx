import UserForm from "@/components/UserForm";
import React from "react";
import DataTable from "./DataTable";
import prisma from "@/prisma/db";
import { auth } from "@/auth";

const Users = async () => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return <p>Admin access required</p>;
  }

  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm />
      <div style={{ margin: 20 }} />
      <DataTable users={users} />
    </div>
  );
};

export default Users;
