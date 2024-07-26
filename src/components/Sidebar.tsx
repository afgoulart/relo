import React, { useEffect } from "react";
import CategorySelection from "./CategorySelection";
import { fetchCategories, handleComplete, handleDiscard } from "@/services/api";

export interface SidebarProps {
  setSelectedCategory: (category: any) => void;
  category: any;
  categories: any[];
  boundingBox: any;
  image: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  category,
  categories,
  setSelectedCategory,
  boundingBox,
  image,
}) => {
  return (
    <div className="sidebar w-[300px] bg-gray-200 p-5 flex flex-col box-border">
      <CategorySelection
        categories={categories}
        category={category}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />
      <div className="buttons mt-5 flex justify-between">
        <button
          onClick={() => handleDiscard(image)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Discard
        </button>
        <button
          onClick={() => handleComplete(image, category, boundingBox)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={!category || !boundingBox}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
