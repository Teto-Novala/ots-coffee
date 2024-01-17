import { IconBasketDollar, IconMenu2, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function BottomNavbar() {
  return (
    <nav className="fixed z-[999] bottom-0 left-0 right-0 bg-baseColor md:hidden">
      <div className="w-full py-5 flex justify-evenly gap-x-5 items-center">
        <Link href={"/"} className="hover:opacity-60 transition">
          <IconMenu2 />
        </Link>
        <Link href={"/order"} className="hover:opacity-60 transition">
          <IconBasketDollar />
        </Link>
        <Link href={"/account"} className="hover:opacity-60 transition">
          <IconUser />
        </Link>
      </div>
    </nav>
  );
}
