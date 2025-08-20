import { auth } from "@/auth";
import { PostSchemaDataType } from "@/features/cast/schemas/cast.schema";
import { scheduleCastPostSchema } from "@/features/cast/schemas/scheduleCastPost.schema";
import db from "@/lib/db";
import { qstashClient } from "@/lib/qstash";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }
    const { id } = session.user;
    const body = await request.json();
    const parsedData = scheduleCastPostSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        {
          error: parsedData.error.message,
        },
        { status: 400 },
      );
    }

    const {
      files,
      channelId,
      embeds,
      text,
      scheduledAt,
      signerUuid,
      status,
      userId,
    } = parsedData.data;

    if (userId !== id) {
      return NextResponse.json(
        { error: "User not authorized" },
        { status: 403 },
      );
    }

    if (files.length > 0) {
      //Todo: store the images in pinata
      // embeds?.push({url:"sth"})
    }

    const postData: PostSchemaDataType = {
      signerUuid,
      status,
      text,
      userId,
      channelId,
      embeds, // remember url to uploaded assets is to be added here
      scheduledAt,
    };

    const data = await db.post.create({
      data: postData,
    });

    const res = await qstashClient.publishJSON({
      body: data,
      url: "http://localhost:3000/api/cast/publish/qstash",
      notBefore: Math.floor(scheduledAt.getTime() / 1000),
      retries: 3,
    });
    const { messageId } = res;

    await db.post.update({
      where: {
        id: data.id,
      },
      data: {
        qstashMessageId: messageId,
      },
    });

    return NextResponse.json(
      { message: "Post scheduled successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
