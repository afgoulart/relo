"use client";
import React, { useEffect, useState } from "react";
import { fetchCategories, fetchUnanalyzedImages } from "@/services/api";
import Image from "next/image";
import { v4 } from "uuid";
import { ImageType } from "@/types";

const ImageQueue: React.FC<{ onSelectImage: (image: ImageType) => void }> = ({
  onSelectImage,
}) => {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    let isCanceled = false;

    (async () => {
      if (isCanceled) return false;

      const dataRequest = await fetchUnanalyzedImages();
      const data = JSON.parse(JSON.stringify(dataRequest));

      setImages(data);
      if (data.length > 0) {
        onSelectImage(data[0]);
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, []);

  return (
    <div className="image-queue w-full max-w-6xl mx-auto bg-gray-200 p-5 box-border mt-5">
      <h2 className="text-2xl font-bold mb-4">Next images in queue:</h2>
      <ul className="queue-list flex list-none p-0 m-0 overflow-x-auto">
        {images.map((image, index) => (
          <li
            key={v4()}
            className="queue-item w-[100px] h-[100px] mr-2 bg-gray-400 flex justify-center items-center text-sm text-center cursor-pointer"
          >
            <Image
              src={image.url}
              width={100}
              height={100}
              alt={`Image ${index + 1}`}
              onClick={() => onSelectImage(image)}
              className="max-w-full max-h-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageQueue;
