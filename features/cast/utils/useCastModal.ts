"use client";

import { useCallback, useState } from "react";
import useCastParserNeynar from "./useCasterParserNeynar";
import { useByteLimitedText } from "./useBytesLimitedText";

export type PathDisplayed = "preview-cast" | "create-cast";
const titles: Record<PathDisplayed, string> = {
  "preview-cast": "Preview Cast",
  "create-cast": "New Cast",
};

export default function useCastModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pathDisplayed, setPathDisplayed] =
    useState<PathDisplayed>("create-cast");
  const [files, setFiles] = useState<File[]>([]);
  const [castImgs, setCastImgs] = useState<string[]>([]);
  const MAX_IMAGES = 4;
  const inputArr: undefined[] = [...Array(MAX_IMAGES)];

  const { castData, parseCast } = useCastParserNeynar();
  const { handleChange, text } = useByteLimitedText();
  const [isLoading, setIsLoading] = useState(false);

  const resetModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    parseCast("");
    setPathDisplayed("create-cast");
    if (isOpen) setFiles([]);
  };

  const finalEmbed = [...castData.embeds, ...castImgs.map((url) => ({ url }))];
  const finalData = {
    ...castData,
    embeds: finalEmbed,
  };

  const handlePublish = useCallback(async () => {
    console.log("castData", castData);

    // setIsLoading(true);
    // const res = await fetch("/api/cast/publish", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(castData),
    // });

    // if (!res.ok) {
    //   console.log("error", await res.json());
    //   setIsLoading(false);
    //   return;
    // }

    // console.log("success", await res.json());
    // setIsLoading(false);
    // // resetModal(false);
  }, [castData]);

  return {
    isModalOpen,
    setIsModalOpen,
    pathDisplayed,
    setPathDisplayed,
    files,
    setFiles,
    MAX_IMAGES,
    inputArr,
    resetModal,
    titles,
    castData,
    parseCast,
    handleChange,
    text,
    isLoading,
    handlePublish,
    setCastImgs,
    castImgs,
    finalData,
  };
}
