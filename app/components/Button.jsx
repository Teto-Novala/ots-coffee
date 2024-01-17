import React from "react";
import clsx from "clsx";

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        "bg-baseColor hover:bg-white hover:text-baseColor box-border border border-baseColor px-3 py-2 transition text-center md:text-xl"
      )}
    >
      {children}
    </button>
  );
}
