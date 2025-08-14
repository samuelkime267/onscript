import Image from "next/image";
import React from "react";
import ButtonAction from "@/components/ButtonAction";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserDetails() {
  const session = await auth();
  if (!session) redirect("/login");

  // const mockUserData = {
  //   address: "0x3097139c11366006F73Fd357c1F2489d8CF3B96A",
  //   fid: 1175517,
  //   id: "cme6dktp90000ky044dw45lo5",
  //   image:
  //     "https://tba-mobile.mypinata.cloud/ipfs/QmeMpPVcM5Ex4EKuih8oUBMxzhbBNA2MBxQFL54KAL5JDs?pinataGatewayToken=3nq0UVhtd3rYmgYDdb1I9qv7rHsw-_DzwdWkZPRQ-QW1avFI9dCS8knaSfq_R5_q",
  //   name: "wahaladev.base.eth",
  //   isPremium: false,
  // };

  const { isPremium, image, name } = session.user;
  // const { isPremium, image, name } = mockUserData;

  return (
    <ButtonAction className="flex items-center justify-center gap-1">
      <div className="size-8 rounded-full overflow-hidden bg-gray-200">
        {image && (
          <Image
            src={image}
            alt={name || ""}
            width={40}
            height={40}
            className="rounded-full w-full h-full"
          />
        )}
      </div>
      <div className="flex flex-col justify-center items-start">
        <p className="text-[10px]">@{name}</p>
        <p className="text-[10px] text-gray-600">
          {isPremium ? "Premium" : "Freemium"}
        </p>
      </div>
    </ButtonAction>
  );
}
