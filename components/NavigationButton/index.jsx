import React from "react";
import { montserrat } from "../../lib/fonts";

function NavigationButton({ children, icon  , onClick}) {
  return (
    <button
    onClick={onClick}
      className={`${montserrat.className} 
        py-2 px-3 text-sm md:py-3 md:px-4 md:text-base 
        rounded-full border border-borderColor text-solid font-bold leading-6 
        flex items-center gap-2 transition-all duration-300 ease-in-out 
        hover:bg-primaryBtn hover:text-white group`}
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

export default NavigationButton;
