"use client";

import Image from "next/image";
import React from "react";
import CastCardEmbeds from "./CastCardEmbeds";
import { CastCardProps } from "../cast-card.types";

export default function CastCardContents({
  text,
  profilePic,
  username,
  embeds,
}: CastCardProps) {
  const isEmbeds = embeds && embeds.length > 0;
  return (
    <div className="w-full flex items-start justify-start gap-2">
      <div className="size-9 flex-shrink-0 bg-gray-200 rounded-full overflow-hidden">
        {profilePic && (
          <Image
            src={profilePic}
            alt={username || "user image"}
            width={32}
            height={32}
            className="size-full"
          />
        )}
      </div>

      <div className="flex items-start justify-start gap-2 flex-col w-full">
        <div>
          <p className="font-medium">{username}</p>
          <p>{text}</p>
        </div>
        {isEmbeds && <CastCardEmbeds embeds={embeds} />}
      </div>
    </div>
  );
}
