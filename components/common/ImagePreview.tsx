import React from "react";

import Image from "next/image";
import Modal from "../ui/Modal";

export interface ImagePreviewProps {
  isOpen: boolean;
  /** array of image URLs to display */
  images: string[];
  /** alternative text for images */
  alt?: string;
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  isOpen,
  images,
  alt = "image",
  onClose,
}) => {
  if (!isOpen) return;

  return (
    <Modal isOpen={isOpen} onCancel={onClose} size="full">
      <Image src={images[0]} alt={alt} fill className="object-contain" />
    </Modal>
  );
};

export default ImagePreview;
