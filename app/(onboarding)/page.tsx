"use client";

import { useAddFrame, useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import Init from "../../components/Init";
import Onboarding from "@/components/onboarding";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState<"init" | "onboarding">("init");
  const addFrame = useAddFrame();

  // TODO: add this later

  const handleAddFrame = async () => {
    const result = await addFrame();
    if (result) {
      console.log("Frame added:", result.url, result.token);
    }
  };

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
      <button onClick={handleAddFrame}>Add frame</button>
    </main>
  );
}
