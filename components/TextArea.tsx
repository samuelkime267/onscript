import { cn } from "@/lib/utils";
import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  sth?: boolean;
}

export default function TextArea({ rows, className, ...props }: TextAreaProps) {
  return (
    <textarea
      rows={rows || 10}
      className={cn(
        "w-full resize-none rounded-xl p-4 text-black outline-none ring-0 focus:ring-0 border border-neutral-200",
        className,
      )}
      {...props}
    ></textarea>
  );
}
