import React from "react";

const CategorySelection: React.FC<{
  onSelectCategory: (category: any) => void;
  category: { id: number; name: string };
  categories?: { id: number; name: string }[];
}> = ({ onSelectCategory, category, categories = [] }) => {
  return (
    <div className="category-selection mb-5">
      <select
        onChange={(e) =>
          onSelectCategory(
            categories.find((c) => c.id === Number(e.target.value))
          )
        }
        defaultValue={category?.id ?? ""}
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
