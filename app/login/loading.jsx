import FormLoading from "@/app/components/loading/login/FormLoading";
import React from "react";

export default function Loading() {
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col w-[70%] bg-baseColor items-center xl:justify-center gap-y-1 p-5 xl:p-10 rounded-xl xl:flex-row ">
        <div className="flex flex-col items-center xl:w-1/2">
          <div className="bg-amber-900 w-48 h-48 md:w-56 md:h-56 xl:w-96 xl:h-96"></div>
        </div>
        <div className="w-full xl:w-1/2">
          <h1 className="text-4xl text-center font-bold md:text-5xl">
            Waiting...
          </h1>
          <FormLoading />
        </div>
      </div>
    </section>
  );
}
