import { cn } from "@/lib/utils";
import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function TextArea({
  rows,
  className,
  name,
  label,
  id,
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full flex items-start justify-start gap-1 flex-col">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        rows={rows || 10}
        className={cn(
          "w-full resize-none rounded-lg p-4 text-black outline-none ring-0 focus:ring-0 border border-neutral-200",
          className,
        )}
        {...props}
      ></textarea>
    </div>
  );
}
