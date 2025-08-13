import { auth } from "@/auth";
import ButtonAction from "@/components/ButtonAction";
import { RequestSignature } from "@/features/auth/components";
import { Archive, CalendarClock, LucideSend, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { TbSpeakerphone } from "react-icons/tb";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const { name } = session.user;

  // const mockUserData = {
  //   address: "0x3097139c11366006F73Fd357c1F2489d8CF3B96A",
  //   fid: 1175517,
  //   id: "cme6dktp90000ky044dw45lo5",
  //   image:
  //     "https://tba-mobile.mypinata.cloud/ipfs/QmeMpPVcM5Ex4EKuih8oUBMxzhbBNA2MBxQFL54KAL5JDs?pinataGatewayToken=3nq0UVhtd3rYmgYDdb1I9qv7rHsw-_DzwdWkZPRQ-QW1avFI9dCS8knaSfq_R5_q",
  //   name: "wahaladev.base.eth",
  // };

  // const { name } = mockUserData;

  return (
    <main className="text-black p-4 bg-neutral-100 min-h-screen flex items-start justify-start flex-col w-full gap-4">
      <h1 className="font-semibold text-2xl h-fit normal-case">
        Welcome, {name}
      </h1>

      <div className="w-full grid grid-cols-2 gap-2">
        <div className="bg-white p-4 rounded-3xl flex items-start justify-start gap-12 flex-col shadow-xl shadow-black/[0.05]">
          <div className="border border-neutral-100 p-2 rounded-full">
            <LucideSend className="size-6" />
          </div>
          <div>
            <p className="text-2xl font-medium">{10}</p>
            <p>Sent casts</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl flex items-start justify-start gap-12 flex-col shadow-xl shadow-black/[0.05]">
          <div className="border border-neutral-100 p-2 rounded-full">
            <CalendarClock className="size-6" />
          </div>
          <div>
            <p className="text-2xl font-medium">{10}</p>
            <p>Queued casts</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl flex items-start justify-start gap-12 flex-col shadow-xl shadow-black/[0.05]">
          <div className="border border-neutral-100 p-2 rounded-full">
            <TbSpeakerphone className="size-6" />
          </div>
          <div>
            <p className="text-2xl font-medium">{2}</p>
            <p>Active campaign</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl flex items-start justify-start gap-12 flex-col shadow-xl shadow-black/[0.05]">
          <div className="border border-neutral-100 p-2 rounded-full">
            <Archive className="size-6" />
          </div>
          <div>
            <p className="text-2xl font-medium">{4}</p>
            <p>Drafts</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded-3xl flex items-center justify-center gap-4 flex-col shadow-xl shadow-black/[0.05]">
        <div className="border border-neutral-100 p-2 rounded-full">
          <CalendarClock className="size-8" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-center">
            Schedule a cast now
          </h4>
          <p className="text-center text-neutral-700">
            Keep your content flowing
          </p>
        </div>
        <ButtonAction
          btnType="primary"
          className="flex items-center justify-center gap-2 w-fit px-8"
        >
          <Plus className="size-4 text-white" />
          <p className="text-white">New Cast</p>
        </ButtonAction>
      </div>

      <div className="w-full bg-white p-4 rounded-3xl flex items-center justify-center gap-4 flex-col shadow-xl shadow-black/[0.05]">
        <h3 className="font-medium text-xl capitalize text-left w-full">
          Pending casts
        </h3>
      </div>

      <p>upgrade to premium</p>
      <RequestSignature />
    </main>
  );
}
