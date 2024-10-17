import { auth } from "@/auth";
import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}
const EditUser = async ({ params }: Props) => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return <p>Admin access required</p>;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user) {
    notFound();
  }

  console.log(user);
  return (
    <div>
      <h2>Editing {user.name}</h2>
      <UserForm user={user} />
    </div>
  );
};

export default EditUser;
