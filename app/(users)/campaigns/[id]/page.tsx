import ButtonAction from "@/components/ButtonAction";
import campaigns from "@/data/campaigns.data";
import { JoinCampaignSection } from "@/features/campaign/components";
import db from "@/lib/db";
import { formatScheduleDate } from "@/utils";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) redirect("/login");

  const { id } = await params;
  const campaign = campaigns.find((c) => c.id === Number(id));
  const participant = await db.launchCampaignParticipants.findUnique({
    where: {
      userId: session.user.id,
    },
  });
  const participantExists =
    participant?.isApproved !== null && participant?.isApproved !== undefined;

  if (!campaign) {
    return (
      <main className="p-4">
        <h1 className="text-black">Campaign not found</h1>
      </main>
    );
  }

  const {
    name,
    image,
    description,
    creatorImg,
    createdBy,
    startDate,
    endDate,
  } = campaign;

  return (
    <main className="text-black p-4 min-h-screen flex items-start justify-start flex-col w-full gap-4">
      <section className="w-full bg-white rounded-3xl flex flex-col gap-4 p-4 shadow-xl shadow-black/[0.05]">
        <div className="w-full aspect-square overflow-hidden rounded-3xl">
          <Image
            src={image}
            alt={name}
            width={450}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-black text-xl font-bold capitalize">{name}</h1>
          <p>{description}</p>
          {participantExists &&
            (participant.isApproved ? (
              <ButtonAction
                btnType="badge"
                className="border border-green-500 bg-green-500/10 text-green-500 rounded-full py-1 hover:bg-green-500/10"
              >
                Approved
              </ButtonAction>
            ) : (
              <ButtonAction
                btnType="badge"
                className="border border-orange-500 bg-orange-500/10 text-orange-500 rounded-full py-1 hover:bg-orange-500/10"
              >
                Pending Approval
              </ButtonAction>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-1">
          <div className="space-y-1">
            <p className="text-[0.625rem] text-neutral-500">Start Date</p>
            <ButtonAction btnType="badge">
              {formatScheduleDate(startDate)}
            </ButtonAction>
          </div>
          <div className="space-y-1">
            <p className="text-[0.625rem] text-neutral-500">End Date</p>
            <ButtonAction btnType="badge">
              {formatScheduleDate(endDate)}
            </ButtonAction>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-neutral-500">Creator</p>
          <div className="flex items-center gap-2">
            <Image
              src={creatorImg}
              alt="creator"
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
            <p>{createdBy}</p>
          </div>
        </div>
      </section>

      {!participantExists && <JoinCampaignSection />}
    </main>
  );
}
