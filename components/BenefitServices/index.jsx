import React from "react";
import PrimaryButton from "../PrimaryButton";
import { spaceGrotesk } from "@/lib/fonts";
import Image from "next/image";

function BenefitServices() {
  return (
    <div className="mt-60 w-full flex flex-col md:flex-row">
      {/* Left text section */}
      <div
        className={`${spaceGrotesk.className} flex flex-col gap-8 w-full md:w-1/2 bg-gray p-8 md:p-16 lg:p-60 
          rounded-tl-3xl  md:rounded-tl-3xl md:rounded-bl-3xl`}
      >
        <h2 className="text-3xl font-medium">
          Xidmətlərimizdən yararlanmaq üçün
        </h2>
        <p>
          Contact us today to learn more about how our digital marketing
          services can help your business grow and succeed online.
        </p>
        <PrimaryButton
          bgColor="bg-primaryBtn"
          textColor="text-white"
          hoverBgColor="hover:bg-white"
          hoverTextColor="hover:text-title"
          borderColor="border-title"
          hoveredBorderColor="hover:border-title"
        >
          Whatsapp
        </PrimaryButton>
      </div>

      {/* Right images section */}
      <div className="w-full md:w-1/2 flex">
        {/* Relative container for grid and centered logo */}
        <div className="flex-1 h-full bg-gray overflow-hidden relative 
          rounded-br-3xl md:rounded-tr-3xl md:rounded-br-3xl"
        >
          {/* Grid of images */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 h-full gap-0">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="relative h-full">
                <Image
                  src="/images/blog/blog-card.png"
                  alt="Services Image"
                  fill
                  className="object-cover"
                />
                {/* Gray overlay with opacity */}
                <div className="absolute inset-0 bg-gray opacity-50"></div>
              </div>
            ))}
          </div>
          {/* Centered logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/images/logo/logo1.png"
              width={65}
              height={42}
              className="w-32 md:w-[140px] object-contain bg-borderColor p-3 rounded-md"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BenefitServices;
