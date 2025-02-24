import React from "react";
import { spaceGrotesk } from "@/lib/fonts";
import DOMPurify from 'isomorphic-dompurify';

function SubTitleSingle({ children }) {
  const sanitizedHTML = DOMPurify.sanitize(children, {
    FORBID_ATTR: ["style"],
  });

  return (
    <>
      {/* <p className={`${spaceGrotesk.className} pt-6 text-lg font-normal `}>
       {children}
      </p> */}

      <div
        className={`${spaceGrotesk.className} pt-6 text-lg font-normal `}
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    </>
  );
}

export default SubTitleSingle;
