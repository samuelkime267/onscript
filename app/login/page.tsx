"use client";
import React from "react";
import { useAccount } from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Zap } from "lucide-react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import { cn } from "@/lib/utils";
import QRCode from "react-qr-code";
import ButtonAction from "@/components/ButtonAction";
import Loader from "@/components/Loader";
import useLogin from "@/features/auth/utils/useLogin";
import sdk from "@farcaster/miniapp-sdk";

export default function LoginPage() {
  const {
    farcasterConnectUrl,
    isError,
    isFarcasterModal,
    isFetching,
    userFound,
    setIsFarcasterModal,
    retry,
    setStartRetry,
  } = useLogin();
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 mx-auto">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="font-bold text-black">
            Welcome to Onscript
          </CardTitle>
          <CardDescription className="text-gray-500 text-xs">
            The first decentralized social automation platform with
            contract-based authentication
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            {isError && <p className="text-red-800 text-center">{isError}</p>}
            {retry && (
              <ButtonAction
                btnType="primary"
                onClick={() => setStartRetry(true)}
              >
                Retry
              </ButtonAction>
            )}
          </div>
          <p>To continue connect wallet and link your Farcaster account</p>
          <div className="space-y-4">
            <Wallet className="!w-full">
              <ConnectWallet className="!w-full bg-black hover:bg-black/80 text-white" />

              <WalletDropdown className="!bg-red-900">
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>

            {userFound === false && (
              <ButtonAction
                disabled={!address}
                onClick={() => setIsFarcasterModal(true)}
                btnType="primary"
                className={cn({ hidden: !address })}
              >
                connect farcaster
              </ButtonAction>
            )}
          </div>
        </CardContent>
      </Card>

      <Loader isLoading={isFetching} loaderText="Connecting..." />

      <Dialog open={isFarcasterModal} onOpenChange={setIsFarcasterModal}>
        <DialogContent className="max-w-[calc(100vw-2rem)] rounded-lg">
          <DialogTitle
            className={cn("text-black text-center", {
              hidden: !farcasterConnectUrl,
            })}
          >
            Connect Farcaster
          </DialogTitle>

          {isError && <p className="text-red-800 text-center">{isError}</p>}
          {retry && (
            <ButtonAction btnType="primary" onClick={() => setStartRetry(true)}>
              Retry
            </ButtonAction>
          )}

          {farcasterConnectUrl && (
            <div className="flex items-center justify-center flex-col gap-4">
              <QRCode value={farcasterConnectUrl} />
              <p className="text-center">
                Scan with your phone to create account
              </p>
              <button
                className="w-full bg-black hover:bg-black/80 text-white py-2 px-4 rounded-lg capitalize"
                onClick={() => {
                  if (farcasterConnectUrl.length > 0)
                    sdk.actions.openUrl(farcasterConnectUrl);
                  // window.open(farcasterConnectUrl, "_blank");
                }}
              >
                {"I'm on my phone"}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
