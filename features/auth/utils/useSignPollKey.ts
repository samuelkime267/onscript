import { useEffect, useState } from "react";
import axios from "axios";

export default function usePollSignedKey(token: string | undefined) {
  const [isPolling, setIsPolling] = useState(false);
  const [requestSigned, setRequestSigned] = useState(false);

  useEffect(() => {
    if (!token || !isPolling) return;

    let isCancelled = false;

    const poll = async () => {
      const farcasterClientApi = "https://api.farcaster.xyz";

      while (!isCancelled) {
        await new Promise((r) => setTimeout(r, 2000));
        console.log("polling signed key request...");

        try {
          const signedKeyRequest = await axios
            .get(`${farcasterClientApi}/v2/signed-key-request`, {
              params: { token },
            })
            .then((res) => res.data.result.signedKeyRequest);

          if (isCancelled) {
            setIsPolling(false);
            break;
          }

          console.log(signedKeyRequest, "Signed Key Request");

          if (signedKeyRequest.state === "completed") {
            setRequestSigned(true);
            setIsPolling(false);
            console.log("Signed Key Request completed:", signedKeyRequest);
            break;
          }
        } catch (err) {
          console.error("Polling failed", err);
          setIsPolling(false);
          break;
        }
      }
    };

    poll();

    return () => {
      isCancelled = true;
      setIsPolling(false);
    };
  }, [token, isPolling]);

  const startPolling = () => {
    setRequestSigned(false);
    setIsPolling(true);
  };

  const stopPolling = () => {
    setIsPolling(false);
  };

  return {
    requestSigned,
    isPolling,
    startPolling,
    stopPolling,
  };
}
