"use client";
import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";

const CategorySelection: React.FC<{
  onSelectCategory: (category: any) => void;
}> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    let isCanceled = false;
    const ac = new AbortController();

    const fetchAllCategories = async (ac: AbortController) => {
      const data = await fetchCategories();
      console.log("Categories >>>>", data);
      setCategories(data);
    };

    (async () => {
      if (!isCanceled) return false;

      await fetchAllCategories(ac);
    })();

    return () => {
      isCanceled = true;
      ac.abort();
    };
  }, []);

  return (
    <div className="category-selection mb-5">
      <select
        onChange={(e) =>
          onSelectCategory(
            categories.find((c) => c.id === Number(e.target.value))
          )
        }
        className="w-full p-2 box-border"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelection;
