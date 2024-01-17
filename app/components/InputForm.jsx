import React from "react";

export default function InputForm({ label, htmlFor, ...props }) {
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={htmlFor} className="text-lg md:text-2xl">
        {label}
      </label>
      <input
        {...props}
        className="w-full py-2 px-1 outline-none text-baseColor rounded-sm text-lg md:text-2xl"
      />
    </div>
  );
}
