"use client";

import React, { useState } from "react";
import ImageQueue from "./ImageQueue";
import Sidebar from "./Sidebar";
import ImageContainer from "./ImageContainer";
import { ImageType } from "@/types";

const AnalyzerContainer = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [boundingBox, setBoundingBox] = useState(null);

  return (
    <>
      <div className="analyzer-container flex w-full h-[600px] mx-auto box-border">
        <ImageContainer
          image={selectedImage}
          onBoundingBoxChange={setBoundingBox}
        />
        <Sidebar
          category={selectedCategory}
          setSelectedCategory={(category) => setSelectedCategory(category)}
          boundingBox={boundingBox}
          image={selectedImage}
        />
      </div>
      <ImageQueue
        onSelectImage={(image: ImageType) => setSelectedImage(image)}
      />
    </>
  );
};

export default AnalyzerContainer;
