import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineZoomOutMap } from "react-icons/md";
import ImageModal from "../ProjectSlider/ImageModal";
import LoadMoreButton from "../LoadMoreButton";

// Sample image data (adjust IDs and src as needed)
const imagesData = [
  { id: 1, image: "/images/blog/blog-card.png" },
  { id: 2, image: "/images/hero/photograph.jpg" },
  { id: 3, image: "/images/blog/blog-card.png" },
  { id: 4, image: "/images/hero/photograph.jpg" },
  { id: 5, image: "/images/blog/blog-card.png" },
  { id: 6, image: "/images/blog/blog-card.png" },
  { id: 7, image: "/images/blog/blog-card.png" },
  { id: 8, image: "/images/hero/photograph.jpg" },
  { id: 9, image: "/images/blog/blog-card.png" },
  { id: 10, image: "/images/blog/blog-card.png" },
  { id: 11, image: "/images/hero/photograph.jpg" },
  { id: 12, image: "/images/blog/blog-card.png" },
  { id: 13, image: "/images/blog/blog-card.png" },
  { id: 14, image: "/images/hero/photograph.jpg" },
  { id: 15, image: "/images/blog/blog-card.png" },
  { id: 16, image: "/images/blog/blog-card.png" },
  { id: 17, image: "/images/blog/blog-card.png" },
  { id: 18, image: "/images/blog/blog-card.png" },
  { id: 19, image: "/images/blog/blog-card.png" },
  { id: 20, image: "/images/blog/blog-card.png" },
];

function ServicesImages() {
  // Modal slider state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // State to track how many images are visible
  const [visibleCount, setVisibleCount] = useState(10);

  // Open modal and set the selected image index
  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigate to previous/next image in the modal
  const modalPrev = () => {
    setModalIndex((prev) => (prev === 0 ? imagesData.length - 1 : prev - 1));
  };

  const modalNext = () => {
    setModalIndex((prev) => (prev === imagesData.length - 1 ? 0 : prev + 1));
  };

  // Load more images (10 at a time)
  const loadMoreImages = () => {
    setVisibleCount((prev) => prev + 10);
  };

  // Slice the imagesData array based on visibleCount
  const visibleImages = imagesData.slice(0, visibleCount);

  return (
    <>
      {/* Grid of Images */}
      <div className="pt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {visibleImages.map((img, index) => (
          // Apply rounded corners on the container itself
          <div
            key={img.id}
            className="relative group rounded-xl overflow-hidden"
          >
            <Image
              src={img.image}
              alt="Services Image"
              width={220}
              height={190}
              // Remove individual rounded class since container already has it
              className="w-full h-[190px] object-cover transform transition duration-300 group-hover:scale-110"
            />
            {/* Overlay: now it will inherit the container's border radius */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <MdOutlineZoomOutMap className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Render the Load More Button only if there are more images to show */}
      {visibleCount < imagesData.length && (
        <LoadMoreButton onClick={loadMoreImages} />
      )}

      {/* Modal Slider */}
      <ImageModal
        isOpen={isModalOpen}
        currentIndex={modalIndex}
        data={imagesData}
        onClose={closeModal}
        onPrev={modalPrev}
        onNext={modalNext}
        onSelect={(i) => setModalIndex(i)}
      />
    </>
  );
}

export default ServicesImages;
