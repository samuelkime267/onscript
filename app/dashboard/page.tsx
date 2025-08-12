import { auth } from "@/auth";
import { RequestSignature } from "@/features/auth/components";
import { Archive, ChartAreaIcon, LucideSmartphoneNfc } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { TbSpeakerphone } from "react-icons/tb";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const { name } = session.user;

  return (
    <main className="text-black p-4 bg-neutral-100 min-h-screen flex items-start justify-start flex-col w-full gap-4">
      <h1 className="font-semibold text-2xl h-fit">Welcome, {name}</h1>

      <div className="w-full grid grid-cols-2 gap-2">
        <div className="bg-white p-4 rounded-2xl flex items-start justify-start gap-12 flex-col shadow-xl shadow-black/[0.05]">
          <div className="flex items-center justify-between gap-4">
            <LucideSmartphoneNfc className="size-8" />
          </div>
          <div>
            <p className="text-2xl font-medium">{10}</p>
            <p>Queued casts</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl flex items-start justify-start gap-12 flex-col shadow-xl shadow-black/[0.05]">
          <div className="flex items-center justify-between gap-4">
            <ChartAreaIcon className="size-8" />
          </div>
          <div>
            <p className="text-2xl font-medium">{10}</p>
            <p>Post usage</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl flex items-start justify-start gap-12 flex-col shadow-xl shadow-black/[0.05]">
          <div className="flex items-center justify-between gap-4">
            <TbSpeakerphone className="size-8" />
          </div>
          <div>
            <p className="text-2xl font-medium">{2}</p>
            <p>Active campaign</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl flex items-start justify-start gap-12 flex-col shadow-xl shadow-black/[0.05]">
          <div className="flex items-center justify-between gap-4">
            <Archive className="size-8" />
          </div>
          <div>
            <p className="text-2xl font-medium">{4}</p>
            <p>Drafts</p>
          </div>
        </div>
      </div>

      <p>casts sent this week</p>
      <p>pending casts to send</p>
      <p>schedule cast</p>
      <p>upgrade to premium</p>
      <RequestSignature />
    </main>
  );
}
