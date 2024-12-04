import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  try {
    return NextResponse.json({ message: "User Exist" });
  } catch (error) {
    console.log(error);
  }
}
