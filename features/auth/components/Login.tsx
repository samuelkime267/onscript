"use client";
import React, { Fragment } from "react";
import { useAccount } from "wagmi";
import { CardContent } from "@/components/ui/card";
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

export default function Login() {
  const { isError, isFetching, handleSignIn, mockSignIn } = useLogin();
  const { address } = useAccount();

  return (
    <Fragment>
      <CardContent className="flex flex-col gap-6">
        {isError && <p className="text-red-800 text-center">{isError}</p>}
        <p className="capitalize text-center">
          Connect wallet and Farcaster account to continue
        </p>
        <div className="w-full grid grid-cols-1 gap-4">
          <Wallet className="!min-w-full !w-full border border-red-900">
            <ConnectWallet className="!min-w-full !w-full bg-black hover:bg-black/80 !text-white">
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
              onClick={mockSignIn}
              // onClick={handleSignIn}
              btnType="primary"
              className={cn({ hidden: !address })}
            >
              Login with Farcaster
            </ButtonAction>
          )}
        </div>
      </CardContent>

      <Loader isLoading={isFetching} loaderText="Connecting..." />
    </Fragment>
  );
}
