"use client";

import React, { useState } from "react";
import ButtonAction from "@/components/ButtonAction";
import { PathDisplayed } from "@/features/cast/utils/useCastModal";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DateTimePicker } from "@/components/DateTimePicker";

export default function ScheduleCastButtons({
  isLoading,
  pathDisplayed,
  setPathDisplayed,
  setIsModalOpen,
  parseCast,
  handlePublish,
  text,
}: {
  isLoading: boolean;
  pathDisplayed: PathDisplayed;
  setPathDisplayed: React.Dispatch<React.SetStateAction<PathDisplayed>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parseCast: (text: string) => Promise<void>;
  handlePublish: () => Promise<void>;
  text: string;
}) {
  const [isSetPublishTimeOpen, setIsSetPublishTimeOpen] = useState(false);
  return (
    <>
      {" "}
      <div className="w-full flex items-center justify-center gap-2">
        <ButtonAction
          onClick={() => setIsModalOpen(false)}
          btnType="secondary"
          className="w-full"
        >
          Save to draft
        </ButtonAction>
        <ButtonAction
          disabled={isLoading}
          onClick={() => {
            if (pathDisplayed === "create-cast") {
              setPathDisplayed("preview-cast");
              parseCast(text);
            } else {
              handlePublish();
              // setIsModalOpen(false);
              setIsSetPublishTimeOpen(true);
            }
          }}
          btnType="primary"
          className="w-full"
        >
          {isLoading
            ? "loading"
            : pathDisplayed === "create-cast"
              ? "Preview cast"
              : "Schedule cast"}
        </ButtonAction>
      </div>
      {isSetPublishTimeOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-[1000] bg-black/40 p-4 backdrop-blur-sm">
          <DateTimePicker />
        </div>
      )}
    </>
  );
}
