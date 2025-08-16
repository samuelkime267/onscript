import Image from "next/image";
import React from "react";

export default function Init() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-[#212121] rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
          <Image
            src="/icon.png"
            width={100}
            height={100}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-[#212121] mb-2">Onscript</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
