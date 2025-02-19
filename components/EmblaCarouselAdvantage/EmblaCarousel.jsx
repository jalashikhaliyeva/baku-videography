import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router"; // Import useRouter
import useEmblaCarousel from "embla-carousel-react";
import styles from "./embla.module.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { montserrat } from "@/lib/fonts";
import Image from "next/image";

const Slider = ({ data, type }) => {
  console.log(data, "data slider");
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

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setShowDots(data?.length > 3); // Show dots only if there are more than 3 slides
    emblaApi.on("select", onSelect);
    onSelect(); // Initialize state
  }, [emblaApi, onSelect, data?.length]);

  // Auto-play functionality: advances slides automatically every 3 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 3000); // Change 3000 to your desired interval in milliseconds

    return () => clearInterval(interval);
  }, [emblaApi]);

  const handleCardClick = (slug) => {

    router.push(`portfolio/${slug}`);
  };

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={`${styles.embla__container} flex`}>
          {data?.map((slide, index) => (
            <div
              className={`${styles.embla__slide} lg:flex-[0_0_35%] px-2`}
              key={slide.id}
            >
              <div
                className="group flex flex-col w-full bg-boxGrayBodyColor rounded-2xl border border-gray-300 p-4 transition-transform duration-300 cursor-pointer"
                onClick={() => handleCardClick(slide.slug)}
              >
                <div className="relative">
                  <Image
                    width={370}
                    height={300}
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
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

                  <div className="absolute bottom-2 left-2 bg-black p-2 px-3 rounded-full">
                    <p
                      className={`${montserrat.className} text-sm text-lightGreen`}
                    >
                      {slide.tag}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <h5 className="text-3xl leading-52 text-textSecondaryDefault font-medium pb-2 dark:text-white line-clamp-2">
                    {slide.title}
                  </h5>
                </div>
              </div>
            </div>
          ))}
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

export default Slider;
