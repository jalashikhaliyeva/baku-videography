// components/Customers.js
import React from "react";
import EmblaCarousel from "../EmblaCarousel/EmblaCarousel";

function Partners({
  slides = [
    { image: "/images/partners/logo1.svg", link: "https://partner1.com" },
    { image: "/images/partners/logo2.svg", link: "https://partner2.com" },
    { image: "/images/partners/logo3.svg", link: "https://partner1.com" },
    { image: "/images/partners/logo4.png", link: "https://partner2.com" },
    { image: "/images/partners/logo5.svg", link: "https://partner1.com" },
    { image: "/images/partners/logo6.svg", link: "https://partner2.com" },
    { image: "/images/partners/logo1.svg", link: "https://partner1.com" },
    { image: "/images/partners/logo2.svg", link: "https://partner2.com" },
    { image: "/images/partners/logo3.svg", link: "https://partner1.com" },
    { image: "/images/partners/logo5.svg", link: "https://partner2.com" },
    { image: "/images/partners/logo6.svg", link: "https://partner1.com" },
    { image: "/images/partners/logo2.svg", link: "https://partner2.com" },
    { image: "/images/partners/logo1.svg", link: "https://partner1.com" },
    { image: "/images/partners/logo2.svg", link: "https://partner2.com" },
    // ... add other slides similarly
  ],
}) {
  const OPTIONS = { loop: true };

  //  auto-scroll configurations
  const autoScrollRight = { playOnInit: true, interval: 6000, speed: 1 };
  const autoScrollLeft = { playOnInit: true, interval: 6000, speed: -1 }; //  opposite direction

  return (
    <div className="bg-mainGray py-3 md:py-custom-space dark:bg-bgDarkGray border-b border-borderColor">
      <EmblaCarousel
        slides={slides}
        options={OPTIONS}
        autoScrollOptions={autoScrollLeft}
      />
      {/* <EmblaCarousel
            slides={slides}
            options={OPTIONS}
            autoScrollOptions={autoScrollRight}
          /> */}
    </div>
  );
}

export default Partners;
