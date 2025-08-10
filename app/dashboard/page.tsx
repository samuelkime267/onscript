"use client";

import { MiniAppDashboard } from "@/components/MiniAppDashboard";
import { useAppSelector } from "@/utils";
import React from "react";

export default function Dashboard() {
  const data = useAppSelector((state) => state.user);
  console.log(data);

  return (
    <div className="text-black">
      <MiniAppDashboard />
    </div>
  );
}
