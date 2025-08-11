"use client";

import { cn } from "@/lib/utils";
import React from "react";

export type btnType = "primary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: btnType;
}

const btnVariants = {
  primary:
    "w-full bg-black hover:bg-black/80 font-medium font-geist text-white py-3.5 px-4 rounded-lg capitalize",
};

export default function ButtonAction({
  btnType,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(btnVariants[btnType as btnType] || "", className)}
      {...props}
    >
      {children}
    </button>
  );
}
