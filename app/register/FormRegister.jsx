"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputForm from "@/app/components/InputForm";
import Button from "@/app/components/Button";
import { instance } from "@/app/axios/axiosConfig";

export default function FormRegister() {
  const session = useSession();
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.post("/users", data);
      toast.success(res.data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
      <InputForm
        label={"Email"}
        htmlFor={"email"}
        id={"email"}
        placeholder={"your email"}
        type={"email"}
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <InputForm
        label={"Username"}
        htmlFor={"username"}
        id={"username"}
        placeholder={"your username"}
        type={"text"}
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <InputForm
        label={"Password"}
        htmlFor={"password"}
        id={"password"}
        placeholder={"your password"}
        type={"password"}
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <div className="flex justify-around items-center">
        <Button
          type="submit"
          className={`bg-white text-baseColor hover:bg-white/70 rounded-md font-semibold transition w-full`}
        >
          Register
        </Button>
      </div>
    </form>
  );
}
