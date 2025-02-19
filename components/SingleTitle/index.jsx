import React from "react";
import { spaceGrotesk } from "@/lib/fonts";

function SingleTitle({ children }) {
  return (
    <h2
      className={`${spaceGrotesk.className} w-fit mx-auto mt-28 text-center bg-lightGreen rounded-lg px-2 py-3 font-medium leading-9 lg:leading-83 text-neutralBlack dark:text-white text-3xl md:text-title`}
    >
      {children}
    </h2>
  );
}

export default SingleTitle;
