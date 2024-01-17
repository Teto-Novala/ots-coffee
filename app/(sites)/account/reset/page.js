"use client";
import { instance } from "@/app/axios/axiosConfig";
import Button from "@/app/components/Button";
import InputForm from "@/app/components/InputForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (session) {
      instance
        .get(`/user/${session?.user?.id}`)
        .then((res) => {
          setData(res.data.user);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response);
        });
    }
  }, [session]);

  const submitHandler = async (id) => {
    try {
      const res = await instance.put(`/reset/${id}`, data);
      alert("Berhasil Me-reset");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return (
      <form className="bg-baseColor flex flex-col gap-y-5 px-4 py-6 rounded-md mt-16 md:mt-28">
        <InputForm
          label={"Loading"}
          id={"password"}
          htmlFor={"password"}
          placeholder={"Loading"}
        />
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-y-0 md:gap-x-3">
          <Button
            type="button"
            className={`bg-white text-baseColor w-full hover:bg-white/70 rounded-md font-semibold transition `}
          >
            Loading
          </Button>
        </div>
      </form>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler(session?.user?.id);
      }}
      className="bg-baseColor flex flex-col gap-y-5 px-4 py-6 rounded-md mt-16 md:mt-28"
    >
      {loading && (
        <InputForm label={"Username"} id={"username"} htmlFor={"username"} />
      )}
      {loading === false && (
        <InputForm
          label={"Password"}
          id={"password"}
          htmlFor={"password"}
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      )}

      <div className="flex flex-col gap-y-3 md:flex-row md:gap-y-0 md:gap-x-3">
        <Button
          className={`bg-white text-baseColor w-full hover:bg-white/70 rounded-md font-semibold transition `}
        >
          reset
        </Button>
        <Button
          type="button"
          onClick={() => router.push("/account")}
          className={`bg-white text-baseColor w-full hover:bg-white/70 rounded-md font-semibold transition `}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
