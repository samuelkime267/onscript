"use client";

import React from "react";
import TextArea from "@/components/TextArea";
import ImageInput from "@/components/ImageInput";
import { cn } from "@/lib/utils";
import { type PathDisplayed } from "@/features/cast/utils/useCastModal";

type CastFormProps = {
  files: File[];
  inputArr: undefined[];
  pathDisplayed: PathDisplayed;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  text: string;
  setCastImgs: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CastForm({
  files,
  inputArr,
  pathDisplayed,
  setFiles,
  handleChange,
  text,
  setCastImgs,
}: CastFormProps) {
  return (
    <form
      className={cn("grid grid-cols-1 gap-4", {
        hidden: pathDisplayed !== "create-cast",
      })}
    >
      <TextArea
        onChange={handleChange}
        value={text}
        placeholder="Share a thought, an idea, or a story…"
      />
      <div className="grid grid-cols-4 gap-2 w-full">
        {inputArr.map((_, i) => {
          if (i > files.length) return null;
          return (
            <ImageInput
              key={i}
              setImgFile={(file) => {
                setFiles((prevFiles) => {
                  const newFiles = [...prevFiles];
                  newFiles[i] = file;
                  return newFiles;
                });
              }}
              setImgPicUrl={(url) => {
                setCastImgs((prevCast) => {
                  const newCast = [...prevCast];
                  newCast[i] = url;
                  return newCast;
                });
              }}
            />
          );
        })}
      </div>
    </form>
  );
}
