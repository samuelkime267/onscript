import ButtonAction from "@/components/ButtonAction";
import { Campaign } from "@/data/campaigns.data";
import { formatScheduleDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CampaignCard({
  id,
  name,
  description,
  endDate,
  isOpen,
  image,
  creatorImg,
  createdBy,
}: Campaign) {
  return (
    <Link
      href={`/campaigns/${id}`}
      className="flex items-start justify-start gap-4 flex-col relative aspect-[4/5] w-full shrink-0 rounded-2xl overflow-hidden border"
    >
      <div className="w-full h-full">
        <Image
          src={image}
          alt={name}
          width={450}
          height={450}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full p-4 flex items-start justify-end gap-2.5 flex-col bg-black/70">
        <ButtonAction
          btnType="badge"
          className="text-white border-white/20 bg-white/8 backdrop-blur-md hover:bg-white/15 mb-auto ml-auto rounded-full overflow-hidden"
        >
          {isOpen ? "Open" : "Closed"}
        </ButtonAction>

        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-white text-xl capitalize">
            {name}
          </h4>
          <p className="text-xs text-gray-300/90">{description}</p>
        </div>

        <div className="flex justify-center gap-1 flex-col">
          <p className="text-gray-300/70 text-[0.625rem]">Creator</p>
          <div className="flex items-center gap-2">
            <Image
              src={creatorImg}
              alt="creator"
              width={32}
              height={32}
              className="size-6 rounded-full"
            />
            <p className="text-white/90 text-xs">{createdBy}</p>
          </div>
        </div>

        <div>
          <ButtonAction
            btnType="badge"
            className="text-white border-white/20 bg-white/8 backdrop-blur-md hover:bg-white/15"
          >
            Ends: {formatScheduleDate(endDate)}
          </ButtonAction>
        </div>
      </div>
    </Link>
  );
}
