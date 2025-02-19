import React from "react";
import { montserrat } from "../../lib/fonts";

function LoadMoreButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${montserrat.className} mt-10 mx-auto flex items-center justify-center w-auto py-2 px-3 text-sm md:py-3 md:px-4 md:text-base rounded-xl border font-bold leading-6 gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 group bg-white text-solid hover:bg-primaryBtn hover:text-white hover:border-borderColor`}
    >
     Hamısına bax
    </button>
  );
}

export default LoadMoreButton;
