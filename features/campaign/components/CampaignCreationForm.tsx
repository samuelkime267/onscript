"use client";

import React from "react";
import ButtonAction from "@/components/ButtonAction";
import Input from "@/components/Input";
import ImageInput from "@/components/ImageInput";
import TextArea from "@/components/TextArea";

export default function CampaignCreationForm() {
  return (
    <form className="w-full grid grid-cols-1 gap-4">
      <div className="flex items-center justify-center">
        <ImageInput className="size-48" />
      </div>
      <Input placeholder="Enter your name" id="name" label="Name" />
      <TextArea
        placeholder="Enter your description"
        id="description"
        label="Description"
      />
      <ButtonAction btnType="primary">Create campaign</ButtonAction>
    </form>
  );
}
