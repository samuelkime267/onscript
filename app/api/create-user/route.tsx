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
    const existingUserViaFid = await db.user.findUnique({
      where: { fid },
    });
    const existingUserViaUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this address already exist" },
        { status: 400, statusText: "User with this address already exist" },
      );
    }
    if (existingUserViaFid) {
      return NextResponse.json(
        { error: "User with this FID already exist" },
        { status: 400, statusText: "User with this FID already exist" },
      );
    }
    if (existingUserViaUsername) {
      return NextResponse.json(
        { error: "User with this username already exist" },
        { status: 400, statusText: "User with this username already exist" },
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
