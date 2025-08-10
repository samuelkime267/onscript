"use client";

import { useEffect, type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import sdk from "@farcaster/miniapp-sdk";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/config";
import store from "@/redux";
import { Provider } from "react-redux";

export default function Providers(props: { children: ReactNode }) {
  useEffect(() => {
    async function init() {
      await sdk.actions.ready();
    }
    init();
  }, []);

  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "mini-app-theme",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          logo: process.env.NEXT_PUBLIC_ICON_URL,
        },
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <Provider store={store}>{props.children}</Provider>
      </WagmiProvider>
    </MiniKitProvider>
  );
}
