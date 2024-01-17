"use client";
import { instance } from "@/app/axios/axiosConfig";
import Button from "@/app/components/Button";
import InputForm from "@/app/components/InputForm";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (session) {
      instance
        .get(`/user/${params.id}`)
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
      const res = await instance.put(`/user/${id}`, data);
      alert("Berhasil Meng-update");
      // router.push("/account");
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
          id={"username"}
          htmlFor={"username"}
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
        update({ username: data.username });
        submitHandler(params.id);
      }}
      className="bg-baseColor flex flex-col gap-y-5 px-4 py-6 rounded-md mt-16 md:mt-28"
    >
      {loading && (
        <InputForm label={"Username"} id={"username"} htmlFor={"username"} />
      )}
      {loading === false && (
        <InputForm
          label={"Username"}
          id={"username"}
          htmlFor={"username"}
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      )}

      <div className="flex flex-col gap-y-3 md:flex-row md:gap-y-0 md:gap-x-3">
        <Button
          className={`bg-white text-baseColor w-full hover:bg-white/70 rounded-md font-semibold transition `}
        >
          Update
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
