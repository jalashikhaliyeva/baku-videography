import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { montserrat } from "@/lib/fonts";

const PortfolioCard = ({ slide }) => {
  console.log(slide, "slide");

  const router = useRouter();

  const handleCardClick = (slug) => {
    router.push(`portfolio/${slug}`);
  };

  return (
    <div
      className="group flex flex-col  bg-boxGrayBodyColor rounded-2xl border border-gray-300 p-4 transition-transform duration-300 cursor-pointer"
      onClick={() => handleCardClick(slide.slug)}
    >
      <div className="relative">
        <Image
          width={370}
          height={300}
          src={slide.image}
          alt={`Slide`}
          className="object-cover rounded-t-2xl h-[300px] w-full"
          quality={100}
        />

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300">
          <div className="flex items-center gap-2 bg-black p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
            >
              <path
                d="M11.25 24.701C10.5326 25.1152 10.2867 26.0326 10.701 26.75C11.1152 27.4674 12.0326 27.7133 12.75 27.299L11.25 24.701ZM30.7694 16.3882C30.9838 15.588 30.5089 14.7655 29.7087 14.5511L16.6687 11.0571C15.8685 10.8426 15.046 11.3175 14.8316 12.1177C14.6172 12.9179 15.0921 13.7404 15.8923 13.9548L27.4834 17.0607L24.3776 28.6518C24.1631 29.452 24.638 30.2745 25.4382 30.4889C26.2384 30.7033 27.0609 30.2284 27.2753 29.4282L30.7694 16.3882ZM12.75 27.299L30.0705 17.299L28.5705 14.701L11.25 24.701L12.75 27.299Z"
                fill="#B9FF66"
              />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-2 left-2 flex gap-2">
          {Array.isArray(slide.tags) ? (
            slide.tags.map((tag, i) => (
              <div key={i} className="bg-black p-2 px-3 rounded-full">
                <p
                  className={`${montserrat.className} text-sm text-lightGreen`}
                >
                  {tag.title}
                </p>
              </div>
            ))
          ) : (
            <div className="bg-black p-2 px-3 rounded-full">
              <p className={`${montserrat.className} text-sm text-lightGreen`}>
                {slide?.tags?.title}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h5 className="text-3xl leading-10 text-textSecondaryDefault font-medium pb-2 dark:text-white line-clamp-1">
          {slide.title}
        </h5>
      </div>
    </div>
  );
};

export default PortfolioCard;
