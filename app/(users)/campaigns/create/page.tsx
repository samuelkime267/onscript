import { CampaignCreationForm } from "@/features/campaign/components";
import React from "react";
import { TbSpeakerphone } from "react-icons/tb";

export default function CreateCampaignPage() {
  return (
    <main className="text-black flex items-center justify-center p-4 ">
      <div className="bg-white w-full rounded-3xl flex items-start justify-start gap-8 flex-col shadow-xl shadow-black/[0.05] p-4">
        <div className="w-full flex items-center justify-center gap-2 flex-col">
          <div className="w-fit border border-neutral-100 p-4 rounded-full">
            <TbSpeakerphone className="size-8" />
          </div>
          <h1 className="font-bold text-black text-base text-center capitalize">
            Create your campaign
          </h1>
          <p className="text-gray-500 text-xs text-center">
            Enter details of campaign below
          </p>
        </div>

        <CampaignCreationForm />
      </div>
    </main>
  );
}
