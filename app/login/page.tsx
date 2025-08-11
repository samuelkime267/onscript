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
import ButtonAction from "@/components/ButtonAction";
import Loader from "@/components/Loader";
import useLogin from "@/features/auth/utils/useLogin";

export default function LoginPage() {
  const { isError, isFetching, userFound, handleSignIn, getUser } = useLogin();
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
          {isError && <p className="text-red-800 text-center">{isError}</p>}
          <p className="capitalize text-center">
            Connect wallet and Farcaster account to continue
          </p>
          <div className="space-y-4">
            <Wallet className="!w-full">
              <ConnectWallet className="!w-full bg-black hover:bg-black/80 !text-white">
                <Avatar className="h-6 w-6 hidden" />
                <Name className="text-white" />
              </ConnectWallet>

              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>

            {address && (
              <ButtonAction
                disabled={!address}
                onClick={() => {
                  if (userFound === false) handleSignIn();
                  if (userFound === null) getUser();
                }}
                btnType="primary"
                className={cn({ hidden: !address })}
              >
                {userFound === false
                  ? "connect farcaster"
                  : userFound === null
                    ? "Check user exist"
                    : "Logging in..."}
              </ButtonAction>
            )}
          </div>
        </CardContent>
      </Card>

      <Loader isLoading={isFetching} loaderText="Connecting..." />
    </div>
  );
}
