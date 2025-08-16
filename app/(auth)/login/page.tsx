"use client";
import React from "react";
import { Login } from "@/features/auth/components";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full bg-white p-4 rounded-xl flex items-center justify-center gap-8 flex-col shadow-xl shadow-black/[0.05]">
        <div className="flex items-center justify-center flex-col gap-1">
          <div className="w-16 h-16 bg-[#212121] rounded-xl flex items-center justify-center mx-auto mt-4 overflow-hidden">
            <Image
              src="/icon.png"
              width={100}
              height={100}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-bold text-black text-base">
            Welcome to Onscript
          </h1>
          <p className="text-gray-500 text-xs text-center">
            The first decentralized social automation platform with
            contract-based authentication
          </p>
        </div>

        <Login />
      </div>
    </div>
  );
}
