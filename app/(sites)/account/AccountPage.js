"use client";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import FormAccount from "./FormAccount";

export default function AccountPage({ dataAccount }) {
  const router = useRouter();
  function registerHandler() {
    router.push("/register");
  }
  function loginHandler() {
    router.push("/login");
  }
  return (
    <section className="flex flex-col xl:items-center gap-y-4">
      <h1 className="text-center text-4xl mt-16 md:mt-28 text-black">
        Account
      </h1>
      <div className="xl:w-1/2">
        {dataAccount === null && (
          <div className="flex items-center justify-center gap-x-3">
            <Button onClick={registerHandler}>Register</Button>
            <Button onClick={loginHandler}>Login</Button>
          </div>
        )}
        {dataAccount !== null && <FormAccount data={dataAccount.user} />}
      </div>
    </section>
  );
}
