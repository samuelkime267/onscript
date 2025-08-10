import React from "react";

type LoaderProps = {
  isLoading: boolean;
  loaderText?: string;
};

export default function Loader({
  isLoading,
  loaderText = "Loading...",
}: LoaderProps) {
  return (
    isLoading && (
      <div className="fixed top-0 left-0 w-full h-full z-[10000000] flex items-center justify-center flex-col gap-4 bg-white/70 backdrop-blur">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-black">{loaderText}</p>
      </div>
    )
  );
}
