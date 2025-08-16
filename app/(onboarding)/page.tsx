"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import Init from "../../components/Init";
import Onboarding from "@/components/Onboarding";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState<"init" | "onboarding">("init");

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    const id = setTimeout(() => {
      setActiveTab("onboarding");
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <main className="flex-1 min-h-screen">
      {activeTab === "init" && <Init />}
      {activeTab === "onboarding" && <Onboarding />}
    </main>
  );
}
