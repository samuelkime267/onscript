import { auth } from "@/auth";
import { getUserById } from "@/helpers/read-db";
import db from "@/lib/db";
import { NextResponse } from "next/server";

// const mockUserData = {
//   address: "0x3097139c11366006F73Fd357c1F2489d8CF3B96A",
//   fid: 1175517,
//   id: "cme6dktp90000ky044dw45lo5",
//   image:
//     "https://tba-mobile.mypinata.cloud/ipfs/QmeMpPVcM5Ex4EKuih8oUBMxzhbBNA2MBxQFL54KAL5JDs?pinataGatewayToken=3nq0UVhtd3rYmgYDdb1I9qv7rHsw-_DzwdWkZPRQ-QW1avFI9dCS8knaSfq_R5_q",
//   name: "wahaladev.base.eth",
// };

// const { name, image, id } = mockUserData;

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = session.user;
    const user = await getUserById(id);

    const { NEYNAR_API_URL, NEYNAR_API_KEY } = process.env;

    if (!NEYNAR_API_URL || !NEYNAR_API_KEY) {
      return NextResponse.json(
        { error: "variables is not set" },
        { status: 400 },
      );
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { signerRegDeadline, signerUuid, isUuidApprove, signerApprovalUrl } =
      user;

    if (isUuidApprove) {
      return NextResponse.json(
        { error: "User already has a signer" },
        { status: 400 },
      );
    }

    if (
      signerUuid &&
      signerRegDeadline &&
      signerApprovalUrl &&
      signerRegDeadline.getTime() > Date.now()
    ) {
      return NextResponse.json(
        { error: "Signer registration deadline has not passed" },
        { status: 400 },
      );
    }

    if (signerUuid && !signerRegDeadline) {
      return NextResponse.json(
        { error: "Signer already has a signer that has not been approved" },
        { status: 400 },
      );
    }

    const url = `${NEYNAR_API_URL}/v2/farcaster/signer/`;
    const options = {
      method: "POST",
      headers: { "x-api-key": NEYNAR_API_KEY },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      console.log("error", await response.json());

      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      );
    }

    const data = await response.json();
    const { signer_uuid, public_key } = data;

    if (!signer_uuid || !public_key) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      );
    }

    await db.user.update({
      where: { id },
      data: {
        signerUuid: signer_uuid,
        signerPublicKey: public_key,
        isUuidApprove: false,
        signerRegDeadline: null,
      },
    });

    return NextResponse.json(
      { message: "Signer created", signer_uuid, public_key },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 400 },
    );
  }
}
