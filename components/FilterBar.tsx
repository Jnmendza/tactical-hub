import { getCategories } from "@/data/sanity";
import { useState, useEffect } from "react";

interface FilterBarProps {
  activeFilter: string[];
  setActiveFilter: React.Dispatch<React.SetStateAction<string[]>>;
  newFilter: boolean;
  setNewFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterBar = ({
  activeFilter,
  setActiveFilter,
  newFilter,
  setNewFilter,
}: FilterBarProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const toggleCategory = (category: string) => {
    setActiveFilter((prevFilters: string[]) => {
      if (prevFilters.includes(category)) {
        return prevFilters.filter((f) => f !== category); // Remove if already selected
      } else {
        return [...prevFilters, category]; // Add if not selected
      }
    });
  };

  return (
    <div className='flex items-center justify-between bg-white border rounded-lg shadow-md p-3'>
      {/* View All Button */}
      <button
        className='bg-blue-700 text-white px-4 py-2 rounded-l-lg font-bold'
        onClick={() => setActiveFilter([])} // Reset to show all
      >
        View All
      </button>

      {/* Filter Text & Checkboxes */}
      <div className='flex items-center space-x-4'>
        <span className='text-gray-700 font-medium'>Filter By:</span>

        {categories.map((category) => (
          <label
            key={category}
            className='flex items-center space-x-2 cursor-pointer'
          >
            <input
              type='checkbox'
              checked={activeFilter.includes(category)}
              onChange={() => toggleCategory(category)}
              className='form-checkbox h-5 w-5 text-blue-700'
            />
            <span className='text-blue-700 font-medium'>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
