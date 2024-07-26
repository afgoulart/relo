"use client";

import React, { useEffect, useState } from "react";
import ImageQueue from "./ImageQueue";
import Sidebar from "./Sidebar";
import ImageContainer from "./ImageContainer";
import { ImageType } from "@/types";
import { fetchCategories } from "@/services/api";

const AnalyzerContainer = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [boundingBox, setBoundingBox] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <>
      <div className="analyzer-container flex w-full h-[600px] mx-auto box-border">
        <ImageContainer
          image={selectedImage}
          onBoundingBoxChange={setBoundingBox}
        />
        <Sidebar
          categories={categories}
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
