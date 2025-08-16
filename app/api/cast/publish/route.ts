import { NextResponse } from "next/server";
import {
  makeCastAdd,
  NobleEd25519Signer,
  FarcasterNetwork,
} from "@farcaster/hub-nodejs";
import { castBodySchema } from "@/features/cast/schemas";

import { hexToBytes } from "viem"; // or ethers.utils.arrayify if using ethers

function normalizePrivateKey(key: string): Uint8Array {
  if (!key) throw new Error("Private key is required");

  // Remove whitespace and normalize casing
  let cleaned = key.trim().toLowerCase();

  // Ensure single 0x prefix
  if (!cleaned.startsWith("0x")) {
    cleaned = "0x" + cleaned;
  }

  // Validate hex format
  if (!/^0x[0-9a-f]+$/.test(cleaned)) {
    throw new Error("Invalid private key format");
  }

  // Convert to Uint8Array
  return hexToBytes(cleaned);
}

export async function POST(request: Request) {
  try {
    const privateKey = process.env.ACCOUNT_PRIVATE_KEY;
    if (!privateKey) {
      return NextResponse.json(
        { error: "Missing ACCOUNT_PRIVATE_KEY" },
        { status: 400, statusText: "Missing ACCOUNT_PRIVATE_KEY" },
      );
    }

    const body = await request.json();

    const parsedData = castBodySchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    const castData = parsedData.data;

    const ACCOUNT_PRIVATE_KEY = normalizePrivateKey(privateKey);
    const FID = 1148663; // Your fid

    const url = "https://api.neynar.com/v2/farcaster/cast/";
    const options = {
      method: "POST",
      headers: {
        "x-api-key": process.env.NEYNAR_API_KEY,
        "Content-Type": "application/json",
      },
      body: {
        signer_uuid: "19d0c5fd-9b33-4a48-a0e2-bc7b0555baec",
        parent_author_fid: FID,
        text: castData.text,
        embeds: castData.embeds,
        parent: castData.parentUrl,

        // channel_id: castData.,
        // idem: "<string>",
        // mentions: castData.mentions,
        // mentions_positions: castData.mentionsPositions,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    return NextResponse.json({ success: "Cast added" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";
// import {
//   makeCastAdd,
//   NobleEd25519Signer,
//   FarcasterNetwork,
// } from "@farcaster/hub-nodejs";
// import { castBodySchema } from "@/features/cast/schemas";

// import { hexToBytes } from "viem"; // or ethers.utils.arrayify if using ethers

// function normalizePrivateKey(key: string): Uint8Array {
//   if (!key) throw new Error("Private key is required");

//   // Remove whitespace and normalize casing
//   let cleaned = key.trim().toLowerCase();

//   // Ensure single 0x prefix
//   if (!cleaned.startsWith("0x")) {
//     cleaned = "0x" + cleaned;
//   }

//   // Validate hex format
//   if (!/^0x[0-9a-f]+$/.test(cleaned)) {
//     throw new Error("Invalid private key format");
//   }

//   // Convert to Uint8Array
//   return hexToBytes(cleaned);
// }

// export async function POST(request: Request) {
//   try {
//     const privateKey = process.env.ACCOUNT_PRIVATE_KEY;
//     if (!privateKey) {
//       return NextResponse.json(
//         { error: "Missing ACCOUNT_PRIVATE_KEY" },
//         { status: 400, statusText: "Missing ACCOUNT_PRIVATE_KEY" },
//       );
//     }

//     const body = await request.json();

//     const parsedData = castBodySchema.safeParse(body);

//     if (!parsedData.success) {
//       return NextResponse.json({ error: "Invalid data" }, { status: 400 });
//     }
//     const castData = parsedData.data;

//     const ACCOUNT_PRIVATE_KEY = normalizePrivateKey(privateKey);
//     const FID = 1148663; // Your fid
//     const ed25519Signer = new NobleEd25519Signer(ACCOUNT_PRIVATE_KEY);
//     const FC_NETWORK = FarcasterNetwork.MAINNET;
//     const dataOptions = {
//       fid: FID,
//       network: FC_NETWORK,
//     };
//     const cast = await makeCastAdd(castData, dataOptions, ed25519Signer);

//     console.log("cast", cast);

//     return NextResponse.json({ success: "Cast added" }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 },
//     );
//   }
// }
