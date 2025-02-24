// components/Customers.js
import React from "react";
import EmblaCarousel from "../EmblaCarousel/EmblaCarousel";

function Partners({
  data
}) {
  const OPTIONS = { loop: true };

  //  auto-scroll configurations
  const autoScrollRight = { playOnInit: true, interval: 6000, speed: 1 };
  const autoScrollLeft = { playOnInit: true, interval: 6000, speed: -1 }; //  opposite direction

  return (
    <div className="bg-mainGray py-3 md:py-custom-space dark:bg-bgDarkGray border-b border-borderColor">
      <EmblaCarousel
        slides={data}
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
