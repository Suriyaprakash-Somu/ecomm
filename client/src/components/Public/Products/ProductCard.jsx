import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card p-3 text-center">
      <div className="placeholder-glow">
        <span
          className="placeholder col-12"
          style={{ height: "150px", display: "block" }}
        ></span>
      </div>
      <h5 className="mt-3">{product.product_name}</h5>
      <p className="text-muted">${product.price}</p>
      <p className="text-warning">⭐ {product.rating}</p>
    </div>
  );
};
export default ProductCard;
