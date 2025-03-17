import React from "react";
import styles from "./ProductCard.module.css";
import { FaHeart, FaCartPlus, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className={styles.productImage}
          />
        ) : (
          <div className={styles.placeholder}></div>
        )}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.productName}>{product.product_name}</h3>

        <div className={styles.ratings}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <span className={styles.ratingValue}>{product.rating}</span>
        </div>

        <div className={styles.tags}>
          {product.isRecent !== 0 && <span className={styles.tag}>New</span>}
          {product.isFeatured !== 0 && (
            <span className={styles.tag}>Featured</span>
          )}
        </div>

        <div className={styles.priceRow}>
          <div className={styles.price}>
            <span className={styles.currencySymbol}>₹</span>
            <span className={styles.priceValue}>{product.price}</span>
          </div>
        </div>

        <div className={styles.actionsRow}>
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            <FaCartPlus />
            Add to cart
          </button>
          <button className={styles.wishlistBtn}>
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
