import { WaitinglistForm } from "@/features/waitinglist/components";
import React from "react";
import { Zap } from "lucide-react";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-neutral-100">
      <div className="bg-white w-full rounded-3xl flex items-start justify-start gap-8 flex-col shadow-xl shadow-black/[0.05] p-4">
        <div className="w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 mx-auto">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-bold text-black text-base text-center">
            Join the Waitlist
          </h1>
          <p className="text-gray-500 text-xs text-center">
            Join our waitlist to be the first to experience Onscript
          </p>
        </div>

        <WaitinglistForm />
      </div>
    </main>
  );
}
