"use client";

import { useAppSelector } from "@/utils";
import Image from "next/image";
import React from "react";
import ButtonAction from "./ButtonAction";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

export default function Navbar() {
  const { pfpUrl, username, isPremium } = useAppSelector((state) => state.user);
  return (
    <header className="sticky top-0 left-0 shadow-xl shadow-black/[0.05] w-full flex items-center justify-between gap-2 z-50 p-4 bg-white">
      <Link href={"/"}>
        <Logo />
      </Link>

      <div className="flex items-center justify-center gap-4">
        <ButtonAction className="flex items-center justify-center gap-2">
          <Image
            src={pfpUrl || ""}
            alt={username || ""}
            width={40}
            height={40}
            className="rounded-full w-10 h-10 bg-gray-200"
          />
          <div className="flex flex-col justify-center items-start">
            <p className="text-xs">@{username}</p>
            <p className="text-[10px] text-gray-600">
              {isPremium ? "Premium" : "Free"}
            </p>
          </div>
        </ButtonAction>
        <ButtonAction>
          <Menu className="text-black size-6" />
        </ButtonAction>
      </div>
    </header>
  );
}
