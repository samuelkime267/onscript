"use server";

import { auth } from "@/auth";
import { joinCampaignFormSchema } from "../schemas";
import { getUserById } from "@/helpers/read-db";
import db from "@/lib/db";

export default async function joinCampaignAction(data: unknown) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return {
        error: "Unauthorized",
      };
    }

    const parsedData = joinCampaignFormSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        error: "Invalid data",
      };
    }

    const user = await getUserById(session.user.id);

    if (!user) {
      return {
        error: "User not found",
      };
    }
    const {
      content_commitment,
      email,
      help_needed,
      story_telling_vibes,
      twitter,
      web3_content_experience,
      following_team,
    } = parsedData.data;
    const { fid, username } = user;

    const existingUser = await db.launchCampaignParticipants.findUnique({
      where: {
        fid,
      },
    });

    if (existingUser) {
      return {
        error: "You've joined this campaign already",
      };
    }

    await db.launchCampaignParticipants.create({
      data: {
        commitment: content_commitment === "yes",
        email,
        fid,
        helpNeeded: help_needed.join(","),
        storyTellingVibe: story_telling_vibes,
        userId: session.user.id,
        username,
        web3ContentWork: web3_content_experience.toUpperCase() as
          | "YES"
          | "NO"
          | "KINDA",
        xHandle: twitter,
        isApproved: false,
        following_team: following_team === "yes",
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log("error", error);
    return {
      error: "Something went wrong",
    };
  }
}
