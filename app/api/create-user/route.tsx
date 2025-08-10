import { NextResponse } from "next/server";
import { createUserSchema } from "@/features/auth/schemas";
import { db } from "@/lib/db";
import { getUserByAddress } from "@/helpers/read-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedData = createUserSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.message },
        { status: 400 },
      );
    }

    const { address, displayName, fid, pfpUrl, username } = parsedData.data;

    const existingUser = await getUserByAddress(address);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const user = await db.user.create({
      data: {
        walletAddress: address,
        displayName,
        fid,
        pfpUrl,
        username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, user, message: "User created successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(null, {
      status: 500,
      statusText:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
}
