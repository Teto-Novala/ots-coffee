import { instance } from "@/app/axios/axiosConfig";
import Button from "@/app/components/Button";
import InputForm from "@/app/components/InputForm";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function FormAccount({ data }) {
  const router = useRouter();
  function updateHandler() {
    router.push(`/account/${data.id}`);
  }
  async function deleteHandler() {
    if (confirm("Yakin?")) {
      try {
        const res = await instance.delete(`/user/${data.id}`, data.id);
        alert("Berhasil Menghapus");
        router.refresh();
        signOut();
      } catch (error) {
        alert("Gagal Menghapus");
      }
    } else {
      return;
    }
  }
  function changePassword() {
    router.push("/account/reset");
  }
  function logOut() {
    if (confirm("Yakin")) {
      toast.success("Berhasil Logout");
      signOut();
    } else {
      return;
    }
  }
  return (
    <form className="bg-baseColor flex flex-col gap-y-5 px-4 py-6 rounded-md ">
      <InputForm
        label={"Username"}
        id={"username"}
        htmlFor={"username"}
        readOnly
        value={data.username}
      />
      <InputForm
        label={"Email"}
        id={"email"}
        type={"email"}
        htmlFor={"email"}
        readOnly
        value={data.email}
      />
      <div className="flex flex-col gap-y-3 md:flex-row md:gap-y-0 md:gap-x-3">
        <Button
          type="button"
          onClick={updateHandler}
          className={`bg-white text-baseColor w-full hover:bg-white/70 rounded-md font-semibold transition `}
        >
          Update
        </Button>
        <Button
          type="button"
          onClick={deleteHandler}
          className={`bg-white text-baseColor w-full hover:bg-white/70 rounded-md font-semibold transition `}
        >
          Delete
        </Button>
        <Button
          type="button"
          onClick={changePassword}
          className={`bg-white text-baseColor w-full hover:bg-white/70 rounded-md font-semibold transition `}
        >
          Change Password
        </Button>
        <Button
          type="button"
          onClick={logOut}
          className={`bg-white text-baseColor w-full hover:bg-white/70 rounded-md font-semibold transition `}
        >
          Log Out
        </Button>
      </div>
    </form>
  );
}
