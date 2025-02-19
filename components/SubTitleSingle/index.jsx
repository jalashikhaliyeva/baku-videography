import React from "react";
import { spaceGrotesk } from "@/lib/fonts";

function SubTitleSingle({children}) {
  return (
    <>
      <p className={`${spaceGrotesk.className} pt-6 text-lg font-normal `}>
       {children}
      </p>
    </>
  );
}

export default SubTitleSingle;
