import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./embla.module.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaPlay } from "react-icons/fa"; 
import { montserrat } from "@/lib/fonts";
import Image from "next/image";

const VideosSlide = ({ data, type, onVideoSelect, activeVideo }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: "trimSnaps",
  });

  const router = useRouter();
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [showDots, setShowDots] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setShowDots(data?.length > 3);
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect, data?.length]);

  // When a card is clicked, call the onVideoSelect callback to update the selected video.
  const handleCardClick = (slide) => {
    if (onVideoSelect) {
      onVideoSelect(slide);
    }
    // Uncomment to navigate to a details page:
    /*
    let basePath = "";
    if (type === "blog") {
      basePath = "/blogs";
    } else if (type === "project") {
      basePath = "/projects";
    }
    if (basePath) {
      router.push(`${basePath}/${slide.slug}`);
    }
    */
  };

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={`${styles.embla__container} flex`}>
          {data?.map((slide, index) => {
            const isActive = activeVideo && activeVideo.slug === slide.slug;
            return (
              <div
                className={`${styles.embla__slide} lg:flex-[0_0_35%]`}
                key={slide.id}
              >
                <div
                  onClick={() => handleCardClick(slide)}
                  className={`group relative flex flex-col w-full bg-boxGrayBodyColor rounded-2xl transition-transform duration-300 cursor-pointer ${
                    isActive
                      ? ""
                      : styles.inactiveSlide
                  }`}
                >
                  <div className="relative">
                    <Image
                      width={370}
                      height={300}
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="object-cover rounded-2xl h-[250px] w-full"
                      quality={100}
                    />

                    <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        <div className="flex items-center justify-center rounded-full bg-black bg-opacity-40 border backdrop-blur-sm p-4">
                          <FaPlay className="text-white text-2xl" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 p-2 px-3 rounded-full flex flex-col gap-2">
                      <p
                        className={`${montserrat.className} text-xl font-bold ${
                          isActive ? "text-green-500" : "text-white"
                        }`}
                      >
                        {slide.title}
                      </p>
                      <p className={`${montserrat.className} text-base text-graySlide font-normal`}>
                        {slide.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {prevBtnEnabled && (
        <button
          className={`${styles.embla__button} ${styles["embla__button--prev"]}`}
          onClick={scrollPrev}
          aria-label="Previous Slide"
        >
          <GrFormPrevious className="fill-black text-black text-lg" />
        </button>
      )}

      {nextBtnEnabled && (
        <button
          className={`${styles.embla__button} ${styles["embla__button--next"]}`}
          onClick={scrollNext}
          aria-label="Next Slide"
        >
          <MdNavigateNext className="fill-black text-black text-lg" />
        </button>
      )}

      {showDots && (
        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`${styles.embla__dot} ${
                index === selectedIndex ? styles["embla__dot--selected"] : ""
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideosSlide;
