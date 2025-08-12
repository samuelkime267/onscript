import Image from "next/image";
import React from "react";
import ButtonAction from "./ButtonAction";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const session = await auth();
  if (!session) redirect("/login");

  const { isPremium, image, name } = session.user;
  console.log("session", session);

  return (
    <header className="sticky top-0 left-0 shadow-xl shadow-black/[0.05] w-[calc(100%-2rem)] mx-auto rounded-2xl flex items-center justify-between gap-2 z-50 p-4 bg-white mt-4">
      <Link href={"/"}>
        <Logo />
      </Link>

      <div className="flex items-center justify-center gap-4">
        <ButtonAction className="flex items-center justify-center gap-1">
          <div className="size-8 rounded-full overflow-hidden bg-gray-200">
            {image && (
              <Image
                src={image || ""}
                alt={name || ""}
                width={40}
                height={40}
                className="rounded-full w-full h-full"
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <p className="text-[10px]">@{name}</p>
            <p className="text-[10px] text-gray-600">
              {isPremium ? "Premium" : "Freemium"}
            </p>
          </div>
        </ButtonAction>
        <ButtonAction>
          <Menu className="text-black size-6" />
        </ButtonAction>
      </div>
    </header>
  );
}
