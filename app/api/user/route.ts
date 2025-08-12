import { NextResponse, NextRequest } from "next/server";
import { neynarClient } from "@/lib/neynar";
import { createUserSchema } from "@/features/auth/schemas";
import { getUserByAddress, getUserByFid } from "@/helpers/read-db";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = createUserSchema.parse(body);
    if (!parsedData)
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const { address, fid } = parsedData;

    const existingUser = await getUserByAddress(address);
    const existingUserViaFid = await getUserByFid(fid);

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

    const user = (
      await neynarClient.fetchBulkUsers({
        fids: [fid],
      })
    ).users.at(0);

    if (!user) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "Farcaster Account Not Found",
      });
    }

    const { username, pfp_url, display_name } = user;

    const createdUser = await db.user.create({
      data: {
        fid,
        walletAddress: address,
        username,
        pfpUrl: pfp_url,
        displayName: display_name,
      },
    });

    if (!createdUser) {
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong",
      });
    }

    return NextResponse.json({ user: createdUser }, { status: 200 });
  } catch {
    return NextResponse.json(null, {
      status: 500,
      statusText: "Something went wrong",
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "No address provided" },
        { status: 400 },
      );
    }

    const user = await getUserByAddress(address);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
