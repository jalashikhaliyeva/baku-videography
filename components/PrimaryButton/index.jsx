import React from "react";
import { montserrat } from "../../lib/fonts";

function PrimaryButton({
  children,
  icon,
  bgColor = "bg-white",
  textColor = "text-solid",
  hoverBgColor = "hover:bg-primaryBtn",
  hoverTextColor = "hover:text-white",
  borderColor = "border-borderColor",
  hoveredBorderColor = "hover:border-borderColor",
}) {
  return (
    <button
      className={`${montserrat.className} self-start w-auto py-2 px-3 text-sm md:py-3 md:px-4 md:text-base 
      rounded-xl ${borderColor} font-bold leading-6 flex items-center gap-2 
      transition-all duration-300 ease-in-out group border
      ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} ${hoveredBorderColor}`}
    >
      {children}
      {icon && (
        <span className="transform transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </button>
  );
}

export default PrimaryButton;
