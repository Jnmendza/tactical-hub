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
    setActiveFilter(
      (prevFilters) =>
        prevFilters.includes(category)
          ? prevFilters.filter((f) => f !== category) // Remove if already selected
          : [...prevFilters, category] // Add if not selected
    );
  };

  return (
    <div className='flex flex-wrap md:flex-nowrap items-center justify-between bg-mint-green border rounded-lg shadow-md w-full md:w-[70%] gap-4'>
      {/* View All Button */}
      <button
        className='bg-primary-green text-secondary-green p-4 rounded-lg font-bold w-full h-full md:w-auto'
        onClick={() => {
          setActiveFilter([]); // Reset category filters
          setNewFilter(false); // Reset "New" filter
        }}
      >
        View All
      </button>

      {/* Filter Text & Checkboxes */}
      <div className='flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start space-x-4 md:space-x-6 text-secondary-green mr-4'>
        <span className='font-medium whitespace-nowrap'>Filter By:</span>

        {/* "New" Filter Checkbox */}
        <label className='flex items-center space-x-2 cursor-pointer'>
          <input
            type='checkbox'
            checked={newFilter}
            onChange={() => setNewFilter(!newFilter)}
            className='form-checkbox h-5 w-5 accent-mint-green'
          />
          <span className='font-medium'>New</span>
        </label>

        {/* Dynamic Category Filters */}
        <div className='flex flex-wrap gap-3'>
          {categories.map((category) => (
            <label
              key={category}
              className='flex items-center space-x-2 cursor-pointer'
            >
              <input
                type='checkbox'
                checked={activeFilter.includes(category)}
                onChange={() => toggleCategory(category)}
                className='form-checkbox h-5 w-5 accent-mint-green'
              />
              <span className='font-medium'>{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
