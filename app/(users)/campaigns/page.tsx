import ButtonAction from "@/components/ButtonAction";
import campaigns from "@/data/campaigns.data";
import { formatScheduleDate } from "@/utils";
import Image from "next/image";
import React from "react";

export default async function CampaignsPage() {
  return (
    <main className="text-black p-4 bg-neutral-100 min-h-screen flex items-start justify-start flex-col w-full gap-4">
      <section className="w-full bg-white rounded-3xl flex items-center justify-center flex-col shadow-xl shadow-black/[0.05]">
        <h3 className="font-medium text-xl capitalize text-left w-full p-4 pb-0">
          Active Campaigns
        </h3>

        <div className="grid grid-cols-1 gap-4 p-4">
          {campaigns.map(
            ({ name, images, endDate, description, isOpen }, i) => {
              return (
                <div
                  key={i}
                  className="flex items-start justify-start gap-4 flex-col relative aspect-[4/5] w-full rounded-2xl overflow-hidden"
                >
                  <div className="w-full h-full">
                    <Image
                      src={images[0]}
                      alt={name}
                      width={450}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute top-0 left-0 w-full h-full p-4 flex items-start justify-end gap-2 flex-col bg-black/70">
                    <ButtonAction
                      btnType="badge"
                      className="text-white border-white/20 bg-white/8 backdrop-blur-md hover:bg-white/15 mb-auto ml-auto rounded-full overflow-hidden"
                    >
                      {isOpen ? "Open" : "Closed"}
                    </ButtonAction>
                    <h4 className="font-semibold text-white text-xl capitalize">
                      {name}
                    </h4>
                    <p className="text-xs text-gray-300/90">{description}</p>
                    <div>
                      <ButtonAction
                        btnType="badge"
                        className="text-white border-white/20 bg-white/8 backdrop-blur-md hover:bg-white/15"
                      >
                        Ends: {formatScheduleDate(endDate)}
                      </ButtonAction>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>
    </main>
  );
}
