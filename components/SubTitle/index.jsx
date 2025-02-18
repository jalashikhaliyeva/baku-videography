import React from "react";
import { spaceGrotesk } from "@/lib/fonts";

function SubTitle({children}) {
  return (
    <>
      <p className={`${spaceGrotesk.className} text-lg font-normal max-w-[600px]`}>
       {children}
      </p>
    </>
  );
}

export default SubTitle;
