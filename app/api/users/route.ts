import prisma from "@/prisma/db";
import { userSchema } from "@/validationSchemas/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!session.user.role && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Not Admin" }, { status: 401 });
  }

  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (foundUser) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 409 }
    );
  }

  const hasPassword = await bcrypt.hash(body.password, 8);
  body.password = hasPassword;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
