import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, Shield, Stars, Zap } from "lucide-react";
import ButtonAction from "./ButtonAction";

export default function Onboarding() {
  return (
    <div className="w-full text-black flex items-center justify-center p-4 flex-col gap-6">
      <div className="flex items-center justify-center flex-col gap-1">
        <div className="w-20 h-20 bg-[#212121] rounded-xl flex items-center justify-center mx-auto mt-4 overflow-hidden">
          <Image
            src="/icon.png"
            width={100}
            height={100}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-black tracking-tight">
          Onscript
        </h1>
        <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Automate Smart, Automate Onchain
        </p>
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <div className="w-full bg-white p-4 rounded-xl flex items-center justify-center gap-1 flex-col shadow-xl shadow-black/[0.05]">
          <div className="border border-neutral-100 p-3 rounded-full">
            <Send className="size-6" />
          </div>
          <h4 className="text-base capitalize font-medium text-center">
            Seamless post scheduling
          </h4>
          <p className="text-center text-neutral-700 text-[0.625rem]">
            Schedule and automate casts all on chain
          </p>
        </div>

        <div className="w-full bg-white p-4 rounded-xl flex items-center justify-center gap-1 flex-col shadow-xl shadow-black/[0.05]">
          <div className="border border-neutral-100 p-3 rounded-full">
            <Stars className="size-6" />
          </div>
          <h4 className="text-base capitalize font-medium text-center">
            DM Automation
          </h4>
          <p className="text-center text-neutral-700 text-[0.625rem]">
            Trigger words activate XMTP responses
          </p>
        </div>

        <div className="w-full bg-white p-4 rounded-xl flex items-center justify-center gap-1 flex-col shadow-xl shadow-black/[0.05]">
          <div className="border border-neutral-100 p-3 rounded-full">
            <Zap className="size-6" />
          </div>
          <h4 className="text-base capitalize font-medium text-center">
            $1 Upgrades
          </h4>
          <p className="text-center text-neutral-700 text-[0.625rem]">
            Instant premium features
          </p>
        </div>
      </div>

      {/* CTA Button with Enhanced Shadows */}
      <Link href={"/login"} className="w-full">
        <ButtonAction btnType="primary" className="w-full">
          Get Started
        </ButtonAction>
      </Link>

      {/* Stats Bar */}
      <div className="border-t border-gray-200 w-full pt-4">
        <p className="text-gray-500 text-[0.625rem] text-center">
          30 Free DMs/week • 5 Free posts/week • $1 ETH, Base ETH, $ENB
        </p>
      </div>
    </div>
  );
}
