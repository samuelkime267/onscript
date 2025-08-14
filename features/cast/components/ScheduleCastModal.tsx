"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TextArea from "@/components/TextArea";
import ButtonAction from "@/components/ButtonAction";
import ImageInput from "@/components/ImageInput";
import CastCard from "./CastCard";
import { cn } from "@/lib/utils";

type ScheduleCastModalProps = {
  profilePic?: string | null;
  username?: string | null;
};
type PathDisplayed = "preview-cast" | "create-cast";
const titles: Record<PathDisplayed, string> = {
  "preview-cast": "Preview Cast",
  "create-cast": "New Cast",
};

export default function ScheduleCastModal({
  profilePic,
  username,
}: ScheduleCastModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pathDisplayed, setPathDisplayed] =
    useState<PathDisplayed>("create-cast");
  const [files, setFiles] = useState<File[]>([]);
  const [cast, setCast] = useState({
    text: "",
    imgs: [] as string[],
  });
  const MAX_IMAGES = 4;
  const inputArr = [...Array(MAX_IMAGES)];

  const resetModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    setCast({ text: "", imgs: [] });
    setPathDisplayed("create-cast");
    if (isOpen) setFiles([]);
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={resetModal}>
      <AlertDialogTrigger className="primary flex items-center justify-center gap-2 w-fit px-8 bg-black hover:bg-black/80 font-medium text-white py-3.5 rounded-lg capitalize">
        <Plus className="size-4 text-white" />
        <p className="text-white">New Cast</p>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-h-[calc(100%-4rem)] overflow-y-auto !rounded-3xl p-4 gap-8">
        <AlertDialogHeader>
          <div className="w-full flex items-center justify-between gap-4">
            <AlertDialogTitle className="text-xl text-left font-medium text-black">
              {titles[pathDisplayed]}
            </AlertDialogTitle>
            <ButtonAction
              onClick={() => setIsModalOpen(false)}
              btnType="badge"
              className="px-2"
            >
              <Plus className="size-4 rotate-45 text-black" />
            </ButtonAction>
          </div>
          {pathDisplayed === "preview-cast" && (
            <ButtonAction
              btnType="badge"
              className="w-fit capitalize"
              onClick={() => setPathDisplayed("create-cast")}
            >
              Continue editing
            </ButtonAction>
          )}
          <AlertDialogDescription className="hidden">
            Enter details of cast
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div
          className={cn("grid grid-cols-1 gap-4", {
            hidden: pathDisplayed !== "create-cast",
          })}
        >
          <TextArea
            onChange={(e) => setCast({ ...cast, text: e.target.value })}
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
                    setCast((prevCast) => {
                      const newCast = { ...prevCast };
                      newCast.imgs[i] = url;
                      return newCast;
                    });
                  }}
                />
              );
            })}
          </div>
        </div>

        {pathDisplayed === "preview-cast" && (
          <CastCard
            {...cast}
            username={username}
            profilePic={profilePic}
            className="p-0"
            previewMode
          />
        )}

        <div className="w-full flex items-center justify-center gap-2">
          <ButtonAction
            onClick={() => setIsModalOpen(false)}
            btnType="secondary"
            className="w-full"
          >
            Save to draft
          </ButtonAction>
          <ButtonAction
            onClick={() => {
              if (pathDisplayed === "create-cast")
                setPathDisplayed("preview-cast");
              else setIsModalOpen(false);
            }}
            btnType="primary"
            className="w-full"
          >
            {pathDisplayed === "create-cast" ? "Preview cast" : "Schedule cast"}
          </ButtonAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
