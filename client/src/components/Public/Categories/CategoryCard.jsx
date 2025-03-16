import React from "react";

const CategoryCard = ({ category }) => {
    console.log(category);
    
  return (
    <div className="mb-3">
      <div className="card p-3 text-center">
        {/* Bootstrap placeholder image */}
        <div className="placeholder-glow">
          <span
            className="placeholder"
            style={{ height: "150px", display: "block" }}
          ></span>
        </div>
        <h5 className="mt-3">{category.category_name}</h5>
      </div>
    </div>
  );
};

export default CategoryCard;
