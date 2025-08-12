"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";
import { Login } from "@/features/auth/components";

export default function LoginPage() {
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

        <Login />
      </Card>
    </div>
  );
}
