import React from "react";

export default function InputFormLoading() {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-lg md:text-2xl ">....</label>
      <input className="w-full py-2 px-1 outline-none text-baseColor rounded-sm text-lg" />
    </div>
  );
}
