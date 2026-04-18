import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 400 },
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { message: "User Successfully Registered" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while registering the user" },
      { status: 500 },
    );
  }
}


