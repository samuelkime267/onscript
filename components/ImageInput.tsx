"use client";

import React, { useRef, useState } from "react";
import ButtonAction from "./ButtonAction";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import Image from "next/image";

type ImageInputProps = {
  setImgPicUrl?: (url: string) => void;
  setImgFile?: (file: File) => void;
  className?: string;
};

export default function ImageInput({
  setImgPicUrl,
  setImgFile,
  className,
}: ImageInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [displayPic, setDisplayPic] = useState<string | undefined>();

  const handleBtn = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const pic = files[0];
    const url = URL.createObjectURL(pic);

    setDisplayPic(url);
    if (setImgPicUrl) setImgPicUrl(url);
    if (setImgFile) setImgFile(pic);
  };
  return (
    <div
      onClick={handleBtn}
      className={cn(
        "w-full aspect-square rounded-2xl cursor-pointer border border-white/12 bg-white/8 relative",
        className,
      )}
    >
      {displayPic && (
        <Image
          src={displayPic}
          alt="user"
          width={240}
          height={240}
          className="w-full h-full object-cover rounded-2xl"
        />
      )}

      {!displayPic && (
        <ButtonAction
          type="button"
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center flex-col gap-2"
        >
          <Upload className="size-4 text-black" />
          <p className="font-sora text-[0.625rem] max-w-[3pc] text-black text-center leading-[1]">
            Upload Image
          </p>
        </ButtonAction>
      )}

      <input
        ref={fileRef}
        accept=".png, .jpg, .jpeg"
        hidden
        type="file"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
}
