import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  hideRequired?: boolean;
}

export default function Input({
  name,
  label,
  className,
  id,
  containerClassName,
  labelClassName,
  required,
  hideRequired,
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        "w-full flex items-start justify-start gap-1 flex-col",
        containerClassName,
      )}
    >
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-sm font-medium leading-6 text-gray-900",
            labelClassName,
            {
              "after:content-['*'] after:ml-0.5 after:text-red-500":
                !hideRequired && required,
            },
          )}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        required={required}
        className={cn(
          "w-full resize-none rounded-lg py-3.5 px-2 text-black outline-none ring-0 focus:ring-0 border border-neutral-200",
          className,
        )}
        {...props}
      />
    </div>
  );
}
