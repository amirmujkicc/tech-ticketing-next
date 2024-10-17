import prisma from "@/prisma/db";
import { userSchema } from "@/validationSchemas/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface Props {
  params: {
    id: string;
  };
}

export default async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!foundUser) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  if (body?.password && body.password != "") {
    const hashedPassword = await bcrypt.hash(body.password, 8);
    body.password = hashedPassword;
  } else {
    delete body.password;
  }

  if (foundUser.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    return NextResponse.json(
      { error: "Username already exists" },
      { status: 409 }
    );
  }

  const updateUser = await prisma.user.update({
    where: {
      id: foundUser.id,
    },
    data: { ...body },
  });

  return NextResponse.json(updateUser);

  // if (foundUser) {
  //   return NextResponse.json({error: 'Username already exsists'})
  // }
}
