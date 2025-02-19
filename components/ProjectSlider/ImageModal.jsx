import React, { useEffect, useCallback } from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import styles from "./imageModal.module.css";
import Image from "next/image";

const ImageModal = ({
  isOpen,
  currentIndex,
  data,
  onClose,
  onPrev,
  onNext,
  onSelect, // <--- pass a callback to select an index
}) => {
  // Handle keyboard events for navigation and closing
  const handleKeyDown = useCallback(
    (event) => {
      if (!isOpen) return;
      if (event.key === "ArrowLeft") {
        onPrev();
      } else if (event.key === "ArrowRight") {
        onNext();
      } else if (event.key === "Escape") {
        onClose();
      }
    },
    [isOpen, onPrev, onNext, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;
  const slide = data[currentIndex];
  if (!slide) return null;

  const handleThumbnailClick = (idx) => {
    onSelect(idx); // let the parent update the modalIndex
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose size={24} />
        </button>

        <div className={styles.imageContainer}>
          <Image
            src={slide.image}
            alt={`Modal Slide ${currentIndex + 1}`}
            width={800}
            height={600}
            className={styles.image}
          />
        </div>

        {data.length > 1 && (
          <>
            <button className={styles.prevButton} onClick={onPrev}>
              <GrFormPrevious size={36} />
            </button>
            <button className={styles.nextButton} onClick={onNext}>
              <MdNavigateNext size={36} />
            </button>
          </>
        )}

        {/* Thumbnails Section */}
        <div className={styles.thumbnailContainer}>
          {data.map((item, i) => {
            const isActive = i === currentIndex;
            return (
              <div
                key={i}
                className={`${styles.thumbnailWrapper} ${
                  isActive ? styles.activeThumbnail : ""
                }`}
                onClick={() => handleThumbnailClick(i)}
              >
                <Image
                  src={item.image}
                  alt={`Thumbnail ${i + 1}`}
                  width={80}
                  height={60}
                  className={styles.thumbnailImage}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
