// next

//component
import Image from "next/image";
import FormLogin from "./FormLogin";

// src img
import mainLogo from "@/public/main-logo.svg";
import { Suspense } from "react";
import Loading from "@/app/login/loading";

export default async function Page() {
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
          <h1 className="text-4xl text-center font-bold md:text-5xl">Login</h1>
          <Suspense fallback={<Loading />}>
            <FormLogin />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
