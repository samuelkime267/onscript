import React from "react";

export default function Init() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-white">⚡</span>
        </div>
        <h1 className="text-2xl font-bold text-black mb-2">Onscript</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
