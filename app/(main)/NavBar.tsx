import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/app/assets/logo.png";
import UserButton from "@/components/auth/UserButton";
import { ModeToggle } from "./ModeToggle";

function NavBar() {
  return (
    <header className="shadow-sm">
      <div className="flex max-w-7xl mx-auto p-3 items-center justify-between gap-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            alt="logo"
            src={logo}
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
