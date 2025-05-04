import { useState } from "react";

export const Categories = ({ handleFilters }) => {
  // State to manage categories and their active status
  const [categories, setCategories] = useState([
    { id: 1, name: "Residential", isActive: false },
    { id: 2, name: "Commercial", isActive: false },
    { id: 3, name: "Agricultural", isActive: false },
    { id: 4, name: "Industrial", isActive: false },
    { id: 5, name: "Waterfront", isActive: false },
    { id: 6, name: "Mountain", isActive: false },
    { id: 7, name: "Forested", isActive: false },
    { id: 8, name: "Developed", isActive: false },
  ]);

  // Handler for category button clicks
  const handleClick = (e) => {
    const categoryId = e.target.name; // Get the ID from the button's name prop

    // Map through categories to update the clicked one and deactivate others
    // This assumes only one category can be active at a time.
    const updatedCategories = categories.map((cat) => {
      if (cat.id.toString() === categoryId) {
        // Toggle the isActive state for the clicked category
        return { ...cat, isActive: !cat.isActive };
      } else {
        // Deactivate other categories
        return { ...cat, isActive: false };
      }
    });

    // Find the category that was just clicked
    const clickedCategory = updatedCategories.find(cat => cat.id.toString() === categoryId);
    // Check if this category is now active
    const isNowActive = clickedCategory ? clickedCategory.isActive : false;

    // Update filters based on the new state of the clicked category
    if (isNowActive) {
         // If the clicked category is now active, apply its filter
         handleFilters((prev) => ({ ...prev, page: 0, categoryId: categoryId }));
    } else {
         // If the clicked category is now inactive (toggled off), remove the filter
         handleFilters((prev) => ({ ...prev, page: 0, categoryId: null }));
    }

    // Check if *any* category is active after the update.
    // This ensures the filter is cleared if the last active category is toggled off.
     const anyActive = updatedCategories.some(cat => cat.isActive);
     if (!anyActive) {
          handleFilters((prev) => ({ ...prev, page: 0, categoryId: null }));
     }


    // Update the component's state with the new category statuses
    setCategories(updatedCategories);
  };

  return (
    <div className="w-full">
     
      <div className="flex flex-wrap gap-5 p-3 bg-white-100 rounded-lg">
     
        {categories.map((cat) => (
          <button
            key={cat.id}
            name={cat.id} // Use name prop to easily identify the clicked button in handleClick
            onClick={handleClick}
            // Conditional classes for active/inactive states create the keyword/tag look
            className={`
              px-5 py-3 
              rounded-full 
              font-semibold text-sm 
              transition-colors duration-200 
              whitespace-nowrap // Prevent text from wrapping inside the button

              ${cat.isActive
                // Active state: Solid background, white text, subtle shadow
                ? 'bg-emerald-600 text-red shadow bg-red-200'
                // Inactive state: White background, dark text, border, hover effect
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200'
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};