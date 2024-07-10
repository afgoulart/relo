// src/components/ImageContainer.tsx
import React, { useState, useRef } from "react";
import Image from "next/image";

const ImageContainer: React.FC<{
  image: any;
  onBoundingBoxChange: (box: any) => void;
}> = ({ image, onBoundingBoxChange }) => {
  const [drawing, setDrawing] = useState(false);
  const [box, setBox] = useState({
    topLeftX: 0,
    topLeftY: 0,
    width: 0,
    height: 0,
  });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageRef.current!.getBoundingClientRect();
    setBox({
      ...box,
      topLeftX: e.clientX - rect.left,
      topLeftY: e.clientY - rect.top,
    });
    setDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drawing) return;
    const rect = imageRef.current!.getBoundingClientRect();
    setBox((prevBox) => ({
      ...prevBox,
      width: e.clientX - rect.left - prevBox.topLeftX,
      height: e.clientY - rect.top - prevBox.topLeftY,
    }));
  };

  const handleMouseUp = () => {
    setDrawing(false);
    onBoundingBoxChange(box);
  };

  return (
    <div
      ref={imageRef}
      className="image-container flex-1 bg-black flex justify-center items-center overflow-hidden relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {image?.url && (
        <Image
          src={image.url}
          width={500}
          height={500}
          alt="Placeholder for uploaded image"
          objectFit="contain"
        />
      )}
      {drawing && (
        <div
          className="absolute border-2 border-red-500 bg-red-300 bg-opacity-25"
          style={{
            top: box.topLeftY,
            left: box.topLeftX,
            width: box.width,
            height: box.height,
          }}
        />
      )}
    </div>
  );
};

export default ImageContainer;
