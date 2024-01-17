"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputForm from "@/app/components/InputForm";
import Button from "@/app/components/Button";

export default function FormLogin() {
  const session = useSession();
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback.ok && !callback.error) {
        toast.success("Berhasil Login");
        setLoading(false);
      }
      if (callback.error) {
        setLoading(false);
        toast.error(callback.error);
      }
    });
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
        <Link href={"/register"} className="block w-[40%] bg-red-400">
          <Button
            className={`bg-white text-baseColor w-full hover:bg-white/70 rounded-md font-semibold transition `}
          >
            Register
          </Button>
        </Link>

        <Button
          type="submit"
          className={
            "bg-white text-baseColor hover:bg-white/70 rounded-md font-semibold transition w-[40%]"
          }
        >
          {loading ? "Loading" : "Login"}
        </Button>
      </div>
    </form>
  );
}
