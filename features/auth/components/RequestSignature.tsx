"use client";

import ButtonAction from "@/components/ButtonAction";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import usePollSignedKey from "../utils/useSignPollKey";

export default function RequestSignature() {
  const [isFetching, setIsFetching] = useState(false);
  const [initiateSignerErr, setInitiateSignerErr] = useState<string>();
  const [deeplinkUrl, setDeeplinkUrl] = useState<string>();
  const [token, setToken] = useState<string>();

  const { startPolling, stopPolling, requestSigned } = usePollSignedKey(token);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      const res = await fetch("/api/initiate-signer");
      if (!res.ok) {
        setInitiateSignerErr("Something went wrong");
        setIsFetching(false);
        return;
      }

      const { deeplinkUrl, token } = await res.json();

      console.log({ deeplinkUrl, token });

      setDeeplinkUrl(deeplinkUrl);
      setToken(token);
      startPolling();
      setIsFetching(false);
    }

    if (!isFetching) return;
    fetchData();

    return () => {
      stopPolling();
    };
  }, [isFetching, startPolling, stopPolling]);

  useEffect(() => {
    if (requestSigned) {
      stopPolling();
      alert("request signed");
    }
  }, [requestSigned, stopPolling]);

  if (initiateSignerErr) return <div>{initiateSignerErr}</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {deeplinkUrl && (
        <div className="flex items-center justify-center flex-col gap-4">
          <QRCode value={deeplinkUrl} />
          <p className="text-red-800">
            Scan with your phone to approve app to cast with your account
          </p>
        </div>
      )}
      <ButtonAction disabled={isFetching} onClick={() => setIsFetching(true)}>
        {isFetching ? "Fetching link..." : "Request Signature"}
      </ButtonAction>
    </div>
  );
}
