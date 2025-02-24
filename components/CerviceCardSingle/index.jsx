import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import LoadMoreButton from "../LoadMoreButton";

function CerviceCardSingle({ servicesData }) {
  // Initialize state with the initial page of data
  const [services, setServices] = useState(servicesData.data || []);
  const [nextPage, setNextPage] = useState(servicesData.links?.next);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMouseEnter = (index) => {
    // your hover functionality here (if needed)
  };

  const handleMouseLeave = () => {
    // your hover functionality here (if needed)
  };

  const handleClick = (slug) => {
    router.push(`/xidmetler/${slug}`);
  };

  const handleLoadMore = async () => {
    if (!nextPage) return;
    setLoading(true);
    try {
      const res = await fetch(nextPage, {
        headers: { "Accept-Language": router.locale },
      });
      const data = await res.json();
      // Append the new items
      setServices((prev) => [...prev, ...data.data]);
      // Update nextPage (will be null if there is no next page)
      setNextPage(data.links?.next);
    } catch (error) {
      console.error("Failed to load more services:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full pb-10 pt-60">
      <div className="grid grid-cols-1 min-[482px]:grid-cols-2 md:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <div
            key={service.slug}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(service.slug)}
            className="group cursor-pointer flex justify-between p-10 gap-5 border border-borderColor border-b-8 dark:bg-cardBgDark rounded-[42px] w-full transition-colors duration-300 bg-gray hover:bg-lightPurpleCard dark:hover:bg-darkHoverColor"
          >
            <div className="flex flex-col justify-between flex-grow">
              <div className="flex flex-col gap-2">
                <h3 className="inline-block w-fit font-grotesk rounded-lg p-2 dark:text-white text-xl md:text-4xl font-medium leading-6 md:leading-10 text-neutralBlack bg-lightGreen">
                  {service.title}
                </h3>
              </div>
              <button className="self-start text-left flex items-center gap-2 text-xl leading-6 font-medium mt-2 md:mt-0 text-black">
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
                    className="fill-black dark:fill-white"
                  />
                </svg>
                More
              </button>
            </div>
            <div className="relative flex-shrink-0 w-[104px] h-[104px] lg:w-[190px] lg:h-[190px] overflow-hidden">
              {/* Base image (always visible) */}
              {/* Uncomment and adjust as needed */}
              {/* <Image
                src={service.image}
                alt={`${service.title} Card`}
                layout="fill"
                className="absolute inset-0 rounded-2xl transition-opacity duration-500 object-contain opacity-100"
              /> */}
            </div>
          </div>
        ))}
      </div>

      {/* Render Load More button if there is a next page */}
      {nextPage && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </LoadMoreButton>
      )}
    </div>
  );
}

export default CerviceCardSingle;
