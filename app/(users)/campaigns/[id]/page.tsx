import campaigns from "@/data/campaigns.data";
import { JoinCampaignSection } from "@/features/campaign/components";
import Image from "next/image";

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = campaigns.find((c) => c.id === Number(id));

  if (!campaign) {
    return (
      <main className="p-4">
        <h1 className="text-black">Campaign not found</h1>
      </main>
    );
  }

  const { name, images, description, creatorImg, createdBy } = campaign;

  return (
    <main className="text-black p-4 min-h-screen flex items-start justify-start flex-col w-full gap-4">
      <section className="w-full bg-white rounded-3xl flex flex-col gap-4 p-4 shadow-xl shadow-black/[0.05]">
        <div className="w-full aspect-square overflow-hidden rounded-3xl">
          <Image
            src={images[0]}
            alt={name}
            width={450}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-black text-xl font-bold capitalize">{name}</h1>
          <p>{description}</p>
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

      <JoinCampaignSection />
    </main>
  );
}
