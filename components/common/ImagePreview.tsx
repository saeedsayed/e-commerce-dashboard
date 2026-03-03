import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import Image from "next/image";
import { X } from "lucide-react";

export interface ImagePreviewProps {
  isOpen: boolean;
  /** array of image URLs to display */
  images: string[];
  /** alternative text for images */
  alt?: string;
  /** show thumbnail navigation below main image */
  showThumbnails?: boolean;
  /** width of the main image container */
  width?: string | number;
  /** height of the main image container */
  height?: string | number;
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  isOpen,
  images,
  alt = "Product image",
  showThumbnails = true,
  width = "100%",
  height = 400,
  onClose,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!isOpen) return;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black opacity-50" />
      <button
        className="absolute top-4 right-4 text-white z-10 cursor-pointer"
        aria-label="Close image preview"
        onClick={onClose}
      >
        <X />
      </button>
      {/* Main image carousel */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        className="rounded-lg overflow-hidden w-full h-full! py-6!"
        style={{ width, height }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-contain"
              fill
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail carousel */}
      {showThumbnails && images.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          spaceBetween={10}
          slidesPerView={4}
          className="mt-4"
          watchSlidesProgress
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-24 object-cover rounded cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                fill
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ImagePreview;
