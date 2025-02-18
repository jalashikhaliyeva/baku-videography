// EmblaCarousel.jsx
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import styles from "./embla.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const EmblaCarousel = ({ slides, options, autoScrollOptions }) => {
  // Initialize Embla Carousel with options and AutoScroll plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll(autoScrollOptions),
  ]);

  const router = useRouter();
  const isAboutPage = router.pathname === "/about";

  // Determine if we need to center the slides
  const shouldCenter = slides.length < 10;

  const handleSlideClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div
          className={`${styles.embla__container} ${
            shouldCenter ? styles.embla__containerCenter : ""
          }`}
        >
          {slides.map((slide, index) => (
            <div
              onClick={() => handleSlideClick(slide.link)}
              className={styles.embla__slide}
              key={index}
            >
              <div
                className={`${styles.box} ${
                  isAboutPage ? styles.boxWhite : ""
                }`}
              >
                <Image
                  width={55}
                  height={55}
                  src={slide.image}
                  alt="Banner Logo"
                  style={{
                    width: "105px",
                    height: "65px",
                    objectFit: "contain",
                  }}
                />
                <div className={styles.text}>{slide.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
