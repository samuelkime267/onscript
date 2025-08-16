"use client";

import ButtonAction from "@/components/ButtonAction";
import React, { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";

type RequestSignatureProps = {
  id: string;
};

export default function RequestSignature({ id }: RequestSignatureProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [initiateSignerErr, setInitiateSignerErr] = useState<string>();
  const [deeplinkUrl, setDeeplinkUrl] = useState<string>();
  const [signerUuid, setSignerUuid] = useState<string>();
  const [publicKey, setPublicKey] = useState<string>();
  const [isPolling, setIsPolling] = useState(false);

  const startPolling = useCallback(() => {
    setIsPolling(true);
  }, []);
  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  useEffect(() => {
    if (!signerUuid || !isPolling) return;

    const id = setInterval(async () => {
      const res = await fetch(`/api/signer/status?uuid=${signerUuid}`);

      if (!res.ok) {
        const error = await res.json();
        console.log("error", error);
        setInitiateSignerErr(error.error);
        setIsFetching(false);
        retryCount++;
        count++;
        return;
      }

      const { status } = await res.json();
      if (status === "revoked") {
        clearInterval(id);
        return;
      }

      if (status === "approved") {
        clearInterval(id);
        return;
      }
    }, 2000);

    return () => {
      clearInterval(id);
    };
  }, [isPolling, signerUuid]);

  const registerSigner = useCallback(async () => {
    if (isFetching || !signerUuid || !publicKey) return;

    setIsFetching(true);
    const res = await fetch("/api/signer/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ signerUuid, publicKey, id }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("error", error);
      setInitiateSignerErr(error.error);
      setIsFetching(false);
      return;
    }

    const { signer_approval_url } = await res.json();
    setDeeplinkUrl(signer_approval_url);
    setIsFetching(false);
    startPolling();
  }, [signerUuid, publicKey, id, isFetching, startPolling]);

  const createSigner = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    const res = await fetch("/api/signer/create");
    if (!res.ok) {
      const error = await res.json();
      console.log("error", error);
      setInitiateSignerErr(error.error);
      setIsFetching(false);
      return;
    }

    const { signer_uuid, public_key } = await res.json();

    setSignerUuid(signer_uuid);
    setPublicKey(public_key);
    setIsFetching(false);

    await registerSigner();
  }, [isFetching, registerSigner]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4">
      {initiateSignerErr && <p>{initiateSignerErr}</p>}

      {deeplinkUrl && (
        <div className="flex items-center justify-center flex-col gap-4">
          <QRCode value={deeplinkUrl} />
          <p className="text-center">
            Scan with your phone to approve app to cast with your account
          </p>
        </div>
      )}

      <ButtonAction
        btnType="primary"
        disabled={isFetching}
        onClick={() => createSigner()}
      >
        {isFetching ? "Fetching link..." : "Request Signature"}
      </ButtonAction>
    </div>
  );
}
