// component
import Image from "next/image";
import React from "react";

// src img
import mainLogo from "@/public/main-logo.svg";
import FormRegister from "./FormRegister";

export default async function Register() {
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col w-[70%] bg-baseColor items-center xl:justify-center gap-y-1 p-5 xl:p-10 rounded-xl xl:flex-row ">
        <div className="flex flex-col items-center xl:w-1/2">
          <div className="relative w-48 h-48 md:w-56 md:h-56 xl:w-96 xl:h-96">
            <Image
              src={mainLogo}
              alt="coffee logo"
              quality={100}
              fill
              priority
            />
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <h1 className="text-4xl text-center font-bold md:text-5xl">
            Register
          </h1>
          <FormRegister />
        </div>
      </div>
    </section>
  );
}
