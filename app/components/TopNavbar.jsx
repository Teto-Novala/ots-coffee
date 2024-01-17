"use client";
import Link from "next/link";
import { Montez } from "next/font/google";
import { useEffect, useState } from "react";

const montez = Montez({ subsets: ["latin"], weight: "400" });

export default function TopNavbar() {
  const [header, setHeader] = useState(false);
  const scrollNav = () => {
    if (window.scrollY > 0) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollNav);

    return () => {
      window.addEventListener("scroll", scrollNav);
    };
  }, []);

  return (
    <nav
      className={`fixed z-[999] top-0 left-0 right-0 ${
        header ? "bg-baseColor/70" : "bg-baseColor"
      } hidden md:block px-8 xl:px-16 transition`}
    >
      <div className="w-full py-5 flex justify-between items-center">
        <div className={`${montez.className} text-2xl tracking-widest`}>
          {"Ot's Coffee"}
        </div>
        <div className="w-1/2 xl:w-1/3 text-xl flex items-center justify-between">
          <Link href={"/"} className="hover:opacity-60 transition">
            Menu
          </Link>
          <Link href={"/order"} className="hover:opacity-60 transition">
            Order
          </Link>
          <Link href={"/account"} className="hover:opacity-60 transition">
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}
