"use client";

import { useState } from "react";

type PathDisplayed = "preview-cast" | "create-cast";
const titles: Record<PathDisplayed, string> = {
  "preview-cast": "Preview Cast",
  "create-cast": "New Cast",
};

export default function useCastModal() {
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

  return {
    isModalOpen,
    setIsModalOpen,
    pathDisplayed,
    setPathDisplayed,
    files,
    setFiles,
    cast,
    setCast,
    MAX_IMAGES,
    inputArr,
    resetModal,
    titles,
  };
}
