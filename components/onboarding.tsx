import React from "react";
import Link from "next/link";

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-4xl text-white">⚡</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
            Onscript
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Automate Smart, Automate Onchain
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Onchain Transparency
              </h3>
              <p className="text-gray-600 text-sm">
                Smart contracts enforce all rules
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                DM Automation
              </h3>
              <p className="text-gray-600 text-sm">
                Trigger words activate XMTP responses
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                $1 Upgrades
              </h3>
              <p className="text-gray-600 text-sm">Instant premium features</p>
            </div>
          </div>

          {/* CTA Button with Enhanced Shadows */}
          <Link href={"/login"}>
            <button
              className="
              bg-black text-white px-12 py-4 rounded-2xl text-lg font-semibold
              shadow-2xl hover:shadow-3xl hover:shadow-black/40 
              transform hover:scale-105 active:scale-95 
              transition-all duration-300 min-h-[56px]
            "
            >
              Get Started
            </button>
          </Link>

          {/* Stats Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              30 Free DMs/week • 5 Free posts/week • $1 ETH, Base ETH, $ENB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
