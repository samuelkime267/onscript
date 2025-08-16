import campaigns from "@/data/campaigns.data";
import { CampaignCard } from "@/features/campaign/components";
import React from "react";

export default async function CampaignsPage() {
  return (
    <main className="text-black p-4 bg-neutral-100 min-h-screen flex items-start justify-start flex-col w-full gap-4">
      <section className="w-full bg-white rounded-3xl flex items-center justify-center flex-col shadow-xl shadow-black/[0.05]">
        <h3 className="font-medium text-xl capitalize text-left w-full p-4 pb-0">
          Active Campaigns
        </h3>

        <div className="w-full grid grid-cols-1 gap-4 p-4">
          {campaigns.map((campaign, i) => {
            return <CampaignCard key={i} {...campaign} />;
          })}
        </div>
      </section>
    </main>
  );
}
