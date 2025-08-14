import { auth } from "@/auth";
import ButtonAction from "@/components/ButtonAction";
import StatusCard from "@/components/StatusCard";
import campaigns from "@/data/campaigns.data";
import { scheduledCasts } from "@/data/casts.data";
import CastCard from "@/features/cast/components/CastCard";
import ScheduleCastNow from "@/features/cast/components/ScheduleCastNow";
import { formatScheduleDate } from "@/utils";
import { Archive, CalendarClock, LucideSend } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Fragment } from "react";
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

  const pendingCastsShown = 3;
  const pendingCasts = scheduledCasts.slice(0, pendingCastsShown);

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

      <ScheduleCastNow profilePic={image} username={name} />

      <section className="w-full bg-white rounded-3xl flex items-center justify-center flex-col shadow-xl shadow-black/[0.05]">
        <h3 className="font-medium text-xl capitalize text-left w-full p-4 pb-0">
          Scheduled casts
        </h3>

        <div className="grid grid-cols-1 divide-y divide-neutral-100">
          {pendingCasts.map((cast, i) => {
            return (
              <CastCard key={i} {...cast} username={name} profilePic={image} />
            );
          })}
        </div>

        <div className="p-4">
          <Link href={"/casts"}>
            <ButtonAction btnType="primary" className="w-fit px-8">
              See all
            </ButtonAction>
          </Link>
        </div>
      </section>

      <section className="w-full bg-white rounded-3xl flex items-center justify-center flex-col shadow-xl shadow-black/[0.05]">
        <h3 className="font-medium text-xl capitalize text-left w-full p-4 pb-0">
          Active Campaigns
        </h3>

        <div className="grid grid-cols-1 gap-4 p-4">
          {campaigns.map(
            ({ name, images, endDate, description, isOpen }, i) => {
              return (
                <Fragment key={i}>
                  <div className="flex items-start justify-start gap-4 flex-col relative aspect-[4/5] w-full rounded-2xl overflow-hidden">
                    <div className="w-full h-full">
                      <Image
                        src={images[0]}
                        alt={name}
                        width={450}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="absolute top-0 left-0 w-full h-full p-4 flex items-start justify-end gap-2 flex-col bg-black/70">
                      <ButtonAction
                        btnType="badge"
                        className="text-white border-white/20 bg-white/8 backdrop-blur-md hover:bg-white/15 mb-auto ml-auto rounded-full overflow-hidden"
                      >
                        {isOpen ? "Open" : "Closed"}
                      </ButtonAction>
                      <h4 className="font-semibold text-white text-xl capitalize">
                        {name}
                      </h4>
                      <p className="text-xs text-gray-300/90">{description}</p>
                      <div>
                        <ButtonAction
                          btnType="badge"
                          className="text-white border-white/20 bg-white/8 backdrop-blur-md hover:bg-white/15"
                        >
                          Ends: {formatScheduleDate(endDate)}
                        </ButtonAction>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            },
          )}
        </div>

        <div className="p-4">
          <Link href={"/campaigns"}>
            <ButtonAction btnType="primary" className="w-fit px-8">
              See all
            </ButtonAction>
          </Link>
        </div>
      </section>
    </main>
  );
}
