import { auth } from "@/auth";
import ButtonAction from "@/components/ButtonAction";
import StatusCard from "@/components/StatusCard";
import { scheduledCasts } from "@/data/casts.data";
import CastCard from "@/features/cast/components/CastCard";
import ScheduleCastNow from "@/features/cast/components/ScheduleCastNow";
import { Archive, CalendarClock, LucideSend } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { TbSpeakerphone } from "react-icons/tb";

export default async function Dashboard() {
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

  // const pendingCastsShown = 3;
  // const pendingCasts = scheduledCasts.slice(0, pendingCastsShown);

  return (
    <main className="text-black p-4 bg-neutral-100 min-h-screen flex items-start justify-start flex-col w-full gap-4">
      <h1 className="font-semibold text-2xl h-fit normal-case">
        Welcome, {name}
      </h1>

      <section className="w-full grid grid-cols-2 gap-4">
        <StatusCard Icon={LucideSend} value={10} text="Sent casts" />
        <StatusCard Icon={CalendarClock} value={10} text="Queued casts" />
        <StatusCard Icon={TbSpeakerphone} value={2} text="Active campaign" />
        <StatusCard Icon={Archive} value={26} text="Drafts" />
      </section>

      <ScheduleCastNow />

      <section className="w-full bg-white rounded-3xl flex items-center justify-center flex-col shadow-xl shadow-black/[0.05]">
        <h3 className="font-medium text-xl capitalize text-left w-full p-4 pb-0">
          Scheduled casts
        </h3>

        <div className="grid grid-cols-1 divide-y divide-neutral-100">
          {scheduledCasts.map((cast, i) => {
            return (
              <CastCard key={i} {...cast} username={name} profilePic={image} />
            );
          })}
        </div>

        <div className="px-4 pb-4">
          <Link href={"/"}>
            <ButtonAction btnType="primary" className="w-fit px-8">
              See all
            </ButtonAction>
          </Link>
        </div>
      </section>

      <div>
        <p className="h-fit">upgrade to premium</p>
      </div>
    </main>
  );
}
