"use client";

import { CalendarClock, Plus } from "lucide-react";
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

export default function ScheduleCastNow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const MAX_IMAGES = 4;
  const inputArr = [...Array(MAX_IMAGES)];
  return (
    <div className="w-full bg-white p-8 rounded-3xl flex items-center justify-center gap-4 flex-col shadow-xl shadow-black/[0.05]">
      <div className="border border-neutral-100 p-4 rounded-full">
        <CalendarClock className="size-8" />
      </div>
      <div>
        <h4 className="text-lg font-medium text-center">Schedule a cast now</h4>
        <p className="text-center text-neutral-700">
          Keep your content flowing
        </p>
      </div>

      <AlertDialog
        open={isModalOpen}
        onOpenChange={(isOpen) => {
          setIsModalOpen(isOpen);
          if (isOpen) setFiles([]);
        }}
      >
        <AlertDialogTrigger className="primary flex items-center justify-center gap-2 w-fit px-8 bg-black hover:bg-black/80 font-medium text-white py-3.5 rounded-lg capitalize">
          <Plus className="size-4 text-white" />
          <p className="text-white">New Cast</p>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[calc(100%-2rem)] rounded-3xl p-4">
          <AlertDialogHeader>
            <div className="w-full flex items-center justify-between gap-4">
              <AlertDialogTitle className="text-xl text-left font-medium text-black">
                New Cast
              </AlertDialogTitle>
              <ButtonAction
                onClick={() => setIsModalOpen(false)}
                btnType="badge"
                className="px-2"
              >
                <Plus className="size-4 rotate-45 text-black" />
              </ButtonAction>
            </div>
            <AlertDialogDescription className="hidden">
              Enter details of cast
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid grid-cols-1 gap-4">
            <TextArea placeholder="Share a thought, an idea, or a story…" />
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
                  />
                );
              })}
            </div>

            <div className="w-full flex items-center justify-center gap-2">
              <ButtonAction
                onClick={() => setIsModalOpen(false)}
                btnType="secondary"
                className="w-full"
              >
                Save to draft
              </ButtonAction>
              <ButtonAction
                onClick={() => setIsModalOpen(false)}
                btnType="primary"
                className="w-full"
              >
                Schedule Post
              </ButtonAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
