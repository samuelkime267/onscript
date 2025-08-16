import React from "react";
// import { scheduledCasts } from "@/data/casts.data";
// import CastCard from "@/features/cast/components/CastCard";
import ScheduleCastNow from "@/features/cast/components/ScheduleCastNow";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import ButtonAction from "@/components/ButtonAction";

export default async function Casts() {
  const session = await auth();
  if (!session) redirect("/login");

  const { name, image } = session.user;

  // const mockUserData = {
  //   address: "0x3097139c11366006F73Fd357c1F2489d8CF3B96A",
  //   fid: 1175517,
  //   id: "cme6dktp90000ky044dw45lo5",
  //   image:
  //     "https://tba-mobile.mypinata.cloud/ipfs/QmeMpPVcM5Ex4EKuih8oUBMxzhbBNA2MBxQFL54KAL5JDs?pinataGatewayToken=3nq0UVhtd3rYmgYDdb1I9qv7rHsw-_DzwdWkZPRQ-QW1avFI9dCS8knaSfq_R5_q",
  //   name: "wahaladev.base.eth",
  // };

  // const { name, image } = mockUserData;

  return (
    <main className="text-black p-4 bg-neutral-100 min-h-screen flex items-start justify-start flex-col w-full gap-4">
      <ScheduleCastNow profilePic={image} username={name} />

      <section className="w-full bg-white rounded-3xl flex items-center justify-center flex-col shadow-xl shadow-black/[0.05]">
        <h3 className="font-medium text-xl capitalize text-left w-full p-4 pb-0">
          Scheduled casts
        </h3>

        <div className="p-4 w-full">
          <div className="p-8 border border-neutral-200 rounded-3xl flex items-center justify-center gap-4 flex-col w-full">
            <div className="border border-neutral-100 p-4 rounded-full">
              <Lock className="size-8" />
            </div>
            <p className="text-center text-neutral-700">
              {"This feature is not available yet"}
            </p>
            <ButtonAction
              btnType="primary"
              className="flex items-center justify-center gap-2 w-fit px-8"
            >
              <Lock className="size-4 text-white" />
              <p className="text-white">Coming soon</p>
            </ButtonAction>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 divide-y divide-neutral-100">
          {scheduledCasts.map((cast, i) => {
            return (
              <CastCard key={i} {...cast} username={name} profilePic={image} />
            );
          })}
        </div> */}
      </section>
    </main>
  );
}
