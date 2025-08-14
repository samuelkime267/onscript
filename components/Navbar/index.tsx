import React from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import UserDetails from "./sub/UserDetails";
import NavMenu from "./sub/NavMenu";

export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 left-0 shadow-xl shadow-black/[0.05] w-[calc(100%-2rem)] mx-auto rounded-b-3xl flex items-center justify-between gap-2 z-50 p-4 bg-white mt-0">
        <Link href={"/"}>
          <Logo />
        </Link>

        <div className="flex items-center justify-center gap-4">
          <UserDetails />
          <NavMenu />
        </div>
      </header>
    </>
  );
}
