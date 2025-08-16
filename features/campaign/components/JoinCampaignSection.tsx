"use client";

import ButtonAction from "@/components/ButtonAction";
import { useState } from "react";
import { TbSpeakerphone } from "react-icons/tb";
import JoinCampaignForm from "./JoinCampaignForm";

export default function JoinCampaignSection() {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinedStreak, setJoinedStreak] = useState(false);

  if (joinedStreak) return;

  return (
    <section className="w-full bg-white rounded-3xl flex items-center justify-center flex-col shadow-xl shadow-black/[0.05] p-4">
      {showJoinForm ? (
        <JoinCampaignForm setJoinedStreak={setJoinedStreak} />
      ) : (
        <div className="w-full p-8 border border-neutral-200 rounded-3xl flex items-center justify-center gap-4 flex-col">
          <div className="border border-neutral-100 p-4 rounded-full">
            <TbSpeakerphone className="size-8" />
          </div>
          <div>
            <h4 className="text-lg font-medium text-center capitalize">
              Join campaign now
            </h4>
          </div>
          <ButtonAction
            btnType="primary"
            className="px-12 w-fit"
            onClick={() => setShowJoinForm(true)}
          >
            Join
          </ButtonAction>
        </div>
      )}
    </section>
  );
}
