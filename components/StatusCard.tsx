import React from "react";

type StatusCardProps = {
  Icon: React.FC<React.SVGAttributes<SVGElement>>;
  value: number;
  text: string;
};

export default function StatusCard({ Icon, value, text }: StatusCardProps) {
  return (
    <div className="bg-white w-full aspect-[0.9] p-4 rounded-3xl flex items-start justify-start gap-12 flex-col shadow-xl shadow-black/[0.05]">
      <div className="border border-neutral-100 p-3 rounded-full">
        <Icon className="size-6" />
      </div>
      <div className="mt-auto">
        <p className="text-2xl font-medium mb-1">{value}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}
