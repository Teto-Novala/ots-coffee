import React from "react";
import InputFormLoading from "./InputFormLoading";
import Button from "../../Button";

export default function FormLoading() {
  return (
    <form className="flex flex-col gap-y-6">
      <InputFormLoading />
      <InputFormLoading />
      <InputFormLoading />
      <div className="flex justify-around items-center">
        <Button
          className={`bg-white w-[40%] text-white hover:bg-white/70 rounded-md font-semibold transition `}
        >
          Register
        </Button>

        <Button
          type="submit"
          className={
            "bg-white text-white hover:bg-white/70 rounded-md font-semibold transition w-[40%]"
          }
        >
          Login
        </Button>
      </div>
    </form>
  );
}
