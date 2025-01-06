import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user
    await prisma.user.create({
      data: { name, email, password: hashed },
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
