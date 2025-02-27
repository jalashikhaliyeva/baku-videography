import React from "react";
import { spaceGrotesk } from "@/lib/fonts";

function CategoryFilter({ label, isSelected, onClick }) {
  return (
    <div
      className={`${spaceGrotesk.className} mt-5 flex text-lg leading-5 font-normal items-center justify-center py-3 px-4 rounded-3xl cursor-pointer transition-colors duration-300 ${
        isSelected
          ? "bg-black text-green500"
          : " text-black   border border-graySlide  "
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default CategoryFilter;
