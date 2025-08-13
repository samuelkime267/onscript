"use client";

import ButtonAction from "@/components/ButtonAction";
import { formatScheduleDate } from "@/utils";
import { Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsThreeDotsVertical } from "react-icons/bs";

type CastCardProps = {
  text: string;
  imgs?: string[];
  scheduleDate: Date;
  profilePic?: string | null;
  username?: string | null;
};

export default function CastCard({
  scheduleDate,
  text,
  imgs,
  profilePic,
  username,
}: CastCardProps) {
  const isImg = imgs && imgs.length > 0;
  return (
    <div className="flex flex-col items-start justify-start gap-6 p-4">
      <div className="flex items-start justify-start gap-2">
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

        <div className="flex items-start justify-start gap-2 flex-col">
          <div>
            <p className="font-medium">{username}</p>
            <p>{text}</p>
          </div>
          {isImg && <PostImageSwiper imgs={imgs} />}
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <ButtonAction
          btnType="badge"
          className="flex items-center justify-center gap-2"
        >
          <Calendar className="size-3" />
          <p className="text-[10px]">{formatScheduleDate(scheduleDate)}</p>
        </ButtonAction>

        <ButtonAction btnType="badge" className="px-2">
          <BsThreeDotsVertical className="size-3" />
        </ButtonAction>
      </div>
    </div>
  );
}

function PostImageSwiper({ imgs }: { imgs: string[] }) {
  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={"auto"}
      className="rounded-xl overflow-hidden"
    >
      {imgs.map((img) => (
        <SwiperSlide
          key={img}
          className={
            imgs.length > 1
              ? "!w-[90%] aspect-[5/4] rounded-xl overflow-hidden"
              : "rounded-xl overflow-hidden"
          }
        >
          <Image
            src={img}
            alt="Post image"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
