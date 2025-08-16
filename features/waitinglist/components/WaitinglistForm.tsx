import ButtonAction from "@/components/ButtonAction";
import Input from "@/components/Input";
import React from "react";

export default function WaitinglistForm() {
  return (
    <form className="w-full grid grid-cols-1 gap-4">
      <Input placeholder="Enter your name" id="name" label="Name" />
      <Input placeholder="Enter your email" id="email" label="Email" />
      <ButtonAction btnType="primary">Join waitlist</ButtonAction>
    </form>
  );
}
