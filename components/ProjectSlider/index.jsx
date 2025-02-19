import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./embla.module.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";
import ImageModal from "./ImageModal"; // import the modal

const ProjectSlider = ({ data, type }) => {
  console.log(data, "data slider");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: "trimSnaps",
    align: "center", // center alignment can help partially show next/prev
  });

  const router = useRouter();

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [showDots, setShowDots] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  // Embla scroll handlers
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

  // Handle partial next/prev view with a gray overlay
  // You can do this with CSS in .embla__slide:not(.is-selected) if you want
  // or track the current selected index from Embla

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setShowDots(data?.length > 3);
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect, data?.length]);

  // Modal open/close
  const handleOpenModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Modal next/prev
  const handleModalPrev = () => {
    setModalIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleModalNext = () => {
    setModalIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  // Add keyboard arrow navigation for main slider
  useEffect(() => {
    const handleKeyDown = (event) => {
      // If the modal is open, let the modal handle arrow keys
      if (isModalOpen) return;

      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext, isModalOpen]);

  return (
    <>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={`${styles.embla__container} flex`}>
            {data?.map((slide, index) => (
              <div
                className={`${styles.embla__slide} lg:flex-[0_0_35%] px-2`}
                key={slide.id}
              >
                <div
                  className="group flex flex-col w-full rounded-2xl transition-transform duration-300 cursor-pointer"
                  onClick={() => handleOpenModal(index)}
                >
                  <Image
                    width={370}
                    height={300}
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="object-cover rounded-lg h-[300px]"
                    quality={100}
                  />
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

      {/* Modal */}
      <ImageModal
        isOpen={isModalOpen}
        currentIndex={modalIndex}
        data={data}
        onClose={handleCloseModal}
        onPrev={handleModalPrev}
        onNext={handleModalNext}
        onSelect={(index) => setModalIndex(index)}
      />
    </>
  );
};

export default ProjectSlider;
