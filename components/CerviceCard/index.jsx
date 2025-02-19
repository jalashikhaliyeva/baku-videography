// components/CervicesCard.jsx
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
// import { useTranslation } from "react-i18next";

function CerviceCard({ item }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(6); // Number of initially visible cards
  const router = useRouter();

  // const { t } = useTranslation();

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleClick = (slug) => {
    router.push(`/xidmetler/${slug}`);
  };

  const services = Array.isArray(item) ? item : [];

  // Helper functions for background colors based on index
  const containerBgColor = (index) => {
    const mod = index % 3;
    if (mod === 0) return "bg-gray";
    if (mod === 1) return "bg-lightGreen";
    return "bg-black";
  };

  const titleBgColor = (index) => {
    const mod = index % 3;
    return mod === 0 ? "bg-lightGreen" : "bg-white";
  };

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="flex flex-row flex-wrap gap-5">
        {services.slice(0, visibleCards).map((service, index) => {
          const isBlackCard = index % 3 === 2; // 3rd card style condition
          return (
            <div
              key={service.slug}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(service.slug)}
              className={`group cursor-pointer flex justify-between p-10 gap-5 border border-borderColor border-b-8 dark:bg-cardBgDark rounded-[42px] w-full lg:w-[48%] 2xl:w-[49%] transition-colors duration-300
                ${containerBgColor(index)}
                hover:bg-lightPurpleCard dark:hover:bg-darkHoverColor
              `}
            >
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex flex-col gap-2">
                  <h3
                    className={`inline-block w-fit font-grotesk rounded-lg p-2 dark:text-white text-xl md:text-4xl font-medium leading-6 md:leading-10 text-neutralBlack ${titleBgColor(
                      index
                    )}`}
                  >
                    {service.title}
                  </h3>
                  {/* Optional short description
                  <p className="text-neutralBlack dark:text-white text-xs md:text-base leading-4 font-normal pb-4 md:pb-0 line-clamp-2">
                    {service.short_desc}
                  </p>
                  */}
                </div>
                <button
                  className={`self-start text-left flex items-center  gap-2 text-xl leading-6 font-medium mt-2 md:mt-0 ${
                    isBlackCard ? "text-white" : "text-black"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    className="transform transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1 group-hover:translate-y-[-2px]"
                  >
                    <path
                      d="M16.0037 10.3842L7.39712 18.9908L5.98291 17.5766L14.5895 8.96997H7.00373V6.96997H18.0037V17.97H16.0037V10.3842Z"
                      className={`${
                        isBlackCard ? "fill-lightGreen" : "fill-black"
                      } dark:fill-white `}
                    />
                  </svg>
                  {/* {t("more")} */}
                  More
                </button>
              </div>
              <div className="relative flex-shrink-0 w-[104px] h-[104px] lg:w-[190px] lg:h-[190px] overflow-hidden">
                {/* Base Image (always visible) */}
                <Image
                  src={service.image}
                  alt={`${service.title} Card`}
                  layout="fill"
                  className="absolute inset-0 rounded-2xl transition-opacity duration-500 object-contain opacity-100"
                />
                {/*
                // Commented out the hovered image component to disable the hover effect
                <Image
                  src={
                    service.image_2 && service.image_2 !== "null"
                      ? service.image_2
                      : service.image
                  }
                  alt={`Hovered ${service.title} Card`}
                  layout="fill"
                  className={`absolute inset-0 transition-opacity duration-500 object-contain ${
                    hoveredCard === index ? "opacity-100" : "opacity-0"
                  }`}
                />
                */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CerviceCard;
