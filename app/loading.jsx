"use client";

import Image from "next/image";
import mainLogo from "../public/main-logo.svg";
import React from "react";
import { Montez } from "next/font/google";

const montez = Montez({ subsets: ["latin"], weight: "400" });

export default function Loading() {
  return (
    <main className="w-full h-screen overflow-hidden flex flex-col items-center justify-between">
      <h1
        className={`${montez.className} text-5xl md:text-7xl text-baseColor mt-24`}
      >
        {"Ot's Coffee"}
      </h1>
      <div className="bg-baseColor w-full h-[60%] flex flex-col items-center justify-around rounded-t-3xl transition animate-main">
        <div className="relative w-60 h-60 md:w-72 md:h-72 object-cover">
          <Image src={mainLogo} alt="Logo" fill priority />
        </div>
        <h2 className="tracking-wider font-thin text-xl md:text-2xl">
          Since Yesterday
        </h2>
      </div>
    </main>
  );
}
