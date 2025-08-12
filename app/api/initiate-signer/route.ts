import * as ed from "@noble/ed25519";
import axios from "axios";
import { privateKeyToAccount } from "viem/accounts";

export async function GET(req: Request) {
  console.log(req);
  try {
    const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
      name: "Farcaster SignedKeyRequestValidator",
      version: "1",
      chainId: 10,
      verifyingContract: "0x00000000fc700472606ed4fa22623acf62c60553",
    } as const;

    const SIGNED_KEY_REQUEST_TYPE = [
      { name: "requestFid", type: "uint256" },
      { name: "key", type: "bytes" },
      { name: "deadline", type: "uint256" },
    ] as const;

    const privateKey = ed.utils.randomPrivateKey();
    const publicKeyBytes = await ed.getPublicKeyAsync(privateKey);
    const key = `0x${Buffer.from(publicKeyBytes).toString("hex")}`;

    const { APP_FID, ACCOUNT_PRIVATE_KEY } = process.env;
    if (!APP_FID || !ACCOUNT_PRIVATE_KEY) {
      return Response.json(
        { error: "Missing APP_FID or ACCOUNT_PRIVATE_KEY" },
        { status: 400, statusText: "Missing APP_FID or ACCOUNT_PRIVATE_KEY" },
      );
    }

    const appFid = APP_FID;
    const account = privateKeyToAccount(`0x${ACCOUNT_PRIVATE_KEY}`);

    const deadline = Math.floor(Date.now() / 1000) + 86400; // signature is valid for 1 day
    const signature = await account.signTypedData({
      domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
      types: {
        SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE,
      },
      primaryType: "SignedKeyRequest",
      message: {
        requestFid: BigInt(appFid),
        key: key as `0x${string}`,
        deadline: BigInt(deadline),
      },
    });

    const farcasterClientApi = "https://api.farcaster.xyz";
    const axiosData = await axios
      .post(`${farcasterClientApi}/v2/signed-key-requests`, {
        key,
        requestFid: appFid,
        signature,
        deadline,
      })
      .then((response) => response.data.result.signedKeyRequest);

    const { token, deeplinkUrl } = axiosData;
    console.log(deeplinkUrl, "deeplink backend");

    const finalData = { deeplinkUrl, token };

    return new Response(JSON.stringify(finalData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    const errorData = {
      msg: "Something went wrong",
    };

    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message: string }).message === "string"
    ) {
      const message = (error as { message: string }).message;
      errorData.msg = message;
    }

    return new Response(JSON.stringify(errorData), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
